import React, { useState } from "react";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Logger from "/client/modules/logger";
import { i18next } from "/client/api";
import { Components } from "@reactioncommerce/reaction-components";
import { useMutation } from "@apollo/react-hooks";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { useConfirmDialog } from "@reactioncommerce/catalyst";
import { useSnackbar } from "notistack";
import ProfileMediaItem from "./profileMediaItem";
import useAuth from "../../../../hooks/useAuth";

const archiveMediaRecordMutation = gql`
  mutation ArchiveMediaRecord($input: ArchiveMediaRecordInput!) {
    archiveMediaRecord(input: $input) {
      mediaRecord {
        _id
      }
    }
  }
`;

const updateMediaRecordPriorityMutation = gql`
mutation UpdateMediaRecordPriorityMutation($input: UpdateMediaRecordPriorityInput!) {
  updateMediaRecordPriority(input: $input) {
    mediaRecord {
      _id
    }
  }
}
`;

/**
 * ProfileMediaGallery
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function ProfileMediaGallery(props) {
    
  const {
    editable,
    media,
    userId,
    variantId
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { refetchViewer } = useAuth();
  const [mediaItemToRemove, setMediaItemToRemove] = useState(null);
  const [archiveMediaRecord] = useMutation(archiveMediaRecordMutation, { ignoreResults: true });
  const [updateMediaRecordPriority] = useMutation(updateMediaRecordPriorityMutation, { ignoreResults: true });

  const handleRemoveMedia = async () => {
    
    await archiveMediaRecord({
      variables: {
        input: {
          mediaRecordId: mediaItemToRemove._id,
        }
      },
      optimisticResponse: {
        __typename: "Mutation",
        archiveMediaRecord: {
          id: mediaItemToRemove._id,
          __typename: "MediaRecord",
          mediaRecord: null
        }
      },
      onError(error) {
        Logger.error(error);
        enqueueSnackbar("Unable to remove media", { variant: "error" });
      }
    });

    // Re-fetch viewer data
    
    refetchViewer();
  };

  const {
    openDialog: openRemoveMediaDialog,
    ConfirmDialog: RemoveMediaConfirmDialog
  } = useConfirmDialog({
    title: "Remove Media",
    message: "Are you sure you want to remove this media item?",
    onConfirm: () => {
      handleRemoveMedia();
    }
  });

  const confirmRemoveMediaItem = (mediaItem) => {
    setMediaItemToRemove(mediaItem);
    openRemoveMediaDialog();
  };

  const handleSetMediaPriority = async (mediaRecord, priority) => {
    updateMediaRecordPriority({
      variables: {
        input: {
          mediaRecordId: mediaRecord._id,
          priority,
          
        }
      },
      onError(error) {
        Logger.error(error);
        enqueueSnackbar("Unable to update media priority", { variant: "error" });
      }
    });
  };

  let count = (Array.isArray(media) && media.length) || 0;
  const hasMedia = count > 0;

  const getFileMetadata = () => {
    count += 1;
    return {
      userId,
      variantId,
      priority: count
    };
  };

  const onUploadError = (error) => {
    enqueueSnackbar(error.reason || error.message, { variant: "error" });
  };

  return (
    <div  sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: '140px',
      border: '1px dashed #cccdde',
      width: '140px',
      height: '140px',

    }}>
     
          {
            (media?.length >0 ) && 
              <ProfileMediaItem
                editable={editable}
                onRemoveMedia={confirmRemoveMediaItem}
                onSetMediaPriority={handleSetMediaPriority}
                size="small"
                source={media[0]}
              />
           
          }
         {count==0 &&
                <Components.MediaUploader
                  canUploadMultiple
                  metadata={getFileMetadata}
                  onError={onUploadError}
                  refetchProduct={refetchViewer}
                />
         }

       
      <RemoveMediaConfirmDialog />
    </div>
  );
}

ProfileMediaGallery.propTypes = {
  editable: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
  media: PropTypes.arrayOf(PropTypes.object),
  onSetMediaPriority: PropTypes.func,
  Id: PropTypes.string,
 
  variantId: PropTypes.string
};

export default ProfileMediaGallery;
