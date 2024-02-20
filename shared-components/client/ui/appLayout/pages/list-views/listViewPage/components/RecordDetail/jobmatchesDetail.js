import React from 'react';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardHeader from "@mui/material/CardHeader";
import { alpha, Button, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import List from "@mui/material/List";
import Div from "@jumbo/shared/Div";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Grid from "@mui/material/Grid";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const JobmatchesDetail = ({ record, onClose }) => {
    return (
        <Div sx={{ m: theme => theme.spacing(-2.5, -3) }}>
          <CardHeader
                subheader={record?.job_title}
                avatar={<Avatar src={record?.profile_pic} />}
                action={
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                }
            />  
            <List disablePadding>
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
                            <MailOutlineIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h2"} mb={0} >JobTitle</Typography>
                        <Typography variant={"h2"} mb={0} style={{color:"rgb(94, 164, 204)",marginLeft:'3rem'}}><a href={record.jobLink} target="_blank"  >{record.jobTitle}</a></Typography>
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
                            <AccountBalanceIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0} ><b>Company</b></Typography>
                        <Typography variant={"body1"} mb={.5} style={{marginLeft:'3.6rem'}}>{record?.company}</Typography>
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
                            <LocationOnIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}><b>Location</b></Typography>
                        <Typography variant={"body1"} mb={.5} style={{marginLeft:'4.3rem'}}>{record?.location}</Typography>
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
                            <CreditScoreIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0} ><b>Score</b></Typography>
                        <Typography variant={"body1"} mb={.5} style={{marginLeft:'5.5rem'}}>{record?.score}</Typography>
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
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}><b>Job Posting</b></Typography>
                        <Typography variant={"body1"} mb={.5} style={{marginLeft:'3rem'}}>{record?.platform}</Typography>
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
                            <BookmarkAddedIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"h5"} mb={0}><b>Date Matched</b></Typography>
                        <Typography variant={"body1"} mb={.5} style={{marginLeft:'2rem'}}>{record.matchedAt}</Typography>
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
                                marginTop: "-170px",
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <BookmarkAddedIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>
                   
                    <ListItemText
                        primary={<Typography variant={"h5"} mb={0} style={{marginBottom:'4px'}}><b>Job Description</b></Typography>}
                        secondary={record?.jobDescription?.responsibility?.map(responsibility => (
                            <Typography variant={"body1"} color={'#4d4b49'} style={{ listStyleType: "disc;" }}><ul sx={{ marginRight: "5px" }}> <li>{responsibility}</li></ul></Typography>
                        ))}
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
                                marginTop: "-170px",
                                marginRight: "15px",
                                bgcolor: theme => alpha(theme.palette.primary.main, .15)
                            }}
                        >
                            <ManageAccountsIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography variant={"h5"}  mb={0} style={{marginBottom:'4px'}}><b>Requirements</b></Typography>}
                        secondary={record?.jobDescription?.requirements?.map(requirements => (
                            <Typography variant={"body1"} color={'#4d4b49'} style={{ listStyleType: "disc;" }}><ul> <li>{requirements}</li></ul></Typography>
                        ))}
                    />
                </ListItem>
                <Divider component={"li"} />
                <ListItem>
                    <Grid container>
                        <Button variant="outlined" sx={{marginLeft:"470px",padding:"8px",borderRadius:"5px"}}>Apply</Button>
                    </Grid>

                </ListItem>
               
            </List>
        </Div>
    );
}
export default JobmatchesDetail