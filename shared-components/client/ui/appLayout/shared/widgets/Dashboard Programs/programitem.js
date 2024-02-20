import React from 'react';
import { Avatar, ListItemAvatar, ListItemText, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import ProductSaleItem from '../WeeklySales/ProductSaleItem';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Chip from '@reactioncommerce/catalyst/Chip';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const CampaignItem = ({ programs }) => {
    return (
        <>
            <JumboScrollbar
                autoHeight={true}
                autoHideTimeout={4000}
                autoHeightMin={390}
                autoHide={true}
                hideTracksWhenNotNeeded
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ pl: 3,fontWeight:'bold'}}>Date</StyledTableCell>
                            <StyledTableCell sx={{fontWeight:'bold'}}>Program</StyledTableCell>
                            <StyledTableCell sx={{fontWeight:'bold'}}>Type</StyledTableCell>
                            <StyledTableCell sx={{ pr: 5,fontWeight:'bold' }} align={"right"}>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            programs?.map((product, index) => (
                                <StyledTableRow key={product._id}>
                                    <TableCell>
                                        {product.createdAt.split('T')[0]}
                                    </TableCell>
                                    <TableCell >{product.name}</TableCell>
                                    <TableCell style={{textTransform:'capitalize'}}>
                                        {product.type}
                                    </TableCell>
                                    <TableCell align="right" sx={{ pr: theme => theme.spacing(3) }}>{product.isApproved ? <Chip label={"Approved"} size={"small"}  style={{ backgroundColor: "#04851e", color: "white" }}  /> : <Chip label={"Pending"} size={"small"} style={{ backgroundColor: "#bf890b", color: "white" }} />}</TableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </JumboScrollbar>
        </>
    );
};
export default CampaignItem;
