import {TableCell, TableRow} from "@mui/material";
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

const DashbordMAProgramsItem = ({item}) => {
    const createdAt = item.date;
  const currentDate = getCurrentDate();
    

    return (
        <StyledTableRow key={item}>
            <TableCell sx={{pl: theme => theme.spacing(3,),pl: 3}} >
            {item?.name}
            </TableCell>
            <TableCell sx={{pl: 5}}>{item?.account?.name}</TableCell>
            <TableCell align="center" sx={{pr: theme => theme.spacing(3),pl: 3,color: item?.isApproved ? "#04851e" : "#bf890b" }} >{item?.status}</TableCell>
        </StyledTableRow>

    );
};
/* Todo item prop define */
export default DashbordMAProgramsItem;
