import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar } from "@mui/material";
import {  makeStyles, IconButton,} from "@material-ui/core";
import CloseIcon from "mdi-material-ui/Close";
import { Meteor } from "meteor/meteor";
import useAuth from "/imports/client/ui/hooks/useAuth";
import { useNavigate } from "react-router-dom";



const { filesBaseUrl } = Meteor.settings.public;


const useStyles = makeStyles((theme) => ({
    passportAvatar: {
        borderRadius: '140px',
        width: '140px',
        height: '140px',
       // marginRight:'-40px',
        marginBottom:'27px',
        textAlign:'center',
       
    },
}));
/**
 * ProfileMediaItem
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function ProfileMediaItem(props) {
    const {
        defaultSource,
        onRemoveMedia,
        onSetMediaPriority,
        size,
        source
    } = props;

    const classes = useStyles();
    const [priority, setPriority] = useState(source?.priority);
    let imageSrc = source?.URLs[size];

    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = defaultSource;
    }

    const navigate = useNavigate();
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }


     React.useEffect(() => {
        Tracker.autorun((computation) => {
            if (viewer) {
                setUser(viewer);
            }
        });
    });

    return (
        <div style={{display:'flex',marginLeft:userdata.role == "Student"?'-60%':''}}>
            <Avatar src={imageSrc || '/broken-image.jpg'}
                className={classes.passportAvatar}
                style={{marginLeft:userdata.role == "Admin" || "Tutor"?'45%':'40%'}}
            />
            <IconButton
                onClick={() => {
                    onRemoveMedia(source);
                }}
            >
                <CloseIcon style={{marginLeft:'24px'}}/>
            </IconButton>
        </div>

    );
}

ProfileMediaItem.propTypes = {
    defaultSource: PropTypes.string,
    editable: PropTypes.bool, // eslint-disable-line react/boolean-prop-naming
    onRemoveMedia: PropTypes.func,
    onSetMediaPriority: PropTypes.func,
    size: PropTypes.string,
    source: PropTypes.object
};

ProfileMediaItem.defaultProps = {
    defaultSource: "/resources/placeholder.gif",
    editable: false,
    onRemoveMedia() { },
    size: "large"
};

export default ProfileMediaItem;
