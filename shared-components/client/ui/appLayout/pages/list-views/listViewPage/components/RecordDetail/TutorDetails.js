import React from 'react';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CardHeader from "@mui/material/CardHeader";
import { alpha, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Stack from "@mui/material/Stack";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import Div from "@jumbo/shared/Div";
import { Category } from '@material-ui/icons';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Grid from "@mui/material/Grid";
import { Box } from '@material-ui/core';

const TutorDetails = ({ record, onClose, thumbnailImage }) => {
    return (
        <Div sx={{ m: theme => theme.spacing(-2.5, -3)}}>
            <CardHeader
                title={<Typography variant="h3" style={{ fontWeight: 'bold' }}>
                    {record?.name}
                </Typography>}
                subheader={record?.job_title}
                avatar={<Avatar src={thumbnailImage} />}
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
                                <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Email</Typography>

                                <Typography variant={"h5"} mb={0} style={{ fontWeight: 'bold', marginLeft: '7rem', marginBottom: '0.5rem' }}>{record?.email}</Typography>
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
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>

                                <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Address</Typography>
                                <Typography variant={"h5"} mb={0} style={{ fontWeight: 'bold', marginLeft: '6rem' }}>{record?.address}</Typography>
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
                                <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Qualification</Typography>
                                <Typography variant={"h5"} mb={0} style={{ fontWeight: 'bold', marginLeft: '4rem' }}>{record?.qualification}</Typography>
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
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Course category </Typography>
                                <Typography component={"div"} style={{ fontWeight: 'bold', marginLeft: '2rem' }}>
                                    <JumboChipsGroup
                                        spacing={1}
                                        size={"small"}
                                        chips={record?.categories}
                                        mapKeys={{ label: "name", color: "color" }}
                                    />
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
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Experience</Typography>
                                <Typography variant={"h5"} mb={0} style={{ fontWeight: 'bold', marginLeft: '5rem' }}>{record?.experience}</Typography>
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
                            <MonetizationOnIcon sx={{ color: 'primary.light' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Price per Hour</Typography>
                                <Typography variant={"h5"} mb={0} style={{ fontWeight: 'bold', marginLeft: '3rem' }}>{record?.price}</Typography>
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
                        disableTypography
                        primary={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="body1" color="textSecondary" style={{ marginRight: '1rem' }}>
                                    Available days
                                </Typography>
                                <div style={{ marginLeft: '2rem', display: 'flex', }}>
                                    {record?.availableDays?.map(days => (
                                        <Typography variant="h5" key={days} style={{ marginTop: '0.5rem', fontWeight: 'bold', marginRight: '1rem' }}>
                                            {days}
                                        </Typography>
                                    ))}
                                </div>
                            </div>
                        }
                    />

                </ListItem>
            </List>
            <Divider component={"li"} />
            <ListItem sx={{ px: 4 }}>
                <ListItemAvatar sx={{ minWidth: 66 }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            height: 48,
                            width: 48,
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                        }}
                    >
                        <ManageAccountsIcon sx={{ color: 'primary.light' }} />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                            <Typography variant="body1" color="text.secondary" mb={0.5}>
                                Available Timing
                            </Typography>

                            <Grid container style={{ marginLeft: '3rem' }}>
                                <Grid item xs={6}>
                                    <Typography variant="body1" color="text.secondary" mb={0.5}>
                                        From
                                    </Typography>
                                    <Typography variant="h5" mb={0} style={{ fontWeight: 'bold' }}>
                                    {record?.selectedFromTime}                              
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body1" color="text.secondary" mb={0.5}>
                                        To
                                    </Typography>
                                    <Typography variant="h5" mb={0} style={{ fontWeight: 'bold' }}>
                                        {record?.selectedToTime}

                                    </Typography>
                                </Grid>
                            </Grid>
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
                    primary={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant={"body1"} color={"text.secondary"} mb={.5}>Bio</Typography>
                            <Typography variant={"h5"} mb={0} style={{ fontWeight: 'bold', marginLeft: '9rem' }}>{record?.bio}</Typography>
                        </div>}
                />
            </ListItem>
            <Stack spacing={1} direction={"row"} sx={{ px: 4, py: 2 }}>
                <IconButton
                    size={'large'}
                    sx={{
                        backgroundColor: theme => theme.palette.grey[400],
                        color: 'common.white',

                        '&:hover': {
                            backgroundColor: 'primary.main'
                        }
                    }}
                >
                    <ForumOutlinedIcon fontSize={'medium'} color={"inherit"} />
                </IconButton>
                <IconButton
                    size={'large'}
                    sx={{
                        backgroundColor: theme => theme.palette.grey[400],
                        color: 'common.white',

                        '&:hover': {
                            backgroundColor: 'primary.main'
                        }
                    }}
                >
                    <LocalPhoneIcon fontSize={'medium'} color={"inherit"} />
                </IconButton>
            </Stack>
        </Div>
    );
};

export default TutorDetails;
