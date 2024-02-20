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

const ModuleItem = ({ tutorModules }) => {
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
                            <StyledTableCell sx={{fontWeight:'bold'}}>Modules</StyledTableCell>
                            <StyledTableCell sx={{fontWeight:'bold',pl:15}}>No.of Students</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (tutorModules) ? tutorModules?.map((product, index) => (
                                <StyledTableRow key={index}>
                                    <TableCell >{product.title}</TableCell> 
                                    <TableCell align={'center'}>
                                        {(product?.students) ? product?.students?.length : 0 }
                                    </TableCell>
                                </StyledTableRow>
                            )): []
                        }
                    </TableBody>
                </Table>
            </JumboScrollbar>
        </>
    );
};
export default ModuleItem;
