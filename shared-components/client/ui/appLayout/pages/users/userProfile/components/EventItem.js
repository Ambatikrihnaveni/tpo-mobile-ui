import React from 'react';
import { Button, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Div from "@jumbo/shared/Div";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import Avatar from "@mui/material/Avatar";
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import ProgramPreview from '../../../../../../../plugins/core/library/client/components/LibraryPreview/programPreview';
const { filesBaseUrl } = Meteor.settings.public;


const EventItem = ({ event }) => {
       
    const { theme } = useJumboTheme();
    const dateObject = new Date(event?.createdAt);
    const { showDialog, hideDialog } = useJumboDialog();

    const formatted = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
    }, [hideDialog]);

    const record = event;

    const onProgramPreview = (record) => {
        showDialog({
            fullScreen: true,
            content: <ProgramPreview handleClose={hideDialog} record={record} data={record} />,
            sx: {
                borderRadius: 0
            }
        });
    }

   
    return (
        <ListItem
            alignItems="flex-start"
            sx={{
                p: theme => theme.spacing(2, 3),
                borderBottom: 1,
                borderBottomColor: 'divider',

                [theme.breakpoints.down('sm')]: {
                    flexWrap: 'wrap'
                }
            }}
        >
            <ListItemAvatar
                sx={{
                    width: 144,
                    mt: 0,
                    mr: 3,

                    [theme.breakpoints.down('md')]: {
                        width: 154,
                    },
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                        mr: 0,
                        mb: 3
                    }
                }}
            >
                <Avatar
                   src={`${filesBaseUrl}${event?.programMedia[0]?.URLs?.small }`} 

                    variant={"rounded"}
                    sx={{
                        width: '100%',
                        height: 112,
                        [theme.breakpoints.down('md')]: {
                            height: 132,
                        },
                        [theme.breakpoints.down('sm')]: {
                            height: 220,
                        }
                    }}
                />
            </ListItemAvatar>

            <ListItemText>

                <Typography
                    component={"div"}
                    sx={{
                        display: 'flex',
                        minWidth: 0,
                        [theme.breakpoints.down('md')]: {
                            flexWrap: 'wrap',
                        }
                    }}
                >
                    <Div
                        sx={{
                            flex: 1,
                            [theme.breakpoints.down('md')]: {
                                width: '100%'
                            }
                        }}
                    >
                        <Typography variant={"h4"} mb={1.25}>{event.name}</Typography>
                        <Typography
                            variant={"body1"}
                            color={'text.secondary'}
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                            }}
                        >
                            {event?.products?.length} Modules, {event.duration}
                        </Typography>
                    </Div>

                    <Div
                        sx={{
                            textAlign: { md: 'right' },
                            mt: { xs: 2, md: 1 },
                            [theme.breakpoints.down('md')]: {
                                width: '100%'
                            }
                        }}
                    >
                        <Typography
                            variant={'h3'}
                            color={"primary"}
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                alignItems: 'center',
                                mb: { md: 3.25 },
                                fontSize: { xs: 16, md: 20 }
                            }}
                        >
                            <EventNoteOutlinedIcon sx={{ fontSize: { xs: 20, md: 24 }, mr: 1 }} />{formatted}
                        </Typography>
                        <Button
                            variant={'text'}
                            endIcon={<ArrowRightAltOutlinedIcon sx={{ fontSize: 20, ml: 1 }} />}
                            sx={{
                                p: 0,
                                textTransform: 'none',
                                letterSpacing: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                }
                            }}
                            onClick={() => { onProgramPreview(event) }}
                        >
                            Check In Detail
                        </Button>
                    </Div>
                </Typography>

            </ListItemText>
        </ListItem>
    );
};

export default EventItem;
