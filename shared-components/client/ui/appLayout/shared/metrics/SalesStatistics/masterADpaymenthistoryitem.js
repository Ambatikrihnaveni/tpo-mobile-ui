



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

const MasterADpaymentHistoryItem = ({item,viewer}) => {
    const createdAt = item.date;
    const currentDate = getCurrentDate();
    
    const string = item.programName
    const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateProgramName = truncateString(string, 15);
    
    const partner = item.trainingPartner
    const partnerString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateTrainingPartner = partnerString(partner, 18);

    const group = item.groupName
    const groupString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateGroup = groupString(group, 20);

    

    return (
        <StyledTableRow key={item}>
            <TableCell sx={{pl: theme => theme.spacing(3,),}} >
            {createdAt}
            </TableCell>
            <TableCell>{truncateTrainingPartner}</TableCell>
            <TableCell >{truncateProgramName}</TableCell>
            <TableCell > ₹{item.price}</TableCell>
        </StyledTableRow>

    );
};
/* Todo item prop define */
export default MasterADpaymentHistoryItem;
