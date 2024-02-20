import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import { ListItemIcon, ListItemText, ThemeProvider, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import useAuth from "/imports/client/ui/hooks/useAuth";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";
import { Meteor } from "meteor/meteor";


const { filesBaseUrl } = Meteor.settings.public;

const AuthUserDropdown = ({ shopId }) => {
    
    const navigate = useNavigate();
    const { setAuthToken, refetchViewer } = useJumboAuth();
    const { theme } = useJumboTheme();
    const Swal = useSwalWrapper();
    const { isViewerLoading, viewer, data } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState(viewer);
    const userdata = viewer;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);
 let imageSrc =userdata?.userMedia[0]?.URLs?.small;
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
    }, [viewer]);
    const onProfile = () => {

        navigate("/profile");
        handleClose()
    };

    const onEditProfile =() => {
        navigate("/profile/edit-profile");
    }

        const onLogout = () => {
        setAuthToken(null);
        navigate("/user/login");
    };


    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <Avatar
                        alt={userdata?.primaryEmailAddress}
                        src={imageSrc}
                        sizes={"small"}
                        sx={{ boxShadow: 25, cursor: 'pointer', width: 30, height: 30 }}

                    />
                   
                }
                anchorEl={anchorEl}
                isOpen={isOpen}
                handleClick={handleClick}
                handleClose={handleClose}
            >
                <Div sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    p: theme => theme.spacing(2.5),
                }}>
                    <Avatar src={imageSrc} alt={userdata?.name} sx={{ width: 60, height: 60, mb: 2 }} />
                    <Typography variant={"h5"}></Typography>
                    <Typography variant={"body1"} color="text.secondary">{userdata?.name && userdata?.name.charAt(0).toUpperCase() + userdata?.name.slice(1)}</Typography>
                    <Typography variant={"body1"} color="text.secondary">{userdata?.primaryEmailAddress}</Typography>
                </Div>
                <Divider />
                <nav>
                    <List disablePadding sx={{ pb: 1 }}>
                        <ListItemButton>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <PersonOutlineIcon />
                            </ListItemIcon>

                            <ListItemText primary="Profile" onClick={onProfile} sx={{ my: 0 }} />

                        </ListItemButton>
                        <ListItemButton onClick={onLogout}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" sx={{ my: 0 }} />
                        </ListItemButton>
                    </List>
                </nav>
            </JumboDdPopover>
        </ThemeProvider >
    );
};

export default AuthUserDropdown;
