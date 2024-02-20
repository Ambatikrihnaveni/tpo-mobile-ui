import React, { useState } from "react";
import PropTypes from "prop-types";
import gql from "graphql-tag";
import { makeStyles} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
import { useMutation } from "@apollo/react-hooks";
import Button from "@reactioncommerce/catalyst/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { FileRecord } from "@reactioncommerce/file-collections";
import { registerComponent } from "@reactioncommerce/reaction-components";
import _ from "lodash";
import { i18next, Logger } from "/client/api";
import { CloudUpload } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-regular-svg-icons';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import './media.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import useAuth from "../../../../../../client/ui/hooks/useAuth";
const createMediaRecordMutation = gql`
  mutation CreateMediaRecord($input: CreateMediaRecordInput!) {
    createMediaRecord(input: $input) {
      mediaRecord {
        _id
      }
    }
  }
`;

/**
 * MediaUploader
 * @param {Object} props Component props
 * @returns {Node} React component
 */

 const useStyles = makeStyles(() => ({
  root: {
    position: "relative"
  },
  image: {
    height: 100
  },
  priorityField: {
    width: 70
  }
}));


function ImageUploader(props) {
  const { canUploadMultiple, metadata, onError, onFiles, refetchProduct } = props;
  const shopId = props?.shopId ?  props.shopId:''
  const { viewer } = useAuth()
  const classes = useStyles();
const [image,setImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false);
  const [createMediaRecord] = useMutation(createMediaRecordMutation, { ignoreResults: true });

  const uploadFiles = (acceptedFiles) => {
    if (acceptedFiles.length>0) {
      // Use FileReader to read the image file
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the image URL to the result of the FileReader
        setImage(reader.result);
      };

      reader.readAsDataURL(acceptedFiles[0]);
    }
    const filesArray = Array.from(acceptedFiles);
    setIsUploading(true);

    const promises = filesArray.map(async (browserFile) => {
      const fileRecord = FileRecord.fromFile(browserFile);

      if (metadata) {

        if (typeof metadata === "function") {
          fileRecord.metadata = metadata();
        } else {
          fileRecord.metadata = metadata;
        }
      }

      await fileRecord.upload();

      // We insert only AFTER the server has confirmed that all chunks were uploaded
      return createMediaRecord({
        variables: {
          input: {
            mediaRecord: fileRecord.document,
            //shopId
          }
        }
      });
    });


    Promise.all(promises)
      .then((responses) => {
        // NOTE: This is a temporary workaround due to the fact that on the server,
        // the sharp library generates product images in an async manner.
        // A better solution would be to use subscriptions
        const uploadedMediaIds = responses.map((response) => response.data.createMediaRecord.mediaRecord._id);

        // Poll server every two seconds to determine if all media has been successfully processed
        let isAllMediaProcessed = false;
      /*   const timerId = setInterval(async () => {
          
          const { data: { product } } = await refetchProduct();

          // Get media for product, variants and options
          let allMedia = [product?.media];
          if (product?.variants) {
            product?.variants.forEach((variant) => {
              // Add variant media if set
              if (variant.media) {
                allMedia.push(variant?.media);
              }

              // Add option media if set
              if (variant.options) {
                variant.options.forEach((option) => {
                  allMedia.push(option.media);
                });
              }
            });
          }

          allMedia = _.flatten(allMedia);

          const mediaItems = [];
          allMedia?.forEach((media) => {
            const { id } = decodeOpaqueId(media?._id ? media?._id:'');
            mediaItems.push({ id, thumbnailUrl: media?.URLs?.small });
          });

          isAllMediaProcessed = uploadedMediaIds.every((uploadedMediaId) => {
            const mediaItem = mediaItems.find((item) => item.id === uploadedMediaId);

            // If a url has been generated, then these media items has been processed successfully.
            return mediaItem && mediaItem.thumbnailUrl !== String(null);
          });

          if (isAllMediaProcessed) {
            setIsUploading(false);
            clearTimeout(timerId);
          }
        }, 2000); */

        // Stop polling after 30 seconds
       /*  setTimeout(() => {
          clearTimeout(timerId);
          setIsUploading(false);
        }, 2000); */

        return null;
      })
      .catch((error) => {
        setIsUploading(false);
        if (onError) {
          onError(error);
        } else {
          Logger.error(error);
        }
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpg, image/png, image/jpeg",
    disableClick: true,
    disablePreview: true,
    multiple: canUploadMultiple,
    onDrop(files) {
      
      if (files.length === 0) return;

      // Pass onFiles func to circumvent default uploader
      if (onFiles) {
        onFiles(files);
      } else {
        uploadFiles(files);
      }
    }
  });

  return (
<>
  {/*   <div {...getRootProps({ className: "dropzone" })} >
   <div {...getRootProps({ className: "dropzone" })} style={{marginTop:'-100px',marginLeft: viewer?.role === "Student" ? '65px' : viewer?.role === "College-Admin" ? '-65px' : viewer?.role === "Admin" ? '42.5%' : viewer?.role === "Tutor" ? '42.5%' : '0px' || viewer?.role ==="Master-Admin" ? "465px":'0px',marginBottom:'90px'}}> 
      <input {...getInputProps()} />
      {isUploading ?
        <LinearProgress style={{width: '5%',marginLeft: 'auto',marginRight: 'auto',}}/>
        :
          <label htmlFor="fileInput"   style={{ position: 'relative', zIndex: 1 }}>
          <UploadFileIcon style={{ color:'#777',marginLeft: viewer?.role === "Student" ? '40px' : '0px' ||viewer?.role === "Tutor" ? '30px' : '0px', marginRight:viewer?.role === "College-Admin"  ? '50px' : '0px' }}/>

          <br/>
       <span style={{ color:'#777' , textTransform:'none',marginLeft:viewer?.role === "Student" ? '15px' : '0px'|| viewer?.role === "Admin"  ? '0px' : '0px' || viewer?.role === "Tutor" ? '-115px' : '0px',marginRight:viewer?.role === "College-Admin"  ? '10px' : '0px'}}>Upload Image</span>  
    </label>
      }
    </div>
    </div> */}
    
    <div style={{textAlign: viewer?.role === "Admin" ? 'center' :'start' || viewer?.role === "Tutor" ?"center":"start" || viewer?.role === "Master-Admin" ? "center":"start"}}>
{image == null ?  <label className="custom-file-upload fas" >
     

     <FileUploadIcon fontSize="large" sx={{ color:'white',marginTop: '30%',textAlign:'center'}}/>
     <br/>
     <label sx={{marginLeft:'5px'}}> <b> Upload image</b></label>
  <input id="photo-upload" type="file" {...getInputProps()} /> 

 </label> :  <div>  <img
          alt=""
          className={classes.image}
          src={image}
          style={{borderRadius: '140px',
          width: '140px',
          height: '140px',
          marginRight:'-40px',
          marginBottom:'27px'
        }}/></div> }
    {/*  <label className="custom-file-upload fas" >
     

        <FileUploadIcon fontSize="large" sx={{ color:'white',marginTop: '30%',textAlign:'center'}}/>
        <br/>
        <label sx={{marginLeft:'5px'}}> <b> Upload image</b></label>
     <input id="photo-upload" type="file" {...getInputProps()} /> 
  
    </label> */}
  </div>
    </>
  );
}

ImageUploader.propTypes = {
  canUploadMultiple: PropTypes.bool,
  metadata: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  onError: PropTypes.func,
  onFiles: PropTypes.func,
  refetchProduct: PropTypes.func,
  shopId: PropTypes.string
};

ImageUploader.defaultProps = {
  canUploadMultiple: false
};

registerComponent("ImageUploader", ImageUploader);

export default ImageUploader;
