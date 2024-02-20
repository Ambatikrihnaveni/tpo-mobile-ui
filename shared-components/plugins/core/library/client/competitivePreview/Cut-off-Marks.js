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

const CutOffMarks = (record) => {
     
    return (
        <TableContainer sx={{ width: "70%", margin: "auto", mt: 4 }} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ marginLeft:"10px" }}><b>Marks</b></TableCell>
                        <TableCell style={{ ml: 3 }}><b>College Name</b></TableCell>
                        <TableCell sx={{ ml: 2 }}><b>Location</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {record?.record?.cutOffMarks?.map((CutOffMarks, index) => (
                        <TableRow key={index}>
                            <TableCell >{CutOffMarks.marks_GPA}</TableCell>
                            <TableCell >{CutOffMarks.collegeName}</TableCell>
                            <TableCell >{CutOffMarks.collegeLocation}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CutOffMarks;
