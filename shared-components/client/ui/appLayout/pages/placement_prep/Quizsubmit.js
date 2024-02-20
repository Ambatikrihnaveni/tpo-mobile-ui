import React, { useState } from "react";
import {
    Divider,
    Typography,
    Button,
    Grid,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import StudentsService from "../../../graphql/services/students/students-service";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';

const useStyles = makeStyles((theme) => ({
    redCheckbox: {
        '&$checked': {
            color: 'red',
        },
    },
    greenCheckbox: {
        '&$checked': {
            color: 'green',
        },
    },
    checked: {},
}));
export default function AptitudeQuizSubmit({ onClose, lessonId }) {
    ;
    const [showDetails, setShowDetails] = useState(false);
    const { viewer } = useAuth();
    const navigate = useNavigate();
    const classes = useStyles();
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    }
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = React.useState('')
    const [quizzes, setQuizzes] = React.useState([])
    const [lessonName, setLessonName] = React.useState('')
    const [passedQuizzes, setPassedQuizzes] = React.useState('');
    const [submittedDate, setSubmittedDate] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const studentId = viewer?._id;
                const { data } = await StudentsService.quizDetails(studentId, lessonId);
                setQuizzes(data?.data?.studentQuizData.quiz);
                setLessonName(data?.data?.studentQuizData.lessonName);
                setSubmittedDate(data?.data?.studentQuizData.quiz?.submittedDate);

                let passed = 0;
                for (let i = 0; i < data?.data?.studentQuizData?.quiz?.length; i++) {
                    if (data?.data?.studentQuizData?.quiz[i]?.result === true) {
                        passed++;
                    }
                }

                setPassedQuizzes(passed);

                if (passed >= data?.data?.studentQuizData?.quiz?.length / 2) {
                    setResult("Pass");
                } else {
                    setResult("Fail");
                }
            } catch (error) {
                // Handle errors here
                console.error("Error fetching quiz details:", error);
            }
        };

        fetchData(); // Call the async function

    }, [lessonId]);

    const formatAnswer = (answer) => {
        if (answer.length >= 2) {
            return answer[0].toUpperCase() + answer.slice(1, -1) + ' ' + answer.slice(-1);
        } else {
            return "Answer is too short to format.";
        }
    };


  


    const handleClose = () => {
        onClose()
        navigate(-1)

    };

    
    const getCurrentDate = () => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
        return formattedDate;
    };

    const currentDate = getCurrentDate();
    return (
        <Grid>
            <Grid>
                <AppBar sx={{ position: 'relative', width: "100%" }}>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontSize: '20px' }}>
                            {lessonName}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Grid>
            <Grid sx={{ margin: 7 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>Quizz</Typography>
            </Grid>
            <Grid sx={{ alignItems: "center" }}>
                <Divider sx={{ width: "80%", marginLeft: "100px" }} />
            </Grid>
            <Grid container sx={{ display: "flex", mt: 2, mb: 2 }}>
                <Typography sx={{ ml: 15 }}>Questions:{quizzes?.length}</Typography>
                <Typography sx={{ ml: 20 }}>Quiz Time:0 Minutes</Typography>
                <Typography sx={{ ml: 27 }}>Total Marks:{passedQuizzes}/{quizzes?.length}</Typography>
                <Typography sx={{ ml: 53 }}>Passing Marks:{(quizzes?.length) / 2}</Typography>
            </Grid>
            <Grid sx={{ alignItems: "center" }}>
                <Divider sx={{ width: "80%", marginLeft: "100px" }} />
            </Grid>

            <Box sx={{ width: '80%', ml: 15, mt: 5 }}>
                <Grid container spacing={1} sx={{ ml: -1 }} >
                    <Grid item xs={1}>
                        <h4> Date</h4>
                    </Grid>
                    <Grid item xs={2}>
                        <h4> No.Questions	</h4>
                    </Grid>
                    <Grid item xs={1}>
                        <h4> Total Marks	</h4>
                    </Grid>
                    <Grid item xs={2}>
                        <h4> Correct Answer	</h4>
                    </Grid>

                    <Grid item xs={2}>
                        <h4>Incorrect Answer</h4>
                    </Grid>

                    <Grid item xs={2}>
                        <h4> Earned Marks</h4>
                    </Grid>
                    <Grid item xs={1}>
                        <h4> Result	</h4>
                    </Grid>
                    <Grid item xs={1}>
                        <h4> Details</h4>
                    </Grid>

                </Grid>
                <Grid container spacing={1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, mt: 5, ml: 1 }}
                >
                    <Grid item xs={1}>
                        <Typography>  {submittedDate}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography> {quizzes?.length}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography> {passedQuizzes}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography> {passedQuizzes}</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{quizzes?.length - passedQuizzes}</Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>{passedQuizzes}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography> {result === "Pass" ? (<Chip label="Pass" sx={{ backgroundColor: '#a2f2c8', color: " #079D55" }} />) : (<Chip label="Fail" sx={{ backgroundColor: '#FFB9B9', color: "#FF3131" }} />)}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" onClick={toggleDetails} sx={{ textTransform: "none", }}>Details</Button>
                    </Grid>
                </Grid>
            </Box>

            {showDetails && (

                <Box sx={{ width: '80%', ml: 20, mt: 3 }}>
                    <Grid container spacing={1}
                    >
                        <Grid item xs={2}>
                            <h4> No</h4>
                        </Grid>
                        <Grid item xs={2}>
                            <h4> Type</h4>
                        </Grid>
                        <Grid item xs={2}>
                            <h4> Questions</h4>
                        </Grid>
                        <Grid item xs={2}>
                            <h4> Given Answer</h4>
                        </Grid>

                        <Grid item xs={2}>
                            <h4> Correct Answer</h4>
                        </Grid>

                        <Grid item xs={2}>
                            <h4> Hint</h4>
                        </Grid>

                        {quizzes?.map((quiz, index) => (
                            <Grid container spacing={1}
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, ml: 1, mt: 4 }}
                            >
                                <Grid item xs={2}>
                                    <Typography> {index + 1}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    {quiz?.given_answer === quiz?.quiz_answer ? (
                                        <CheckIcon className={classes.greenCheckbox} sx={{ color: "green" }} />
                                    ) : (
                                        <ClearIcon className={classes.redCheckbox} sx={{ color: "red" }} />
                                    )}
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography> {quiz.quiz_title}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography> {formatAnswer(quiz.given_answer)}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography> {formatAnswer(quiz.quiz_answer)}</Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <Typography> {quiz.quiz_hint}</Typography>
                                </Grid>
                            </Grid>
                        ))}


                    </Grid>
                </Box>
            )}
        </Grid>
    )
}