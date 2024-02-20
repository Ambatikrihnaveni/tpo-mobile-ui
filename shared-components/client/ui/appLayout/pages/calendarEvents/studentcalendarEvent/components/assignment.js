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
import SubmissionAssignment from "../../../list-views/listViewPage/components/RecordsList/submissionAssignment";

const Assignment = ({ calendarEvent }) => {
    const navigate = useNavigate();
    const lessonId = calendarEvent?.id;
    const { showDialog, hideDialog } = useJumboDialog();

    const AssignmentQuiz = () => {
        navigate(`/calender/${lessonId}/assignment`);
    };

    const AssignmentView = React.useCallback(() => {
        showDialog({
            fullScreen: true,
            content: <SubmissionAssignment calendarEvent={calendarEvent} onClose={hideDialog} />
        });
    }, [showDialog, calendarEvent]);

    const assignmentProgressValue = (calendarEvent?.assignmentScore / calendarEvent?.totalAssignmentMarks) * 100 || 0;

    // Check if there is assignment data available
    if (!calendarEvent || !calendarEvent.assignments || calendarEvent.assignments.length === 0) {
        return (
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                No assignments data available
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Date</b></TableCell>
                        <TableCell sx={{ ml: 19 }}><b>Assignment</b></TableCell>
                        <TableCell sx={{ ml: 7 }}><b>Assignment Score</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{calendarEvent?.date}</TableCell>
                        <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                                <Stack>
                                    <Typography>{calendarEvent?.assignmentStatus === "Start Assignment" ?
                                        (<Chip label={"Start Assignment"} onClick={AssignmentQuiz} style={{ backgroundColor: "#19c46e", color: "white", width: "140px" }} />)
                                        :
                                        (
                                            <Chip
                                                label={"View"}
                                                onClick={AssignmentView}
                                                style={{ backgroundColor: '#4285f4', color: "white", width: "127px" }}
                                            />
                                        )
                                    }</Typography>
                                </Stack>
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography sx={{ width: "100%" }}>
                                <Typography
                                    sx={{ color: 'rgb(156, 5, 135)', fontWeight: "bold", fontSize: "16px", ml: "25%" }}
                                    noWrap
                                >
                                    {calendarEvent?.assignmentScore} Out Of {calendarEvent?.totalAssignmentMarks}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={assignmentProgressValue}
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

export default Assignment;
