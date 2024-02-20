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
import DashbordStudentEPIteam from './dashbordStudentEPIteam';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import { MenuItem, Menu, IconButton } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const DashbordEnerolledPrograms = () => {
    const { t } = useTranslation();
    const { viewer } = useAuth()
    const [enrolledPrograms, setEnrolledPrograms] = React.useState([]);
    const { shopId } = useCurrentShopId();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("");
    const [filteredPrograms, setFilteredPrograms] = useState([])
    const getRoleBasedTitle = () => {
        if (viewer?.role === "Student") {
            return t(<b>Enrolled Programs</b>);
        } else if (viewer?.role === "College-Admin") {
            return t(<b>Imported Programs</b>);
        }
    };

    const title = getRoleBasedTitle();

    React.useEffect(() => {
        const fetchData = async () => {
            if (viewer?.role === "Student") {
                const data = await MyDashboardService.getStudentClasses();
                if (data) {
                    setEnrolledPrograms(data);
                }
            } else if (viewer?.role === "College-Admin") {
                const data = await MyDashboardService.getPrograms(shopId);
                if (data) {
                    setEnrolledPrograms(data);
                }
            }
        };

        fetchData();
    }, [viewer]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = (filter) => {
        setSelectedFilter(filter);
        handleClose();
        statusFilter(filter)
    };

    const statusFilter = async (filter) => {
        let newFilteredPrograms = []; // Create a new array to store the filtered programs

        if (viewer?.role === "Student") {
            if (filter === "Completed" || filter === "In Progress" || filter === "All") {
                const data = await MyDashboardService.getStudentClasses();

                if (filter === "All") {
                    setFilteredPrograms(data);
                } else {
                    for (let j = 0; j < data?.length; j++) {
                        if (
                            (filter === "Completed" && isProgramCompleted(data[j])) ||
                            (filter === "In Progress" && isProgramInProgress(data[j]))
                        ) {
                            newFilteredPrograms.push(data[j]);
                        }
                    }

                    setFilteredPrograms(newFilteredPrograms); // Set the filtered programs
                }
            }
        } else if (viewer?.role === "College-Admin" && (filter === "Assigned" || filter === "Not-Assigned" || filter === "All")) {
            const data = await MyDashboardService.getPrograms(shopId);

            if (filter === "All") {
                setFilteredPrograms(data);
            } else {
                const filteredPrograms = filter === "Assigned"
                    ? data?.filter(program => program?.isBatchExistInCollege === "Assigned")
                    : data?.filter(program => program?.isBatchExistInCollege === "Not-Assigned");

                setFilteredPrograms(filteredPrograms);
            }
        }
    };

    const isProgramCompleted = (program) => {
        return program?.lessonsDuration?.every((lesson) => lesson.lessonStatus === "Complete");
    };
    const isProgramInProgress = (program) => {
        return program?.lessonsDuration?.some((lesson) => lesson.lessonStatus !== "Complete");
    };




    return (
        <JumboCardQuick
            title={title}
            action={<div>
                <IconButton onClick={handleClick}>
                    <FilterListIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {viewer?.role === "Student" && (
                        <>
                            <MenuItem onClick={() => handleFilterSelect("Completed")}>Completed</MenuItem>
                            <MenuItem onClick={() => handleFilterSelect("In Progress")}>In Progress</MenuItem>
                        </>
                    )}
                    {viewer?.role === "College-Admin" && (
                        <>
                            <MenuItem onClick={() => handleFilterSelect("Assigned")}>Assigned</MenuItem>
                            <MenuItem onClick={() => handleFilterSelect("Not-Assigned")}>Not Assigned</MenuItem>
                        </>
                    )}
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
                        {
                            viewer?.role === "Student" ? (<TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ pl: 3 }}><b>Program</b></StyledTableCell>
                                    <StyledTableCell><b>Lessons</b></StyledTableCell>
                                    <StyledTableCell sx={{ pl: 3 }} align={"right"}><b>Status</b></StyledTableCell>
                                </TableRow>
                            </TableHead>) : (<TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ pl: 3 }}><b>Program</b></StyledTableCell>
                                    <StyledTableCell sx={{ pl: 3 }} align={"right"}><b>Status</b></StyledTableCell>
                                </TableRow>
                            </TableHead>)
                        }
                        <TableBody>
                            {!selectedFilter ? (
                                enrolledPrograms?.length === 0 ? (
                                    <TableRow>
                                        <TableCell>No Data</TableCell>
                                    </TableRow>
                                ) : (
                                    enrolledPrograms?.map((program, index) => (
                                        <DashbordStudentEPIteam item={program} key={index} />
                                    ))
                                )
                            ) : (
                                filteredPrograms?.length === 0 ? (
                                    <TableRow>
                                        <TableCell>No Data</TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPrograms?.map((program, index) => (
                                        <DashbordStudentEPIteam item={program} key={index} />
                                    ))
                                )
                            )}
                        </TableBody>


                    </Table>
                )}
            </JumboScrollbar>
            <Divider />
            {
                viewer?.role === "Student" ?
                    (<Link to="/myadmissions">
                        <Button sx={{ textTransform: "none", fontSize: 17, color: '#f27474' }}> More</Button>
                    </Link>) :
                    (<Link to="/myprograms">
                        <Button sx={{ textTransform: "none", fontSize: 17, color: '#f27474' }}> More</Button>
                    </Link>)
            }
        </JumboCardQuick>
    );
};

export default DashbordEnerolledPrograms;
