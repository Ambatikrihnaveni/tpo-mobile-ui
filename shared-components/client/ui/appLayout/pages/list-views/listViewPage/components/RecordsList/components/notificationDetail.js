import React from 'react';
import {Card, CardContent, CardHeader, Stack, Tooltip, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {useMutation} from "react-query";
import Notifications from '../../../../../../../graphql/services/notifications/notications-services';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate, useParams} from "react-router-dom";
import Div from "@jumbo/shared/Div";
import moment from 'moment';
import Chip from "@mui/material/Chip";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useListViewPage from '../../../hooks/useListViewPage';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Span from "@jumbo/shared/Span";
import { Meteor } from "meteor/meteor";
import useAuth from '../../../../../../../hooks/useAuth';
import { useMediaQuery } from "@mui/material";

const { filesBaseUrl } = Meteor.settings.public;

const NotificationDetail = ({notificationId,recordType}) => {
    
    const { setRecordsListRefresh } = useListViewPage()
    const {category, id} = useParams();
    const {viewer} = useAuth()
    const navigate = useNavigate();
const [data,setData]= React.useState({})
let imageSrc
if(viewer?.name==data?.fromAccount?.name){
    imageSrc = (data?.toAccount?.userMedia) ? data?.toAccount?.userMedia[0]?.URLs?.thumbnail : '';
}else if(viewer?.name != data?.fromAccount?.name){
    imageSrc = (data?.fromAccount?.userMedia) ? data?.fromAccount?.userMedia[0]?.URLs?.thumbnail : '';
}
 

if (imageSrc === String(null)) return null;

if (imageSrc) {
    imageSrc = `${filesBaseUrl}${imageSrc}`;
} else {
    imageSrc = "";
}

    const deleteMailMutation = useMutation(Notifications.deleteMail);

    const mailMoveToTrash = React.useCallback((notificationId) => {
        deleteMailMutation.mutate(notificationId);
        setRecordsListRefresh(true);
        navigate(-1);
    }, []);

React.useEffect(async()=>{
    const {notification} = await Notifications.getNotificationDetail(notificationId)
    setData(notification)
},[notificationId])
 
    const handleNavigateItem = () => {
     navigate(-1)
    }
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <Card>
            <CardHeader
                title={
                    <IconButton onClick={handleNavigateItem} sx={{ml: -1.25}}>
                        <ArrowBackIcon/>
                    </IconButton>
                }
                action={
                    <Stack direction={"row"} sx={{backgroundColor: 'transparent'}}>

                        <Tooltip title={"Delete"}>
                            <IconButton onClick={() => mailMoveToTrash(notificationId)}>
                                <DeleteOutlineIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                }
            />
            <CardContent sx={{p: 0,height:'70vh'}}>
                <JumboScrollbar
                    style={{minHeight: 500}}
                    autoHide autoHideDuration={200}
                    autoHideTimeout={500}
                    autoHeightMin={30}
                >
                    <Div
                        sx={{
                            px: 3,
                            display: 'flex',
                            minHeight: '100%',
                            flexDirection: 'column',
                            minWidth: 0,
                        }}
                    >
                        <Div sx={{mb: 1}}>
                          
                            <Div
                                sx={{
                                    display: 'flex',
                                    flexDirection: isMobile ? 'column' : 'row',

                                }}
                            >
                                <Avatar src={imageSrc}  sx={{width: 44, height: 44}}/>
                                <Div sx={{ml: isMobile ? 0 : 2, flex: 1}}>
                                    <Typography
                                        variant={'body1'}
                                        fontSize={16}
                                        sx={{
                                            display: 'flex',
                                            minWidth: 0,
                                            alignItems: 'center'
                                        }}
                                    >
                                            {(viewer?.name == data?.fromAccount?.name) ? data?.toAccount?.name : data?.fromAccount?.name}
                                    </Typography>
                                    {isMobile && (
                                        <Typography sx={{ color: "text.secondary" }}>
                                            {(viewer?.name == data?.fromAccount?.name) ? data?.toAccount?.primaryEmailAddress : data?.fromAccount?.primaryEmailAddress}
                                        </Typography>
                                    )}
                                    {!isMobile && (
                                        <Span sx={{ ml: 1, fontSize: 13, color: "text.secondary" }}>
                                            {(viewer?.name == data?.fromAccount?.name) ? data?.toAccount?.primaryEmailAddress : data?.fromAccount?.primaryEmailAddress}
                                        </Span>
                                    )}
                                 </Div>
                            </Div>
                        </Div>
                        <Div sx={{flex: 1}}>
                            <Div
                                sx={{
                                    position: 'relative',
                                    textAlign: 'center',
                                    mb: 2,
                                    '&:after': {
                                        display: 'inline-block',
                                        content: "''",
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        height: '1px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        backgroundColor: 'divider',
                                    },
                                }}
                            >
                                <Chip
                                    label={moment(data?.timeSent).format("DD MMMM HH:MM")}
                                    variant="outlined"
                                    sx={{
                                        position: 'relative',
                                        zIndex: 1,
                                        bgcolor: theme => theme.palette.background.paper,
                                        borderColor: 'divider',
                                        borderRadius: 2
                                    }}
                                />
                            </Div>
                            <Typography><div dangerouslySetInnerHTML={{ __html: data?.message }} /> </Typography>
                        </Div>
                        
                    </Div>
                </JumboScrollbar>
            </CardContent>
        </Card>
    );
};

export default NotificationDetail;
