import React from 'react';
import {Collapse, ListItemAvatar, ListItemText, Tooltip, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Span from "@jumbo/shared/Span";
import {getDateElements} from "@jumbo/utils";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Notifications from '../../../../../../graphql/services/notifications/notications-services';
import {useMutation} from "react-query";
import Div from "@jumbo/shared/Div";
import moment from 'moment';
import useListViewPage from '../../hooks/useListViewPage';
import {useJumboDialog} from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { Meteor } from "meteor/meteor";


const { filesBaseUrl } = Meteor.settings.public;

const NotificationItem = ({record,recordType}) => {
    const {theme} = useJumboTheme();
    const {setRecordsListRefresh} = useListViewPage();
    const {hideDialog, showDialog} = useJumboDialog();
    const navigate = useNavigate();
    const [favoriteMail, setFavoriteMail] = React.useState(record.favorite);
    const [showMessage, setShowMessage] = React.useState(false);

    let imageSrc ='';
if(recordType=="notifications"){
     imageSrc = (record?.from?.userMedia) ? record?.from?.userMedia[0]?.URLs?.thumbnail : '';
}else if(recordType=="sent"){
    imageSrc = (record?.to?.userMedia) ? record?.to?.userMedia[0]?.URLs?.thumbnail : '';
}
    if (imageSrc === String(null)) return null;
    
    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }

    const handleConversationClick = () => {
        setShowMessage(!showMessage);
        navigate(`/notifications/${record.id}/notification`);
    };
    const deleteMailMutation = useMutation(Notifications.deleteMail);

    const mailMoveToTrash = React.useCallback((id) => {
        deleteMailMutation.mutate(id);
        setRecordsListRefresh(true);
    }, [setRecordsListRefresh]);



  
    return (
        <React.Fragment>
            {
                showMessage && (
                    <Collapse in={showMessage}>
                        <MailDetail/>
                    </Collapse>
                )
            }
            {
                <React.Fragment>
                    <JumboListItem
                        componentElement={"div"}
                        itemData={record}
                        sx={{
                            cursor: 'pointer',
                            borderTop: 1,
                            borderTopColor: 'divider',
                            backgroundColor:(record?.status=="unread")? "action.hover":'',

                            '&:hover': {
                                bgcolor: 'action.hover',

                                '& .ListAction': {
                                    width: {sm: '100%'},
                                    opacity: {sm: 1}
                                },

                                '& .ListTextExtra': {
                                    visibility: {sm: 'hidden'},
                                    opacity: {sm: 0},
                                }
                            },

                            '& .MuiListItemIcon-root': {
                                 minWidth: 48
                            },

                            [theme.breakpoints.down('sm')]: {
                                flexWrap: 'wrap',
                                
                                '& .ListTextExtra': {
                                    // Styles for date and time in mobile view
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }
                                
                            }
                            
                        }}
                    >
       
                        <ListItemAvatar onClick={handleConversationClick} sx={{ display: { xs: 'none', md: 'block' }}}>
                            <Avatar alt={record?.from?.name} src={imageSrc}/>
                        </ListItemAvatar>
                        <ListItemText
                            onClick={handleConversationClick}
                            primary={
                                <Typography variant={"body1"} component={"div"}>
                                    <Typography variant={"h6"} sx={{textTransform:"capitalize"}}>{recordType=="sent" ? (record?.to?.name) :(record?.from?.name)}</Typography>
                                    <Typography
                                        variant={"body1"}
                                        color={'text.secondary'}
                                        //sx={{textTransform:"capitalize"}}
                                        noWrap
                                    >
                                        {recordType=="sent"? `Sent to ${record?.to?.name}` :`Received from ${record?.from?.name}`}
                                    </Typography>
                                </Typography>
                            }
                            sx={{flex: 1}}
                        />
                        <Div
                            sx={{
                                width: 160,
                                display: 'flex',
                                flexShrink: '0',
                                position: 'relative',
                                justifyContent: 'flex-end',

                                [theme.breakpoints.down('sm')]: {
                                    width: '100%',
                                    justifyContent: 'space-between'
                                }
                            }}
                        >
                            <Div
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                    flex: 1,
                                    transition: 'all 0.5s ease',

                                    [theme.breakpoints.down('sm')]: {
                                        justifyContent: 'flex-start',
                                        ml: 6
                                    }
                                }}
                                className={'ListTextExtra'}
                            >
                               
                                <Typography
                                    variant={'body1'}
                                    color={'text.secondary'}
                                    ml={1}
                                >
                                    {moment(record?.date).format("MMMM DD-YYYY")}
                                    {getDateElements(record.date).time}
                                </Typography>
                            </Div>
                            <Div
                                className='ListAction'
                                sx={{
                                    display: 'flex',

                                    [theme.breakpoints.up('sm')]: {
                                        position: 'absolute',
                                        top: '50%',
                                        width: 0,
                                        opacity: 0,
                                        overflow: 'hidden',
                                        transition: 'all 0.5s ease',
                                        justifyContent: 'flex-end',
                                        transform: 'translateY(-50%)',
                                    }
                                }}
                            >
                                <Span sx={{height: 36, overflow: 'hidden'}}>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => mailMoveToTrash(record?.id)}>
                                            <DeleteIcon fontSize={"small"}/>
                                        </IconButton>
                                    </Tooltip>
                                  
                                </Span>
                            </Div>
                        </Div>

                    </JumboListItem>
                </React.Fragment>
            }
        </React.Fragment>
    );
};

export default NotificationItem;
