
import React from 'react';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardHeader from "@mui/material/CardHeader";
import { alpha, ListItem, ListItemAvatar, ListItemText, Typography,Button } from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import Divider from "@mui/material/Divider";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import List from "@mui/material/List";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Stack from "@mui/material/Stack";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import Div from "@jumbo/shared/Div";
import { Category } from '@material-ui/icons';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Grid from "@mui/material/Grid";
import LaunchIcon from '@mui/icons-material/Launch';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const RejectedjobDetails = ({ record, onClose }) => {
    return (
        <Div sx={{ m: theme => theme.spacing(-2.5, -3) }}>
            <CardHeader
                title={record?.name}
                subheader={record?.job_title}
                avatar={<Avatar src={record?.profile_pic} />}
                action={
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                }
            />
            <List disablePadding>


                <ListItem  sx={{ px: 4 }}>
                    <ListItemAvatar>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <MailOutlineIcon sx={{ color: 'primary.light' }} />
                        </Avatar> 
                    </ListItemAvatar>
                    <ListItemText
                        primary={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0} style={{marginLeft:'0.6rem'}}><b>Job Title</b></Typography>
                        <Typography variant={"body1"}  >{record?.email} <a href={record.jobLink} target='="_blank' style={{color:"rgb(94, 164, 204)",marginLeft:'5.2rem'}}>{record.jobTitle}</a></Typography>
                        </div>}
                    />
                </ListItem>
                <Divider component={"li"} />
                <ListItem sx={{ px: 4 }}>
                    <ListItemAvatar sx={{ minWidth: 66 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <ManageAccountsIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText
                        primary={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}><b>Company</b></Typography> 
                        <Typography variant={"body1"}   style={{marginLeft:'4.8rem'}}>{record?.company}</Typography>
                        </div>}
                    />
                </ListItem>
                <Divider component={"li"} />
                <ListItem sx={{ px: 4 }}>
                     <ListItemAvatar sx={{ minWidth: 66 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <BookmarkAddedIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText
                        primary={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}><b>Location</b></Typography> 
                        <Typography variant={"body1"}  style={{marginLeft:'5.2rem'}}>{record?.location} </Typography>
                        </div>}
                    />
                </ListItem>
                <Divider component={"li"} />
                <ListItem sx={{ px: 4 }}>
                     <ListItemAvatar sx={{ minWidth: 66 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <LibraryBooksIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText
                        primary={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}> <b>Score</b> </Typography> 
                        <Typography component={"div"} style={{marginLeft:'6.4rem'}}>
                            <JumboChipsGroup
                                spacing={1}
                                size={"small"}
                                chips={record?.categories}
                                mapKeys={{ label: "name", color: "color" }}
                                
                            />
                        {record?.score}
                        </Typography>
                        </div>
                        }
                    />
                </ListItem>
                <Divider component={"li"} />
                <ListItem sx={{ px: 4 }}>
                     <ListItemAvatar sx={{ minWidth: 66 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <ManageAccountsIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText
                        primary={<div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}><b>Jobposting</b></Typography> 
                        <Typography variant={"body1"} style={{display: 'flex', alignItems: 'center',marginLeft:'4.2rem'}}>{record?.platform}<LaunchIcon/></Typography>
                        </div>}
                    />
                     
                </ListItem>
            
                <Divider component={"li"} />
                <ListItem sx={{ px: 4 }}>
                     <ListItemAvatar sx={{ minWidth: 66 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <CalendarMonthIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText
                        primary={<Typography variant={"h5"} mb={0} style={{marginBottom:'4px'}}><b>Requirements</b></Typography>}
                       secondary={record?.jobDescription?.requirements?.map(requirements => (
                            <Typography variant={"body1"} color={"#4d4b49"}><ul> <li>{requirements}</li></ul></Typography>
                        ))} 

                    />
                </ListItem>
                <ListItem sx={{ px: 4 }}>
                     <ListItemAvatar sx={{ minWidth: 66 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                height: 48,
                                width: 48,
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <CalendarMonthIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar> 
                    <ListItemText
                        primary={<Typography variant={"h5"} mb={0} style={{marginBottom:'4px'}}><b>Description</b></Typography>}
                       secondary={record?.jobDescription?.responsibility?.map(responsibility => (
                            <Typography variant={"body1"} color={"#4d4b49"} style={{listStyleType:"disc;"}}><ul> <li>{responsibility}</li></ul></Typography>
                        ))} 

                    />
                </ListItem>
            </List>
            <Divider component={"li"} />
            <ListItem>
            <Grid container>
                        <Grid item xs={8}>
                         
                        </Grid>
                        <Grid item xs={4}>
                        
                      
                        </Grid>
                      </Grid>
           
            </ListItem>

        </Div>
    );
};

export default RejectedjobDetails;
