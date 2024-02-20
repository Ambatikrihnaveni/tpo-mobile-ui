import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const ExamPattern = (record) => {
      
      const ExamsData = record?.record?.examPattern
    return (
        <TableContainer sx={{ width: "70%", margin: "auto", mt: 4 }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell ><b>Subject</b></TableCell>
                        <TableCell ><b>No Of Questions</b></TableCell>
                        <TableCell ><b>Marks</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ExamsData.map((exam, index) => (
                        <TableRow key={index}>
                            <TableCell >{exam.subjectName}</TableCell>
                            <TableCell >{exam.numberOfQuestions}</TableCell>
                            <TableCell >{exam.marksPerSubject}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExamPattern;
