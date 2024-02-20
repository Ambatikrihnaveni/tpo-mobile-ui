import React from 'react';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import NotificationBirthday from "./NotificationBirthday";
import NotificationInvitation from "./NotificationInvitation";
import NotificationSharedPost from "./NotificationSharedPost";
import NotificationPost from "./NotificationPost";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import CardHeader from "@mui/material/CardHeader";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Divider from "@mui/material/Divider";
import JumboIconButton from "@jumbo/components/JumboIconButton";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import Div from "@jumbo/shared/Div";
import { CardActions, ThemeProvider, Typography } from "@mui/material";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { useNavigate } from 'react-router-dom';
import Notifications from '../../../graphql/services/notifications/notications-services';

const NotificationComponents = {
    "POSTING": NotificationPost,
    "SHARED_POST": NotificationSharedPost,
    "INVITATION": NotificationInvitation,
    "BIRTHDAY": NotificationBirthday
};

const NotificationsDropdown = () => {

    const { theme } = useJumboTheme();
    const { headerTheme } = useJumboHeaderTheme();
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);
    const [noticationsData, setNotificationsData] = React.useState()
    const [ispen, setIsOpen] = React.useState(true)
    const [notificationsCount , setNotificationsCount]= React.useState()

    
    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);
    
    const onViewAll = () => {
        navigate('/notifications')
        handleClose()
    }

    React.useEffect(async () => {

        const data = await Notifications.notifications()
        let sliceData = []

        if (data) {
            let unreadNotifications=[]
            for(let i=0; i<data.length;i++){
                if(data[i].status=="unread"){
                    unreadNotifications.push(data[i])
                    dataCount= (unreadNotifications?.length > 0) ? unreadNotifications?.length :''
                    setNotificationsCount(dataCount)
                }

            }
            revereData= unreadNotifications.reverse()
            sliceData = revereData.slice(0, 5)
        }
        setNotificationsData(sliceData)
    }, [anchorEl,handleClose])

    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <ThemeProvider theme={headerTheme}>
                        <JumboIconButton badge={(noticationsData?.length > 0)? 'dot':'' }  badgeContent={ (noticationsData?.length > 0)? noticationsData?.length:'' } elevation={25}>
                            <NotificationImportantOutlinedIcon sx={{ fontSize: '1.25rem' }} />
                        </JumboIconButton>
                    </ThemeProvider>
                }
                disableInsideClick
                anchorEl={anchorEl}
                isOpen={isOpen}
                handleClick={handleClick}
                handleClose={handleClose}
            >
                <Div sx={{ width: 360, maxWidth: '100%' }}>
                    <CardHeader
                        title={"Notifications"}
                        action={<IconButton sx={{ my: -1 }}><MoreHorizIcon /></IconButton>}
                        sx={{color:'#8f0b75'}}
                    />
                    {(noticationsData?.length > 0) ?
                    <List disablePadding>
                        {noticationsData?.map((item, index) => (

                            <NotificationPost key={index} item={item} handleClose={handleClose} />

                        ))
                        }
                    </List> :
                    <List>
                               <Divider />
                        <Typography sx={{p:2,textAlign:'center'}}> No notications</Typography>
                    </List>
                    }
                    <Divider />
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button sx={{ textTransform: "none", fontWeight: 'normal', '&:hover': { bgcolor: 'transparent' } }}
                            size={"small"} variant="text" endIcon={<ArrowForwardIcon />} disableRipple onClick={onViewAll}>
                            View All
                        </Button>
                    </CardActions>
                </Div>
            </JumboDdPopover>
        </ThemeProvider>
    );
};

export default NotificationsDropdown;
