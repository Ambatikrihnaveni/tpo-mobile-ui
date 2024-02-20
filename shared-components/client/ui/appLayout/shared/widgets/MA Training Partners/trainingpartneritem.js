import { TableCell, TableRow} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import React from "react";
import Chip from "@mui/material/Chip";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import MyDashboardService from "../../../../graphql/services/dashboard/dashboard-services";

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



const TrainingPartnerItem = ({item}) => {
    let trainingPartners = item ? item : [];
    
    return (
     
      <>

      {
       trainingPartners ?.map((ele)=>(
            <StyledTableRow key={ele}>
            <TableCell sx={{ pl: theme => theme.spacing(3,), pl: 3 }} >
                {ele?.name}
            </TableCell>
             <TableCell >{(ele?.programs) ? ele?.programs.length : 0}</TableCell>
    
        </StyledTableRow>
        )) }

      </>
        
       
    )
};
export default TrainingPartnerItem;

