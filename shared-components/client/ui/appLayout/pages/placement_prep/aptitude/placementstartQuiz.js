import React, { useState } from 'react';
import {
    ListItemText,
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    ButtonGroup,
    LinearProgress,
    CardActions,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";
import QuizIcon from '@mui/icons-material/Quiz';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import AptitudeQuizSubmit from '../Quizsubmit';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));



const { filesBaseUrl } = Meteor.settings.public;

const PlacementStartQuiz = ({ record, view, i }) => {
    ;
    const { showDialog, hideDialog } = useJumboDialog();
    const lessonId = record?.id
    const navigate = useNavigate()
    const location = useLocation();
    const url = location.pathname;
    const recordType = url.substring(1).split('/')[0];
    const [buttonText, setButtonText] = useState('')
    const [obtainedMarks, setObtainedMarks] = useState(0)
    const { viewer } = useAuth()
    const viewerQuizzes = viewer?.quizzes




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

    const showRecordDetail = React.useCallback(() => {
        showDialog({
            fullScreen: true,
            content: <AptitudeQuizSubmit onClose={hideDialog} lessonId={lessonId} />
        })
    }, [showDialog]);


    const handleDetailsClick = () => {

        if (viewer?.role === "Student") {
            if (recordType === "aptitude") {
                navigate(`/aptitude/${lessonId}/startquiz`);
            } else if (recordType === "technical") {
                navigate(`/technical/${lessonId}/startquiz`);
            }
        }
    };

    React.useEffect(() => {
        let submittedQuizzes = 0
        let obtainedMarks = 0
        for (let i = 0; i < record?.quizes?.length; i++) {
            for (let j = 0; j < viewerQuizzes?.length; j++) {
                if (
                    record?.quizes[i]._id == viewerQuizzes[j].quizId
                ) {
                    submittedQuizzes++
                    if (viewerQuizzes[j].result) {
                        obtainedMarks++
                    }
                }


            }
        }
        setObtainedMarks(obtainedMarks)
        if (submittedQuizzes == record?.quizes?.length) {
            setButtonText('Submitted')
        } else if (record?.quizes?.length == 0) {
            setButtonText('No Quizzes')
        } else {
            setButtonText('Start Quiz')
        }
    }, [])



    if (view === "grid") {
        const [isHovered, setHover] = React.useState(-1);

        return (

            <JumboGridItem xs={12} sm={4} md={4} lg={3}>
                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>

                    <CardContent>
                        <Typography variant={"h2"} fontWeight={"bold"} noWrap> {record?.lessonName} </Typography>
                           <div style={{ display: 'flex', marginBottom: '15px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Module :</Typography>
                            <Typography variant={"h5"} fontSize={16} ml={1}
                                noWrap>{record?.module}</Typography>
                        </div>




                        <div style={{ display: 'flex' }}>
                            <Typography sx={{ mt: 2, fontWeight: 'bold' }}> Quiz Score :</Typography>
                            <Typography sx={{ mt: 2.6, textAlign: "center", width: "100%" }} ><Typography sx={{ ml: 2, color: 'rgb(156, 5, 135)' }}> {record?.quizScore} Out Of {record?.quizes?.length}</Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(obtainedMarks / parseFloat(record.quizes?.length)) * 100}
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

                                <Typography sx={{ display: "flex" }}>
                                    <QuizIcon />&nbsp;&nbsp;


                                    {(record?.quizes?.length === 0) ? (

                                        <Typography
                                            onClick={handleDetailsClick}
                                            sx={{
                                                border: 'none',
                                                color: record.anotherCondition ? "green" : "white",
                                            }}

                                        >
                                            No Quizzes
                                        </Typography>)
                                        : (
                                            <>
                                                {buttonText === 'Submitted' ? (
                                                    <Typography
                                                        onClick={showRecordDetail}
                                                        sx={{
                                                            border: 'none',
                                                            color: record.anotherCondition ? "green" : "white",
                                                        }}

                                                    >
                                                        Submitted
                                                    </Typography>
                                                ) : (
                                                    <Typography
                                                        onClick={handleDetailsClick}
                                                        sx={{
                                                            border: 'none',
                                                            color: record.anotherCondition ? "green" : "white",
                                                        }}

                                                    >
                                                        Start Quiz
                                                    </Typography>
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
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0} noWrap>{record?.module}</Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '22%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>{record?.lessonName}</Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    {(record?.quizes?.length === 0) ? (
                                        <Chip label="No Quizes" onClick={handleDetailsClick} style={{ backgroundColor: '#3a82f0', color: 'white' }} />)
                                        : (
                                            <>
                                                {buttonText === 'Submitted' ? (
                                                    <Chip label={"Submitted"} size={"small"} onClick={showRecordDetail} style={{ backgroundColor: "#19c46e", color: "white" }} />
                                                ) : (
                                                    <Chip
                                                        label={"Start Quiz"}
                                                        //size={"small"}
                                                        onClick={handleDetailsClick}
                                                        style={{ backgroundColor: '#4285f4', color: "white" }}
                                                    // Disable the button if there are no quizzes
                                                    />
                                                )}
                                            </>
                                        )}
                                </Item>


                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap sx={{ color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px" }}>
                                        {obtainedMarks} Out Of {record.quizes?.length}
                                    </Typography>

                                    <LinearProgress
                                        variant="determinate"
                                        value={(obtainedMarks / parseFloat(record.quizes?.length)) * 100}
                                        sx={{
                                            width: '70%',
                                            borderRadius: 4,
                                            height: 9,
                                            mb: 2,
                                            mt: 1,
                                            ml: -8,
                                            textAlign: "center",
                                        }}
                                    />
                                </Item>


                            </Stack>
                        </Typography >
                    }
                />

            </JumboListItem >
        </React.Fragment >
    );
};
/* Todo record, view prop define */
export default PlacementStartQuiz;
