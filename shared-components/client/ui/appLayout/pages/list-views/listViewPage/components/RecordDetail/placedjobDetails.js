
import React from 'react';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardHeader from "@mui/material/CardHeader";
import { alpha, ListItem, ListItemAvatar, ListItemText, Typography,Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import List from "@mui/material/List";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import Div from "@jumbo/shared/Div";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Grid from "@mui/material/Grid";
import LaunchIcon from '@mui/icons-material/Launch';

const PlacedjobDetails = ({ record, onClose }) => {
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
                        primary={<Typography variant={"h5"} mb={0}>Job Title</Typography>}
                        secondary={<Typography variant={"body1"} color={"text.secondary"}> <a href={record.jobLink} target='="_blank' style={{color:"#90f0ed"}}> {record?.jobTitle}</a></Typography>}
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
                        primary={<Typography variant={"h5"} mb={0}>Company</Typography>}
                        secondary={<Typography variant={"body1"} color={"text.secondary"}>{record?.company}</Typography>}
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
                        primary={<Typography variant={"h5"} mb={0}>Location</Typography>}
                        secondary={<Typography variant={"body1"} color={"text.secondary"}>{record?.location} </Typography>}
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
                        primary={<Typography variant={"h5"} mb={0}> Score </Typography>}
                        secondary={<Typography component={"div"}>
                            <JumboChipsGroup
                                spacing={1}
                                size={"small"}
                                chips={record?.categories}
                                mapKeys={{ label: "name", color: "color" }}
                            />
                        {record?.score}
                        </Typography>
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
                        primary={<Typography variant={"h5"} mb={0}>Jobposting</Typography>}
                        secondary={<Typography variant={"body1"} color={"text.secondary"}>{record?.platform}<LaunchIcon/></Typography>}
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
                        primary={<Typography variant={"h5"} mb={0}>Requirements</Typography>}
                       secondary={record?.jobDescription?.requirements?.map(requirements => (
                            <Typography variant={"body1"} color={"text.secondary"}><ul> <li>{requirements}</li></ul></Typography>
                        ))} 
                      //  secondary={<Typography variant={"h5"} mb={0} sx={{textJustify:"auto"}}>{record?. jobDescription?.requirements}</Typography>}

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
                        primary={<Typography variant={"h5"} mb={0}>Description</Typography>}
                       secondary={record?.jobDescription?.responsibility?.map(responsibility => (
                            <Typography variant={"body1"} color={"text.secondary"}><ul> <li>{responsibility}</li></ul></Typography>
                        ))} 
                      //  secondary={<Typography variant={"h5"} mb={0} sx={{textJustify:"auto"}}>{record?. jobDescription?.requirements}</Typography>}

                    />
                </ListItem>
            </List>
            <Divider component={"li"} />
            <ListItem>
            <Grid container>
                        <Grid item xs={8}>
                         
                        </Grid>
                        <Grid item xs={4}>
                        
                           <Button veriant="outlined">Apply</Button>
                            
                          
                        </Grid>
                      </Grid>
           
            </ListItem>

        </Div>
    );
};

export default PlacedjobDetails;
