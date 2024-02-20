import React from 'react';
import {
    ListItemText,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Button,
    ButtonGroup,
    Tooltip,
    Typography,
    Avatar,
    Stack,
    LinearProgress
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { recordService } from "../../../../../services/record-services";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import Chip from "@mui/material/Chip";
import AvatarGroup from '@mui/material/AvatarGroup';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import { useNavigate } from "react-router-dom";
import StudentClassDetails from './studentClassDetails';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import ProgramView from '../../../../../../../../plugins/core/programs/client/components/createModule/programView/programView';
import useAuth from '../../../../../../hooks/useAuth';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;


const StudentClassesItem = ({ record, view, recordType }) => {
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const [expanded, setExpanded] = React.useState(false);
    const recordTypes = "Student";
    const deletePrms = { record, recordTypes };
    const firstLetter = record?.name?.charAt(0).toUpperCase();
    const [isHovered, setIsHovered] = React.useState(false)
    const [previewData, setPreviewData] = React.useState({})
    const { isViewerLoading, viewer, data } = useAuth();

    let thumbnailImage = (record?.program) ? record?.program?.programMedia[0]?.URLs?.thumbnail : '';
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
    const onConnectclick = React.useCallback(() => {

        showDialog({
            content: <StudentClassDetails record={record} onClose={hideDialog} setRecordsListRefresh={setRecordsListRefresh} />,

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

    }, [])




    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {

            case 'connect':
                //onEdit(menuItem)
                showDialog({
                    content: <StudentClassDetails record={record} onClose={hideDialog} />,

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



        }
    };

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

            <Card xs={12} sm={5} md={5} lg={5} sx={{ margin: "40px 1px 20px 40px", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                <CardHeader
                    avatar={
                        <Chip variant={"body1"}
                            sx={{
                                color: status === "Completed" ? "white" : "white",
                                backgroundColor: status === "Completed" ? "#28a745" : "#f29339",
                                fontSize: '14px',
                                padding: "4px 14px",
                                borderRadius: "8px",
                                display: "inline-block",
                            }} label={status} />

                    }

                    action={

                        <JumboDdMenu
                            icon={<MoreHorizIcon />}
                            menuItems={[
                                { icon: <ConnectWithoutContactIcon />, title: "Connect ", action: 'connect', },
                            ]}
                            onClickCallback={handleItemAction}
                        />

                    }

                >
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
                        <Div sx={{ display: 'flex', mb: 1, justifyContent: 'center' }}>
                            <Avatar sx={{ width: 72, height: 72 }} src={thumbnailImage} />
                        </Div>

                        <Tooltip title={record?.name} >

                            <Typography variant={"h6"}
                                onClick={() => { onPreview(record.program) }}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                sx={{
                                    mb: 1,
                                    justifyContent: 'center',
                                    textDecoration: isHovered ? "underline" : "none",
                                    color: isHovered ? "#04bfa0" : "inherit",
                                    cursor: "pointer"
                                }}
                            >
                                <b>{record?.name}</b>
                            </Typography>

                        </Tooltip>

                        <Div variant={"h6"}
                            onClick={() => { onPreview(record.program) }}

                            sx={{
                                mb: 1,
                                justifyContent: 'center',
                                cursor: "pointer"
                            }}
                        >
                            <b>{record?.program?.name}</b>
                        </Div>
                        <Typography sx={{ mb: 1 }} variant={"body1"}>{record.startDate}</Typography>

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
                                    width: '85%',
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
                                mb={2}
                            >{`${(completedLessons?.length) ? completedLessons?.length : '0'}/ ${record?.lessonsDuration?.length} lessons completed`}
                            </Typography>
                        </Div>
                        <Div sx={{ display: 'flex', mb: 1, justifyContent: 'center' }}>
                            {(record?.tutors?.length > 0) ?
                                <AvatarGroup max={1}>
                                    {record?.tutors?.map((tutor) => (
                                        <Tooltip title={tutor.name}>
                                            <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} />
                                        </Tooltip>
                                    ))}

                                </AvatarGroup> : <Avatar src={''} alt={'NoTutor'} />

                            }
                        </Div>
                    </Div>

                </CardContent>
            </Card>
        )
    }

    return (
        <JumboListItem
            componentElement={"div"}
            itemData={record}
            recordType={recordType}
            secondaryAction={
                <>
                    <Div sx={{ display: { xs: 'block', sm: 'none' } }}>
                        <JumboDdMenu

                            icon={<MoreHorizIcon />}
                            menuItems={[
                                { icon: <ConnectWithoutContactIcon />, title: "Connect", action: "connect", data: record }
                            ]}
                            onClickCallback={handleItemAction}
                        />
                    </Div>
                    <ButtonGroup sx={{ display: { xs: 'none', sm: "block" } }}>
                        <Button sx={{
                            bgcolor: 'white',
                            '&:hover': {
                                color: 'white',
                                bgcolor: '#50C2C9',
                            },
                        }}
                            onClick={onConnectclick} >Connect</Button>
                    </ButtonGroup>
                </>
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
                                    sx={{ display: { xs: 'none', sm: 'block' }, }}

                                //  onClick={showtutorDetail}
                                >
                                    <Avatar src={thumbnailImage} alt={record?.name} />
                                </ListItemAvatar>
                                <div>
                                    <Typography variant={"h5"} mb={.5} sx={{ textTransform: 'capitalize' }}>{record.name}</Typography>
                                    <Typography fontSize={"12px"} variant={"body1"} color={"text.secondary"}>
                                        <CalendarTodayOutlinedIcon
                                            size="small"
                                            sx={{ verticalAlign: 'middle', fontSize: '0.7rem', mt: -.25 }} /> {record.startDate}
                                    </Typography>
                                </div>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-13%',
                                    flexBasis: { sm: '50%', md: '30%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                <Typography variant={"body1"} noWrap
                                    onClick={() => { onPreview(record.program) }}

                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    sx={{
                                        marginLeft: '-30px',
                                        textDecoration: isHovered ? "underline" : "none",
                                        color: isHovered ? "#04bfa0" : "inherit",
                                        cursor: "pointer" // Optional: Change cursor to indicate interaction
                                    }}
                                >{record?.program?.name}</Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { md: '10%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <ListItemAvatar>
                                    {(record?.tutors?.length > 0) ?
                                        <AvatarGroup max={1}>
                                            {record?.tutors?.map((tutor) => (
                                                <Tooltip title={tutor.name}>
                                                    <Avatar alt={tutor.name} src={`${filesBaseUrl}${tutor.userMedia[0]?.URLs?.thumbnail}`} />
                                                </Tooltip>
                                            ))}

                                        </AvatarGroup> : <Avatar src={''} alt={'NoTutor'} />

                                    }
                                
                                </ListItemAvatar>
                            </Item>

                            <Item
                                sx={{
                                    flexBasis: { md: '20%' },
                                    display: { xs: 'none', md: 'block' },
                                    marginLeft: '40px'
                                }}
                            > {`${(completedLessons?.length) ? completedLessons?.length : '0'} / ${record?.lessonsDuration?.length} Lessons Completed`}

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
                                    flexBasis: { md: '25%' },
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
export default StudentClassesItem;