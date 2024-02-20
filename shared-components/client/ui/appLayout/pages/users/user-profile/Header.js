import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import ContentHeader from "../../../layouts/shared/headers/ContentHeader";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from '@mui/icons-material/Settings';
import styled from "@emotion/styled";
import {  Typography } from "@mui/material";
import useAuth from "/imports/client/ui/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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



const Header = ({ email, alt, image, }) => {
    const navigate = useNavigate();
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }

    let imageSrc = image ? image[0]?.URLs.small : '';
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
    const onEditProfile =() => {
        navigate(`edit-profile`);
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
            
            title={(userdata.name).charAt(0).toUpperCase() +(userdata.name).slice(1)}
            subheader={<Typography fontSize={12} variant={'body1'} color={'inherit'} mt={.5}>{userdata.primaryEmailAddress}</Typography>}
            action={
                userdata.role == "Student" && (
                <Button
                    disableRipple
                    startIcon={<LibraryBooksIcon />}
                    sx={{
                        color: 'inherit',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                    variant="outlined"
                    onClick={onEditProfile}
                >
                    Build Resume
                </Button>
                )
                ||
                (userdata.role=="Tutor"|| userdata.role=="Admin" || userdata.role == "Master-Admin") &&(
                    <Button
                    disableRipple
                    startIcon={<SettingsIcon />}
                    sx={{
                        color: 'inherit',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    }}
                    variant="outlined"
                    onClick={onEditProfile}
                >
                    Edit Profile
                </Button>
                )

            }
  
                
            sx={{
                position: 'relative',
                zIndex: 1,

                '& .MuiCardHeader-action': {
                    alignSelf: 'center'
                }
            }}
        />
    );
};

export default Header;
