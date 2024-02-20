import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useTranslation } from "react-i18next";
import useAuth from '../../../../hooks/useAuth';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import DashbordMAProgramsItem from './dashbordMAProgramsItem';
import { MenuItem, Menu, IconButton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const DashbordMasterAPrograms = () => {
    const { t } = useTranslation();
    const { viewer } = useAuth()
    const [enrolledPrograms, setEnrolledPrograms] = React.useState([]);
    const { shopId } = useCurrentShopId();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filteredPrograms, setFilteredPrograms] = useState([])
    React.useEffect(async () => {
        const data = await MyDashboardService.getMAPrograms();

        if (data) {
            setEnrolledPrograms(data)
        }

    }, [])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        handleClose();
        // Set start and end dates based on the selected filter
        setStartEndDates(filter);
    };

    const setStartEndDates = async (filter) => {
        const data = await MyDashboardService.getMAPrograms();
    
        if (filter === "All") {
            // If the filter is "All," set all data without any filtering
            setFilteredPrograms(data);
        } else if (filter === "Pending" || filter === "Approved" || filter === "Reject") {
            // If the filter is a specific status, filter the programs accordingly
            const filteredPrograms = data?.filter(program => program.status === filter);
            setFilteredPrograms(filteredPrograms);
        }
    };
    


    return (
        <JumboCardQuick
            title={t(<b>Programs</b>)}
            action={
                <div>
                    <IconButton onClick={handleClick}>
                        <FilterListIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleFilterSelect("Pending")}>Pending</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("Approved")}>Approved</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("Reject")}> Reject</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("All")}> All</MenuItem>

                    </Menu>
                </div>}
            noWrapper
        >
            <JumboScrollbar
                autoHeight={true}
                autoHideTimeout={4000}
                autoHeightMin={490}
                autoHide={true}
                hideTracksWhenNotNeeded
            >
                <Divider />
                {enrolledPrograms.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "200px" }}>No Data Available</p>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ pl: 3 }}><b>Program</b></StyledTableCell>
                                <StyledTableCell><b>Training Partner</b></StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} align={"right"}><b>Status</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!selectedFilter ? (
                                enrolledPrograms?.length === 0 ? (
                                    <TableRow>
                                        <TableCell>No Data</TableCell>
                                    </TableRow>
                                ) : (
                                    enrolledPrograms?.map((Programs, index) => (
                                        <DashbordMAProgramsItem item={Programs} key={index} />
                                    ))
                                )
                            ) : (
                                filteredPrograms?.length === 0 ? (
                                    <TableRow>
                                        <TableCell>No Data</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPrograms?.map((program, index) => (
                                        <DashbordMAProgramsItem item={program} key={index} />
                                    ))
                                )
                            )}
                        </TableBody>
                    </Table>
                )}
            </JumboScrollbar>
            <Divider />
            <Link to="/programsList">
                <Button sx={{ textTransform: "none", fontSize: 17, color: '#f27474' }}> More</Button>
            </Link>
        </JumboCardQuick>
    );
};

export default DashbordMasterAPrograms;
