import React from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Tooltip,
    Typography,
    Avatar,
    Stack,
    LinearProgress,
    Button,
    ButtonGroup
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { recordService } from "../../../../../services/record-services";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import StudentForm from '../../../../../../../../plugins/core/Students/clients/studentForm';
import Chip from "@mui/material/Chip";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import InviteStudent from './InviteStudent'
import { useNavigate } from "react-router-dom";
import TutorBatchDetails from './tutorbatchdetails';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import ProgramView from '../../../../../../../../plugins/core/programs/client/components/createModule/programView/programView';
import useAuth from '../../../../../../hooks/useAuth';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;


const TutorClassBatchItem = ({ record, view }) => {

    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const [expanded, setExpanded] = React.useState(false);
    const recordType = "Student";
    const deletePrms = { record, recordType };
    const firstLetter = record?.name?.charAt(0).toUpperCase();
    const [isHovered, setIsHovered] = React.useState(false)
    const [previewData, setPreviewData] = React.useState({})
    const { isViewerLoading, viewer, data } = useAuth();

    let thumbnailImage = (record?.userMedia) ? record?.userMedia[0]?.URLs?.thumbnail : '';
    if (thumbnailImage) {
        thumbnailImage = `${filesBaseUrl}${thumbnailImage}`;
    }
    const deleteRecordMutation = useMutation(recordService.delete, {
        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();

    const handleClickPreview = () => {
        navigate('/groups/groupList')
    }
    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);


    const handleClickOpen = (data) => {

        setPreviewData(data)
        setOpen(true);
    };



    const showRecordDetail = React.useCallback(() => {
        showDialog({
            /* fullScreen: true, */
            content: <RecordDetail record={record} onClose={hideDialog} style={{ borderRadius: '15px' }} thumbnailImage={thumbnailImage} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "1000px",
                        maxWidth: "1000px",
                        borderRadius: '15px'
                        // Set your width here
                    },
                },
            },
        })
    }, [showDialog, record]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const onPreview = (data) => {
        setPreviewData(data)
        showDialog({
            fullScreen: true,
            content: <ProgramView data={data} onClose={hideDialog} />,
            sx: {
                borderRadius: 0
            }
        })
    }


    const onConnectclick = () => {
        showDialog({
            //content: <CreateProgramBatchForm record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog}/>,
            content: <TutorBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} />,

            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "1200px",
                        borderRadius: '15px',
                        // Set your width here
                    },
                },
            },
        });

    }

    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {

            case 'connect':
                //onEdit(menuItem)
                showDialog({
                    //content: <CreateProgramBatchForm record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog}/>,
                    content: <TutorBatchDetails record={record} onSave={hideDialogAndRefreshRecordsList} onClose={hideDialog} />,

                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                maxWidth: "1200px",
                                borderRadius: '15px',
                                // Set your width here
                            },
                        },
                    },
                });
                break;

            case 'edit':
                showDialog({
                    title: 'Update Account',
                    content: <StudentForm record={record} onSave={hideDialogAndRefreshRecordsList} />
                });
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this record?',
                    content: "You won't be able to recover this record later",
                    onYes: () => deleteRecordMutation.mutate(deletePrms),
                    onNo: hideDialog
                })
                break;
            case "Invite Student":
                showDialog({
                    /* fullScreen: true, */
                    content: <InviteStudent onClose={hideDialog} style={{ borderRadius: '15px' }} setRecordsListRefresh={setRecordsListRefresh} />,
                    sx: {
                        "& .MuiDialog-container": {
                            "& .MuiPaper-root": {
                                width: "700px",
                                maxWidth: "1000px",
                                borderRadius: '15px',
                                marginLeft: '10px'
                                // Set your width here
                            },
                        },
                    },
                })

        }
    };
    const handleClick1 = () => {
        if (Projectdata.find((product) => product.id === record.id))
            setExpanded(!expanded);
    }
    let completedLessons = [];

    for (let x = 0; x < record?.lessonsDuration?.length; x++) {
        if (record?.lessonsDuration[x]?.lessonStatus === "Complete") {
            completedLessons.push(record?.lessonsDuration[x])

        }

    }


    const totalLessons = record?.lessonsDuration?.length || 0;
    const completedLessonsCount = completedLessons.length || 0;
    const progressPercentage = (completedLessonsCount / totalLessons) * 100;
    const status = completedLessons.length === totalLessons ? "Completed" : "In Progress";


    if (view === "grid") {
        return (

            <Card xs={12} sm={4} md={4} lg={3} sx={{ m: 4, marginLeft: "40px", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                <CardHeader
                    avatar={
                        <Chip sx={{
                            color: status === "Completed" ? "white" : "white",
                            backgroundColor: status === "Completed" ? "#28a745" : "#f29339",
                            fontSize: '14px',
                            padding: "4px 14px",
                            borderRadius: "8px",
                            display: "inline-block",
                        }} label={status} />

                    }

                >
                    <Button style={{ marginTop: '20px', padding: '10px' }} variant={'contained'} size={"small"} onClick={onConnectclick} >Connect</Button>
                </CardHeader>
                <CardContent sx={{
                    pt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignrecords: 'center'
                }}>
                    <Div sx={{
                        display: 'flex',
                        alignrecords: 'center',
                        flexDirection: 'column',
                        textAlign: 'center'
                    }}
                    >
                        <Div sx={{ display: 'flex', mb: 2 }}>
                            <Avatar sx={{ width: 72, height: 72, marginLeft: "80px" }} src={record.img} />
                        </Div>

                        <Tooltip title={record?.name} >
                            <Typography variant={"h6"} mb={2} sx={{ mb: 2 }}><b>{record.name}</b></Typography>
                        </Tooltip>
                        <Div sx={{ mb: 2 }}>
                        </Div>
                        <Div sx={{
                            display: 'flex',
                            minWidth: 0,
                            flexDirection: 'column',
                            alignrecords: 'center',
                            alignSelf: 'stretch',
                            width: '240px',
                            maxWidth: '100%',
                        }}
                        >
                            <LinearProgress
                                variant={"determinate"}
                                color="success"
                                value={progressPercentage}
                                sx={{
                                    borderRadius: 4,
                                    height: 5,
                                    mb: 1,
                                    backgroundColor: '#E9EEEF',
                                    marginLeft: "20px"
                                }}
                            />
                            <Typography
                                variant={"body1"}
                                color={"text.secondary"}
                                mb={3}
                            >{`${(completedLessons?.length) ? completedLessons?.length : '0'} / ${record?.lessonsDuration?.length} lessons completed`}
                            </Typography>
                        </Div>
                    </Div>

                    <Button style={{ marginTop: '20px', padding: '10px' }} variant={'contained'} size={"small"} sx={{
                        bgcolor: 'white',
                        color: '#50C2C9',
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#50C2C9',
                        },
                    }} onClick={onConnectclick} >Connect</Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}
            secondaryAction={

                <ButtonGroup>
                    <Button sx={{
                        bgcolor: 'white',
                        '&:hover': {
                            color: 'white',
                            bgcolor: '#50C2C9',
                        },
                    }}
                        onClick={onConnectclick} >Connect</Button>
                </ButtonGroup>
            }
            sx={{
                cursor: 'pointer',
                borderTop: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >


            <ListItemText
                // onClick={showtutorDetail}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>
                            <Item
                                sx={{
                                    display: 'flex',
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >
                                <ListItemAvatar

                                //  onClick={showtutorDetail}
                                >
                                    <Avatar src={''} alt={record?.name} />
                                </ListItemAvatar>
                                <div>
                                    <Typography variant={"h5"} mb={.5} sx={{ textTransform: 'capitalize' }}>{record.name}</Typography>
                                    <Typography fontSize={"14px"} variant={"body1"} color={"text.secondary"}>
                                        <CalendarTodayOutlinedIcon
                                            size="small"
                                            sx={{ verticalAlign: 'middle', fontSize: '0.7rem', mt: -.25 }} /> {record.startDate}
                                    </Typography>
                                </div>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '20%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"body1"} noWrap
                                    onClick={() => { onPreview(record.program) }}

                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    sx={{
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer" // Optional: Change cursor to indicate interaction
                                    }}
                                >{record.program?.name}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '5%',
                                    flexBasis: { md: '45%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >{`${(completedLessons?.length) ? completedLessons?.length : '0'} / ${record?.lessonsDuration?.length} Lessons Completed`}
                                <LinearProgress
                                    variant={"determinate"}
                                    color="success"
                                    value={progressPercentage}
                                    sx={{
                                        width: '85%',
                                        borderRadius: 4,
                                        height: 5,
                                        mb: 1,
                                        backgroundColor: '#E9EEEF',
                                        marginLeft: '15px'
                                    }}
                                />
                            </Item>

                           
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '60%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography
                                    variant={"body1"}
                                    sx={{
                                        color: status === "Completed" ? "white" : "white",
                                        backgroundColor: status === "Completed" ? "#28a745" : "#f29339",
                                        fontSize: '16px',
                                        padding: "4px 14px",
                                        borderRadius: "8px",
                                        display: "inline-block",
                                    }}
                                >
                                    {status}
                                </Typography>
                            </Item>


                        </Stack>
                    </Typography>
                }
            />

        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default TutorClassBatchItem;