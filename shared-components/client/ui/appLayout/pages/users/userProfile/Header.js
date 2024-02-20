import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import ContentHeader from "../../../layouts/shared/headers/ContentHeader";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import GitHubIcon from '@mui/icons-material/GitHub';
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useAuth from "/imports/client/ui/hooks/useAuth";
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

const Item = styled("div")({
    textAlign: 'center',
});

const iconColors = {
    instagram: '#C13584',
    facebook: '#1877F2',
    youtube: 'red',
    github: 'purple',
    pinterest: '#BD081C',
};


const Header = ({ email, alt, image, }) => {

    const navigate = useNavigate();
    const { isViewerLoading, viewer, data } = useAuth();
    const [isHovered, setIsHovered] = useState(false);
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }


    let imageSrc = (userdata?.userMedia) ? (userdata?.userMedia[0]?.URLs?.small) : '';
    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    }

    React.useEffect(() => {
        Tracker.autorun((computation) => {
            if (viewer) {
                setUser(viewer);
            }
        });
    });
    const onEditProfile = () => {
        navigate(`edit-profile`);
    }

    const MouseEnter = () => {
        setIsHovered(true);
    };

    const MouseLeave = () => {
        setIsHovered(false);
    };
    
    return (
        <>
            <ContentHeader
                avatar={
                    <Avatar
                        sx={{ width: 72, height: 72 }}
                        alt={userdata?.name}
                        src={imageSrc}
                    />
                }

                title={<Typography fontSize={24} variant={'body1'} sx={{ fontWeight: "900px", textTransform: 'capitalize' }} >{userdata?.name}</Typography>}
                subheader={<Typography fontSize={16} variant={'body1'} color={'inherit'} mt={.5}>{userdata.profile?.city && userdata.profile?.country && (
                    <>
                        {userdata.profile.city}, {userdata.profile.country}
                    </>
                )}</Typography>}


                action={
                    <IconButton onClick={onEditProfile}>
                        <BorderColorIcon
                         onMouseEnter={MouseEnter}
                         onMouseLeave={MouseLeave}
                         style={{
                             color: isHovered ?  "#04bfa0" : "white",
                             cursor: "pointer"
                         }}

                        />
                    </IconButton>

                }
                sx={{
                    position: 'relative',
                    display: "flex",
                    ml: 5,
                    zIndex: 1,
                    '& .MuiCardHeader-action': {
                        alignSelf: 'center'
                    }
                }}
            />
            <IconButton style={{ margin: '0% 1% -3% 0%', float: 'right' }}>
                <InstagramIcon style={{ color: iconColors.instagram }} />
                <FacebookOutlinedIcon style={{ color: iconColors.facebook }} />
                <YouTubeIcon style={{ color: iconColors.youtube }} />
                <GitHubIcon style={{ color: iconColors.github }} />
                <PinterestIcon style={{ color: iconColors.pinterest }} />
            </IconButton>

        </>
    );
};

export default Header;
