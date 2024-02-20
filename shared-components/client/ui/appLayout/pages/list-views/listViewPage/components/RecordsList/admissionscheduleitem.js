import React, { useState } from 'react';
import { alpha, Avatar, IconButton, ListItemAvatar, ListItemText, Typography, Tooltip, Select, MenuItem, ListItem, FormControl, Menu, ButtonGroup, Button } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Div from '@jumbo/shared/Div';
import { Meteor } from "meteor/meteor";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import moment from 'moment';
import useAuth from '../../../../../../hooks/useAuth';
import MyProgramService from '../../../../../../graphql/services/programs/myProgram-services';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import MeetingLink from './meetinglink';

const { filesBaseUrl } = Meteor.settings.public;

const AdmissionScheduleItem = (params) => {

    // const [isJoined, setIsJoined] = useState(false);

    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = params
    const { viewer } = useAuth();
    const shopId = localStorage.getItem('accounts:shopId')
    const [status, setStatus] = useState(params?.lesson?.lessonStatus);
    const lessonId = params?.lesson.lessons[0]._id

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = new Date(params?.lesson?.startDate)
    const weekday = weekdays[day?.getDay()]

    const programId = params?.batch?.programId
    const batchID = (params?.batch?.id) ? params?.batch?.id : params?.batch?._id
    const lessonIds = []
    for (i = 0; i < params?.lesson?.lessons?.length; i++) {
        lessonIds.push(params?.lesson?.lessons[i]?._id)
    }
    const productId = params?.lesson?.lessons[0]?.product?._id;
    const meetingInfo = (params?.lesson?.meetingInfo) ? params?.lesson?.meetingInfo : '';

    const handleChange = async (event) => {

        const lessonStatus = event.target.value;
        setStatus(lessonStatus)
        const data = await MyProgramService.updateLessonStatus(shopId, programId, batchID, productId, lessonIds, lessonStatus);
        setRecordsListRefresh(true)
    };

    const onMeetingclick = () => {
        showDialog({
            //content: <CreateProgramBatchForm record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog}/>,
            content: <MeetingLink onClose={hideDialog} batchId={batchID} productId={productId} lessonIds={lessonIds} setRecordsListRefresh={setRecordsListRefresh} viewer={viewer} data={meetingInfo} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "900px",
                        borderRadius: '15px',
                        // Set your width here
                    },
                },
            },
        });

    }


    /*   const handleJoinClick = () => {
          setIsJoined(true); 
      };
   */


    return (
        <React.Fragment>
            <ListItemButton
                component={"li"}
                sx={{
                    // p: theme => theme.spacing(1, 3),
                    transition: 'all 0.2s',
                    borderBottom: 1,
                    borderBottomColor: 'divider',
                    minWidth: '400px',
                    '&:hover': {
                        boxShadow: `0 3px 10px 0 ${alpha('#000', 0.2)}`,
                        transform: 'translateY(-4px)',

                        '& .MuiChip-animation': {
                            width: 'auto',
                            height: 22,
                            fontSize: 12
                        }
                    },
                }}
            >
                {(params.batchdata?.program?.price != "0") &&
                    <ListItemText
                        variant={"body1"}
                        sx={{ width: '20%' }}
                        primary={<Div sx={{ display: "flex", varticalAlign: "middle" }}>

                            <Div>
                                <Typography sx={{ mt: 1 }} > {moment(day).format("DD MMM YY")}</Typography>
                                <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }} > {weekday}</Typography>
                            </Div>

                        </Div>
                        }

                    />
                }

                <ListItemText
                    variant={"body1"}
                    sx={{ width: '70%', varticalAlign: "middle", }}
                    primary={<>
                        <Div sx={{ display: "flex" }}>
                            <IconButton>
                                {meetingInfo?.recordedLink ? (
                                    <a href={meetingInfo.recordedLink} target={'_blank'}>
                                        <PlayCircleIcon sx={{ color: '#50C2C9' }} />
                                    </a>
                                ) : (
                                    <PlayCircleIcon />
                                )}
                            </IconButton>

                            <Div>
                                <Div>
                                    <Typography
                                        sx={{
                                            mt: 1,
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: "1",
                                        }}
                                    >
                                        {params.lesson?.lessons[0]?.name}
                                    </Typography>
                                    <Div sx={{ display: "flex" }}>
                                        <Typography><SchoolOutlinedIcon style={{ color: '#08d1c4', fontSize: '0.925rem', fontWeight: '700', lineHeight: '0.85rem', }} /></Typography>
                                        <Typography style={{ fontSize: '0.825rem', fontWeight: '700', lineHeight: '0.75rem', color: 'rgb(0, 186, 255)', paddingTop: '3px', paddingLeft: '3px' }}>
                                            {params?.lesson.lessons[0]?.product?.title}
                                        </Typography>
                                    </Div>
                                </Div>

                            </Div>
                        </Div>


                    </>
                    }

                />
                <ListItemText
                    variant={"body1"}
                    sx={{ width: '18%', varticalAlign: "middle", paddingLeft: '10%' }}>

                    <Typography sx={{ mt: 1, display: "-webkit-box" }} > {params.lesson?.lessonsDuration}</Typography>


                </ListItemText>


                {(params.batchdata?.program?.price != "0") &&

                    <ListItemAvatar variant={"body1"}
                        sx={{ width: '18%', varticalAlign: "middle", paddingLeft: '6%' }}>
                        <Tooltip title={params.lesson?.tutor?.name}>
                            <Avatar onClick={(event) => params.openAvatarMenu(event, params.lesson)} src={params.lesson?.tutor?.userMedia ? `${filesBaseUrl}${params.lesson?.tutor?.userMedia[0]?.URLs?.thumbnail}` : ''} alt={params?.lesson?.tutor?.name} />
                        </Tooltip>
                    </ListItemAvatar>
                }
                <Menu
                    anchorEl={params.avatarMenuAnchor}
                    open={Boolean(params.avatarMenuAnchor)}
                    onClose={params.closeAvatarMenu}
                >
                    {params.tutorList?.length > 0 ? (
                        params.tutorList.map((tutor, index) => (
                            <MenuItem key={tutor._id} onClick={() => params.handleAvatarClick(tutor, params.lesson.lessons[0]._id)}>
                                <Avatar src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} alt={tutor?.name} />
                                <Typography style={{ marginLeft: '5px' }}>{tutor?.name}</Typography>
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem>
                            <Typography> No Tutors Available for this Module</Typography>
                        </MenuItem>
                    )}
                </Menu>
                <ListItem
                    sx={{ width: "20%", varticalAlign: "middle" }}
                >

                    <FormControl sx={{ m: 1, minWidth: 60 }} disabled={viewer?.role == "Student" ? true : false}>
                        {
                            (viewer?.role == "Admin" || viewer?.role == "Tutor") ?
                                <Select
                                    value={status}
                                    size="small"
                                    sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 }, color: "white", borderRadius: "30px", width: "auto", height: "30px", fontSize: 12, textAlign: "center", backgroundColor: status === 'Complete' ? '#28a745' : '#f29339', minWidth: '80px' }}
                                    inputProps={{ IconComponent: () => null }}
                                    onChange={handleChange}

                                >
                                    <MenuItem value="Complete" >Complete</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>

                                </Select>
                                :
                                <Typography
                                    variant={"body1"}
                                    sx={{
                                        color: status === "Complete" ? "white" : "white",
                                        backgroundColor: status === "Complete" ? '#28a745' : '#f5793A',
                                        fontSize: '14px',
                                        padding: "4px 10px",
                                        textAlign: "center",
                                        fontWeight: 'bold',
                                        borderRadius: "8px",
                                        display: "inline-block",
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {status}
                                </Typography>
                        }
                    </FormControl>
                </ListItem> &nbsp;&nbsp;&nbsp;

                {
                    viewer?.role === "Tutor" &&
                    <ListItem
                        sx={{ width: "20%", varticalAlign: "middle" }}
                    >
                        <ButtonGroup>
                            <Button sx={{
                                bgcolor: (meetingInfo?.link) ? "#2E475D" : 'white',
                                color: (meetingInfo?.link) ? 'white' : '#50C2C9',
                                '&:hover': {
                                    color: 'white',
                                    bgcolor: '#2e475d',
                                },
                                borderRadius: '8px',
                                textTransform: 'capitalize',
                                fontSize: '14px',
                                padding: "4px 10px",
                            }}
                                onClick={onMeetingclick} >Meet</Button>
                        </ButtonGroup>
                    </ListItem>
                }

                {
                    viewer?.role === "Student" &&
                    <ListItem
                        sx={{ width: "20%", varticalAlign: "middle" }}
                    >
                        <ButtonGroup>
                            <Button sx={{
                                bgcolor: !meetingInfo.link ? 'white' : "#3498db",
                                color: !meetingInfo.link ? '' : "white",
                                '&:hover': {
                                    color: 'white',
                                    bgcolor: '#2e475d',
                                },
                                borderRadius: '8px',
                                textTransform: 'capitalize',
                                fontSize: '14px',
                                padding: "4px 10px",



                            }} //onClick={handleJoinClick} 
                                disabled={!meetingInfo.link} href={meetingInfo?.link} target={'_blank'}>
                                Link
                            </Button>
                        </ButtonGroup>
                    </ListItem>
                }


            </ListItemButton>
        </React.Fragment>
    );
};
/* Todo project props */
export default AdmissionScheduleItem;
