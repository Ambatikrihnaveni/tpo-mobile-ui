import { TableCell, TableRow } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import React from "react";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& .MuiTableCell-root': {
        borderBottom: "none",
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    },

    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));
const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    return formattedDate;
};

const DashbordProgramAssignedIteam = ({ item }) => {
    const createdAt = item.date;
    const currentDate = getCurrentDate();
    
    const originalDate = item?.date
    const parts = originalDate.split('-');
    const Date = parts[2] + '-' + parts[1] + '-' + parts[0];

    return (
        <StyledTableRow key={item}>
            <TableCell sx={{ pl: theme => theme.spacing(3,), pl: 3 }} >
                {Date}
            </TableCell>
            <TableCell sx={{ pl: 5 }}>{item.programName}</TableCell>
            <TableCell align="right" sx={{ pr: theme => theme.spacing(3), pl: 3,textTransform:'capitalize'}}>{item.programType}</TableCell>
            <TableCell align="center" sx={{ pr: theme => theme.spacing(3), pl: 3 }}>{item.studentData}</TableCell>
        </StyledTableRow>

    );
};
/* Todo item prop define */
export default DashbordProgramAssignedIteam;
