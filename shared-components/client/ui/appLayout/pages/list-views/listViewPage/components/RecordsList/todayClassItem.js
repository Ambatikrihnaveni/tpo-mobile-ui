import React, { useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    Card,
    CardHeader,
    CardContent,
    Checkbox,
    Divider,
    Tooltip,
    Typography,
    Avatar,
    AvatarGroup,
    Stack,
    Button,
    alpha,
    ButtonGroup,
    Grid,
    LinearProgress,
    CardActions,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import moment from 'moment';
import getPDPUrl from '../../../../../../../../plugins/included/product-admin/client/utils/getPDPUrl';
import { recordService } from "../../../../../services/record-services";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import useListViewPage from "../../hooks/useListViewPage";
import { useMutation } from "react-query";
import RecordDetail from "../RecordDetail";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import ModulePreview from '../../../../../../../../plugins/core/Modules/components/moduleView/modulePreview';
import Popover from "@mui/material/Popover";
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import Chip from '@reactioncommerce/catalyst/Chip';
import useAuth from '../../../../../../hooks/useAuth';
import SubmissionQuiz from './submissionQuiz';
import { ToastContainer, toast } from 'react-toastify';
import QuizItem from './quizitem';
import SubmissionAssignment from './submissionAssignment';
import { QuizTwoTone } from '@mui/icons-material';
import { result } from 'lodash';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));



const { filesBaseUrl } = Meteor.settings.public;

const TodayClass = ({ record, view, i }) => {
    
    const { viewer } = useAuth()
    const { showDialog, hideDialog } = useJumboDialog();
    const { setRecordsListRefresh } = useListViewPage();
    const [favorite, setFavorite] = React.useState(record?.starred);
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false)
    const [assignmentStatus, setAssignmentStatus] = React.useState('')
    const [assignmentResult, setAssignmentResult] = React.useState('')
    const [assignmentId, setAssignmentId] = React.useState('')
    const [assignmentMarks, setAssignmentMarks] = React.useState('')
    const recordType = "Module";
    const deletePrms = { record, recordType };
    let imageSrc = (record?.media) ? record?.media[0]?.URLs?.thumbnail : '';
    let smallImage = (record?.media) ? record?.media[0]?.URLs?.medium : '';
    let date = record?.createdAt;
    let truncateDate = date?.slice(0, 10);
    const lessonId = record.lessonId
    const productId = record.productId
    const colors = ['success', 'success', 'success', 'success'];

    const percentage = (parseFloat(assignmentMarks?.split('/')[0]) / parseFloat(assignmentMarks?.split('/')[1])) * 100;
    const isInvalid = isNaN(percentage) || percentage === 0 || assignmentMarks.trim() === "";

    

    const handleDetailsClick = () => {
        localStorage.removeItem('lessonId')
        localStorage.setItem('lessonId', lessonId)
        localStorage.setItem('lessonId', productId)

        navigate(`/todaysclass/${lessonId}/${productId}/quiz`)

    }

    React.useEffect(() => {
        if (record?.assignmentResult?.length > 0) {
            const assignmentIds = record.assignments.map(assignment => assignment._id);
            const resultIds = record.assignmentResult.map(result => result.assignmentId);

            // Check if all assignmentIds are in resultIds
            const allSubmitted = assignmentIds.every(id => resultIds.includes(id));

            if (allSubmitted) {
                setAssignmentStatus("Submitted");
            } else {
                setAssignmentStatus("View");
                // You can set other properties if needed
                setAssignmentId(record?.assignmentResult[0]?.assignmentId);
            }
        }
        let obtainedMarks = 0
        for (let j = 0; j < record?.assignmentResult?.length; j++) {
            let foundResult = false;
            let totalMarks = 0;
            if (record?.assignmentResult[j]?.marks != "") {
                obtainedMarks += parseFloat(record?.assignmentResult[j]?.marks)
            }
            for (let l = 0; l < record?.assignments?.length; l++) {
                totalMarks += parseFloat(record?.assignments[l]?.total_points);
                let TotalMarks = 0
                let totalMinPassPoints = 0
                const minPassPoints = parseFloat(record?.assignments[l]?.min_pass_points);
                const marks = parseFloat(record?.assignmentResult[l]?.marks);
                const assignmentIds = record?.assignments?.map(assignment => assignment?._id);
                const resultIds = record?.assignmentResult?.map(result => result?.assignmentId);
                const allSubmitted = assignmentIds.every(id => resultIds?.includes(id));

                if (!isNaN(marks)) {
                    TotalMarks += marks;
                    totalMinPassPoints += minPassPoints;
                }
                if (TotalMarks == 0 && allSubmitted) {
                    setAssignmentResult("Evaluating");
                } else if (TotalMarks >= totalMinPassPoints || TotalMarks < totalMinPassPoints) {
                    setAssignmentResult("Evaluated");
                } else {
                    setAssignmentResult("Pending");
                }
            }

            // Calculate overall result based on total marks and total minimum pass points


            setAssignmentMarks(`${obtainedMarks}/${totalMarks}`);

            if (foundResult) {
                break; // Break out of the outer loop once a result is found
            }
        }


    }, [record]);


    const handleAssignmentClick = () => {
        navigate(`/todaysclass/${lessonId}/${productId}/assignment`)

    }


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const showtutorDetail = React.useCallback(() => {
        navigate(`/${record?.id}/viewprofile`)

    }, [showDialog, record]);
    const open = Boolean(anchorEl);
    const id = open ? "avatar-popover" : undefined;



    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }

    if (smallImage === String(null)) return null;

    if (smallImage) {
        smallImage = `${filesBaseUrl}${smallImage}`;
    } else {
        smallImage = "";
    }

    const deleteRecordMutation = useMutation(recordService.delete, {

        onSuccess: () => {
            hideDialogAndRefreshRecordsList();
        }
    });
    ;
    const hideDialogAndRefreshRecordsList = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);

    const viewProfile = (id) => {
        navigate(`/${id}/viewprofile`)
    }

    const showRecordDetail = React.useCallback(() => {
        showDialog({
            fullScreen: true,
            content: <SubmissionQuiz record={record} onClose={hideDialog} lessonId={lessonId} />
        })
    }, [showDialog, record]);

    const Assignment = React.useCallback(() => {
        showDialog({
            fullScreen: true,
            content: <SubmissionAssignment record={record} onClose={hideDialog} />
        })
    }, [showDialog, record]);

    const onEdit = React.useCallback(async (menuItem) => {
        const href = getPDPUrl({ productId: menuItem.data.id });
        navigate(href);
    }, [navigate]);

    const onRowClick = React.useCallback(async (record) => {

        const href = getPDPUrl({ productId: record.id });
        navigate(href);
    }, [navigate]);

    const handleItemAction = (menuItem) => {
        switch (menuItem.action) {
            case 'edit':
                onEdit(menuItem)
                break;
            case 'delete':
                showDialog({
                    variant: 'confirm',
                    title: 'Are you sure about deleting this module?',
                    content: "You won't be able to recover this module later",
                    onYes: async () => {
                        try {
                            await deleteRecordMutation.mutateAsync(deletePrms);
                            hideDialog();
                            toast.success('Module Deleted successfully');
                        } catch (error) {
                            hideDialog();
                            toast.error(error?.graphQLErrors?.length > 0 ? error?.graphQLErrors[0].message : error?.message);
                        }
                    },
                    onNo: hideDialog
                })
        }
    };
    const ActionButton = styled(Button)(({ theme }) => ({
        padding: theme.spacing(1.5, 2),
        borderBottom: 'none',
        borderRadius: 0,
        textTransform: 'none',
        letterSpacing: 0,
        borderColor: theme.palette.divider,
        color: theme.palette.text.secondary,

        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderBottom: 'none',
        },
    }));


    const string = record?.title
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 15);

    if (view === "grid") {
        const [isHovered, setHover] = React.useState(-1);

        return (

            <JumboGridItem xs={12} sm={4} md={4} lg={3}>
                <Card sx={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>

                    <CardContent>
                        <Typography variant={"h2"} fontWeight={"bold"} noWrap> {record?.lessonName} </Typography>
                        <Typography style={{ color: '#50C2C9', fontSize: '14px' }} mb={3}>{record?.programName}</Typography>
                        <div style={{ display: 'flex', marginBottom: '15px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Date :</Typography>
                            <Typography variant={"h5"} fontSize={16} ml={1}
                                noWrap>{moment(record?.date).format("DD.MM.YYYY")}</Typography>
                        </div>


                        <div style={{ display: 'flex', marginBottom: '15px', mt: 10 }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Quiz Score:</Typography>

                            <Typography sx={{ mt: -2, textAlign: "center", width: "100%" }}><Typography variant={"body1"} ml={1} sx={{ ml: 2, color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px" }} noWrap>{record?.QuizScore.replace('/', ' out of ')}</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={
                                        record?.QuizScore?.includes('/') && parseFloat(record?.QuizScore?.split('/')[1]) !== 0
                                            ? (parseFloat(record.QuizScore.split('/')[0]) / parseFloat(record.QuizScore.split('/')[1])) * 100
                                            : 0
                                    }
                                    sx={{
                                        width: '100%',
                                        borderRadius: 4,
                                        height: 9,
                                        mb: 2,
                                        mt: 1,
                                        ml: 2,
                                        textAlign: "center",
                                        backgroundColor: '#E9EEEF',
                                    }}
                                //color="success"
                                />
                            </Typography>
                        </div>


                        <div style={{ display: 'flex', marginBottom: '15px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Assignment Status:</Typography>

                            <Typography sx={{
                                color: assignmentResult === "Evaluated"
                                    ? "#28a745"
                                    : assignmentResult === "Pending"
                                        ? "#f29339"
                                        : assignmentResult === "Evaluating"
                                            ? "#ff0825"
                                            : "black",
                                fontWeight: "bold",
                                fontSize: "16px",
                                ml: 2

                            }}>{assignmentResult}</Typography>
                        </div>

                        <div style={{ display: 'flex' }}>
                            <Typography sx={{ mt: 2, fontWeight: 'bold' }}> Assignment Score :</Typography>
                            <Typography sx={{ mt: 2.6, textAlign: "center", width: "100%" }} ><Typography sx={{ ml: 2, color: 'rgb(156, 5, 135)' }}>{assignmentMarks.replace('/', ' out of ')}</Typography>
                                <LinearProgress
                                    variant="determinate"
                                   // value={(parseFloat(assignmentMarks?.split('/')[0]) / parseFloat(assignmentMarks?.split('/')[1])) * 100}
                                   value={isInvalid ? 0 : percentage}
                                    sx={{
                                        width: '100%',
                                        borderRadius: 4,
                                        height: 9,
                                        mb: 2,
                                        mt: 1,
                                        ml: 1,
                                        textAlign: "center",
                                    }}
                                
                                />
                            </Typography>
                        </div>

                    </CardContent>
                    <CardActions sx={{ p: 0, mx: '-1px', marginTop: "20px" }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                           
                            <ActionButton
                                sx={{
                                    backgroundColor:
                                        record?.quizzes?.length === 0
                                            ? "#e53353"
                                            : record.quizStatus === 'Submitted'
                                                ? record.someOtherCondition
                                                    ? "red"
                                                    : "#19c46e"
                                                : record.anotherCondition
                                                    ? "green"
                                                    : "#4285f4"
                                }}
                            >
                                <Typography variant={"body1"} ml={1} noWrap  sx={{ color: "white" }}>
                                    {record?.quizzes?.length === 0 ? (
                                        <Typography sx={{ display: "flex" }}>
                                            <QuizIcon />&nbsp;&nbsp; <Typography sx={{ border: 'none'}}>No Quizzes</Typography></Typography>
                                    ) : (
                                        <>
                                            {record.quizStatus === 'Submitted' ? (
                                                <Typography sx={{ display: "flex" }}>
                                                    <QuizIcon />&nbsp;&nbsp;
                                                    <Typography
                                                        sx={{ border: 'none', color: record.someOtherCondition ? "red" : "white" }}
                                                        onClick={showRecordDetail}
                                                    >
                                                        Submitted
                                                    </Typography>
                                                </Typography>
                                            ) : (
                                                <Typography sx={{ display: "flex" }}>
                                                    <QuizIcon />&nbsp;&nbsp;
                                                    <Typography
                                                        onClick={handleDetailsClick}
                                                        sx={{
                                                            border: 'none',
                                                            color: record.anotherCondition ? "green" : "white",
                                                        }}

                                                    >
                                                        Start Quiz
                                                    </Typography>
                                                </Typography>
                                            )}
                                        </>
                                    )}
                                </Typography>
                            </ActionButton>

                            <ActionButton sx={{
                                backgroundColor: assignmentStatus === 'Submitted' ? "#19c46e" : record?.assignments?.length === 0 ? "#e53353" : '#4285f4',
                                color: "white",
                            }}>
                                <Typography variant={"body1"} ml={1} noWrap sx={{color: "white"}}>
                                    {record?.assignments?.length === 0 ? (
                                        <Typography sx={{ display: "flex" }}>
                                            <AssignmentIcon />&nbsp;&nbsp;
                                            <Typography>No Assignments</Typography>
                                        </Typography>
                                    ) : (
                                        <>
                                            {assignmentStatus === 'Submitted' ? (
                                                <Typography sx={{ display: "flex" }}>
                                                    <AssignmentIcon />&nbsp;&nbsp;
                                                    <Typography onClick={Assignment} >Submitted</Typography></Typography>
                                            ) : assignmentStatus === 'Pending' ? (
                                                <Typography sx={{ display: "flex" }}>
                                                    <AssignmentIcon />&nbsp;&nbsp;
                                                    <Typography onClick={handleAssignmentClick} >Pending</Typography></Typography>
                                            ) : (
                                                <Typography sx={{ display: "flex" }}>
                                                    <AssignmentIcon />&nbsp;&nbsp;
                                                    <Typography onClick={handleAssignmentClick} >View</Typography></Typography>
                                            )}
                                        </>
                                    )}
                                </Typography>
                            </ActionButton>
                        </ButtonGroup>

                    </CardActions>
                </Card>
            </JumboGridItem>
        )
    }
    ;
    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
                itemData={record}
            >

                
                <ListItemText

                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '22%' }
                                    }} 
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap>{moment(record?.date).format("DD MM YYYY")}</Typography>

                                </Item>
                                <Item
                                    sx={{
                                        ml: -18,
                                        flexBasis: { sm: '50%', md: '22%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> {record?.lessonName?.length > 10
                                        ? `${record.lessonName.slice(0, 18)}...`
                                        : record?.lessonName
                                    } </Typography>
                                    <Typography style={{ color: '#50C2C9', fontSize: '14px' }}>{record?.programName}</Typography>
                                </Item>

                                <Item
                                    sx={{
                                        ml: -10,
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>
                                        {record?.quizzes?.length === 0 ? (
                                            <Chip label={"No Quizzes"} size={"small"} style={{ backgroundColor: "#e53353", color: "white" }} />
                                        ) : (
                                            <>
                                                {record.quizStatus === 'Submitted' ? (
                                                    <Chip label={"Submitted"} size={"small"} onClick={showRecordDetail} style={{ backgroundColor: "#19c46e", color: "white" }} />
                                                ) : (
                                                    <Chip
                                                        label={"Start Quiz"}
                                                        size={"small"}
                                                        onClick={handleDetailsClick}
                                                        style={{ backgroundColor: '#4285f4', color: "white" }}
                                                    // Disable the button if there are no quizzes
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Typography>

                                </Item>


                                <Item
                                    sx={{
                                        ml: -9,
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap sx={{ color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px" }}>{record?.QuizScore?.replace('/', ' out of ')}</Typography>
                                    <LinearProgress
                                        variant="determinate"
                                        //value={(parseFloat(record.QuizScore.split('/')[0]) / parseFloat(record.QuizScore.split('/')[1])) * 100}
                                        value={
                                            record?.QuizScore?.includes('/') && parseFloat(record?.QuizScore?.split('/')[1]) !== 0
                                                ? (parseFloat(record.QuizScore.split('/')[0]) / parseFloat(record.QuizScore.split('/')[1])) * 100
                                                : 0
                                        }
                                        sx={{
                                            width: '70%',
                                            borderRadius: 4,
                                            height: 9,
                                            mb: 2,
                                            mt: 1,
                                            ml: -8,
                                            textAlign: "center",
                                        }}
                                    // color={colors[(parseFloat(assignmentMarks?.split('/')[0]) / parseFloat(assignmentMarks?.split('/')[1])) % colors.length]}
                                    />
                                </Item>
                                <Item
                                    sx={{
                                        ml: -6,
                                        flexBasis: { md: '18%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>
                                        {record?.assignments?.length === 0 ? (
                                            <Chip label={"No Assignments"} size={"small"} style={{ backgroundColor: "#e53353", color: "white", width: "127px" }} />
                                        ) : (
                                            <>
                                                {assignmentStatus === 'Submitted' ? (
                                                    <Chip label={"Submitted"} size={"small"} onClick={Assignment} style={{ backgroundColor: "#19c46e", color: "white", width: "127px" }} />
                                                ) : (
                                                    <Chip
                                                        label={"View"}
                                                        size={"small"}
                                                        onClick={handleAssignmentClick}
                                                        style={{ backgroundColor: '#4285f4', color: "white", width: "127px" }}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '22%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Div style={{ display: "flex" }}>
                                        <Typography sx={{ color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px" }}>{assignmentMarks.replace('/', ' out of ')}</Typography>
                                        <Typography sx={{
                                            color: assignmentResult === "Evaluated"
                                                ? "#28a745"
                                                : assignmentResult === "Pending"
                                                    ? "#f29339"
                                                    : assignmentResult === "Evaluating"
                                                        ? "#ff0825"
                                                        : "black",
                                            ml: "15%"
                                        }}>{assignmentResult}</Typography>
                                    </Div>
                                    <LinearProgress
                                        variant="determinate"
                                       // value={(parseFloat(assignmentMarks?.split('/')[0]) / parseFloat(assignmentMarks?.split('/')[1])) * 100}
                                       value={isInvalid ? 0 : percentage}
                                        sx={{
                                            width: '70%',
                                            borderRadius: 4,
                                            height: 9,
                                            mb: 2,
                                            mt: 1,
                                            textAlign: "center",
                                        }}
                                    // color={colors[(parseFloat(assignmentMarks?.split('/')[0]) / parseFloat(assignmentMarks?.split('/')[1])) % colors.length]}
                                    />
                                </Item>

                            </Stack>
                        </Typography >
                    }
                />
                < ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </JumboListItem >
        </React.Fragment >
    );
};
/* Todo record, view prop define */
export default TodayClass;


