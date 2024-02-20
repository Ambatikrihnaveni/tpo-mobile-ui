import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    LinearProgress,
} from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import SubmissionQuiz from "../../../list-views/listViewPage/components/RecordsList/submissionQuiz";

const Quizz = ({ calendarEvent }) => {
    const navigate = useNavigate();
    const lessonId = calendarEvent?.id;
    const { showDialog, hideDialog } = useJumboDialog();

    const StartQuiz = () => {
        navigate(`/calender/${lessonId}/quiz`);
    };

    const ViewQuiz = React.useCallback(() => {
        showDialog({
            fullScreen: true,
            content: <SubmissionQuiz calendarEvent={calendarEvent} onClose={hideDialog} lessonId={lessonId} />
        });
    }, [showDialog, calendarEvent]);

    const progressValue = (calendarEvent?.quizScore / calendarEvent?.totalQuizMarks) * 100 || 0;

    // Check if there is quiz data available
    if (!calendarEvent || !calendarEvent.quizzes || calendarEvent.quizzes.length === 0) {
        return (
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                No quiz data available
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell sx={{ ml: 2 }}><b>Quizzes</b></TableCell>
                        <TableCell sx={{ ml: 2 }}><b>Quiz Score</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{calendarEvent?.date}</TableCell>
                        <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                                <Stack>
                                    <Typography>{calendarEvent?.quizStatus === "Start Quiz" ? (
                                        <Chip label={"Start Quiz"} onClick={StartQuiz} style={{ backgroundColor: "#19c46e", color: "white", width: "100px" }} />)
                                        :
                                        (
                                            <Chip
                                                label={"View"}
                                                onClick={ViewQuiz}
                                                style={{ backgroundColor: '#4285f4', color: "white", width: "127px" }}
                                            />
                                        )}</Typography>
                                </Stack>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography sx={{ width: "100%" }}>
                                <Typography

                                    sx={{ color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px", ml: "25%" }}
                                    noWrap
                                >
                                    {calendarEvent?.quizScore} Out Of {calendarEvent?.totalQuizMarks}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={progressValue}
                                    sx={{
                                        width: '70%',
                                        borderRadius: 4,
                                        height: 9,
                                        mb: 2,
                                        mt: 1,
                                        textAlign: "center",
                                    }}
                                />
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Quizz;
