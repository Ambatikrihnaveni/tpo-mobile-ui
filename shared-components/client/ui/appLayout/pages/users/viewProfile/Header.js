import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ContentHeader from "../../../layouts/shared/headers/ContentHeader";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";

const { filesBaseUrl } = Meteor.settings.public;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(0, 1),

    '&:hover': {
        backgroundColor: 'transparent',
    },

    '& .MuiTouchRipple-root': {
        display: 'none'
    }

}));


const Header = ({ email, alt, image, viewer }) => {
    ;
    const navigate = useNavigate();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }

    let imageSrc = (userdata?.userMedia) ? (userdata?.userMedia[0]?.URLs?.small) : '';
    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    }

    
    const onBack = () => {
        navigate(-1)
    }
    return (
        <ContentHeader
            avatar={
                <Avatar
                    sx={{ width: 72, height: 72 }}
                    alt={userdata?.name}
                    src={imageSrc}
                />
            }

            title={<Typography fontSize={24} variant={'body1'} sx={{ fontWeight: "900px" }} >{(userdata?.name)?.charAt(0).toUpperCase() + (userdata?.name)?.slice(1)}</Typography>}
            subheader={<Typography fontSize={16} variant={'body1'} color={'inherit'} mt={.5}>{userdata?.profile?.city}, {userdata?.profile?.country}</Typography>}

            sx={{
                position: 'relative',
                zIndex: 1,

                '& .MuiCardHeader-action': {
                    alignSelf: 'center'
                }
            }}
        >
            <IconButton onClick={onBack} sx={{ color: 'white', marginTop: "-50px" }} ><CloseIcon sx={{ fontSize: '25px', fontWeight: 'bold' }} /></IconButton>
        </ContentHeader>
    );
};

export default Header;
