import React from 'react';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableRow, Divider, Grid } from "@mui/material";
import PropTypes from "prop-types";
import LatestPosts from '../../widgets/LatestPosts';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import Button from '@reactioncommerce/catalyst/Button';
import { Link } from 'react-router-dom';
import styled from "@emotion/styled";

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

const MasterAdOngoingPrograms = ({ scrollHeight }) => {

    const { t } = useTranslation();
    const { shopId } = useCurrentShopId()
    const [batches, setBatches] = React.useState([])


    React.useEffect(async () => {
        const data = await MyDashboardService.getOngoingPrograms()
        setBatches(data)
    }, [])



    return (
        <Grid>
            <JumboCardQuick
                title={t(<b>Ongoing Programs</b>)}
                /* action={
                    <React.Fragment>
                        <FilterListIcon />
                    </React.Fragment>
                } */
                noWrapper
            >
                <JumboScrollbar
                    autoHeight={true}
                    autoHide={true}
                    autoHideDuration={200}
                    autoHideTimeout={400}
                    autoHeightMin={490}
                    //autoHeightMin={scrollHeight ? scrollHeight : 356}
                >
                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ fontWeight: 'bold' }}>Program</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 'bold' }}>College</StyledTableCell>
                                <StyledTableCell sx={{ fontWeight: 'bold', pl: 7 }} align={"center"}>Training Partner</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                batches?.map((batch, index) => (
                                    <StyledTableRow sx={{ pl: theme => theme.spacing(3,), }}>
                                        <TableCell>
                                            {batch?.name}
                                            <br />
                                            <span>{batch?.program?.name}</span>
                                        </TableCell>
                                        <TableCell
                                        >{batch?.admins[0]?.name}
                                        </TableCell>

                                        <TableCell align={"center"} sx={{ pl: 5 }} >
                                            {batch?.institute[0]?.name}
                                        </TableCell>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </JumboScrollbar>
                <Divider />
                <Link to={"/programsList"}>
                    <Button style={{ textTransform: "none", color: '#f27474', fontSize: 17}}> More</Button>
                </Link>
            </JumboCardQuick>
        </Grid>
    );
};
/* Todo scrollHeight prop define :- */
LatestPosts.propTypes = {
    scrollHeight: PropTypes.number
};
export default MasterAdOngoingPrograms;
