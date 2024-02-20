import React,{useState} from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, MenuItem, IconButton, Menu } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from "@emotion/styled";
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useTranslation } from "react-i18next";
import DashbordTutorIteam from './dashbordTuterClassIteam';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useCurrentShopId from '../../../../hooks/useCurrentShopId'
import useAuth from '../../../../hooks/useAuth';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const DashboardTutorClass = () => {
    const { t } = useTranslation();
    const { shopId } = useCurrentShopId();
    const { viewer } = useAuth();

    const [tutorClass, setTutorClass] = React.useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    React.useEffect(async () => {
        const data = await MyDashboardService.getTutorClass({
            tutorId: viewer?._id,
            shopId
        });
        if (data) {
            setTutorClass(data?.getTutorBatches)
        }

    }, [])

    React.useEffect(() => {
        const fetchFilteredPrograms = async () => {
            try {
                const data = await MyDashboardService.getTutorClass({
                    tutorId: viewer?._id,
                    shopId
                });
                // Filter programs based on the selected date range
                const filteredPrograms = data?.getTutorBatches?.filter(program => {
                    const classStartDate = new Date(program?.startDate);
                    return (
                        (!startDate || classStartDate >= startDate) &&
                        (!endDate || classStartDate <= endDate)
                    );
                });

                setTutorClass(filteredPrograms);
            } catch (error) {
                // Handle error
            }
        };

        // Fetch filtered programs only if a filter is selected
        if (selectedFilter !== "All") {
            fetchFilteredPrograms();
        }
    }, [shopId, startDate, endDate, selectedFilter]);

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
        const currentDate = new Date();
        let newStartDate = null;
        let newEndDate = null;

        switch (filter) {
            case "Today":
                newStartDate = new Date(currentDate.toISOString().split('T')[0]);
                newEndDate = currentDate;
                break;
            case "Yesterday":
                currentDate.setDate(currentDate.getDate() - 1);
                newStartDate = new Date(currentDate.toISOString().split('T')[0]);
                newEndDate = currentDate;
                break;
            case "This Week":
                const currentDay = currentDate.getDay(); // Get the current day of the week (0: Sunday, 6: Saturday)
                const startOfWeek = new Date(currentDate); // Clone the current date
                startOfWeek.setDate(currentDate.getDate() - currentDay); // Set it to the beginning of the week

                newStartDate = new Date(startOfWeek.toISOString().split('T')[0]); // Set to the beginning of the current week (00:00:00)
                newEndDate = currentDate; // Set to the current date and time
                break;

            case "This Month":
                currentDate.setDate(1);
                newStartDate = currentDate;
                newEndDate = new Date();
                break;
            case "This Year":
                currentDate.setMonth(0, 1);
                newStartDate = currentDate;
                newEndDate = new Date();
                break;
            default:
                // Handle custom range or other cases
                break;
        }


        setStartDate(newStartDate);
        setEndDate(newEndDate);
        try {
            const data = await MyDashboardService.getTutorClass({
                tutorId: viewer?._id,
                shopId
            });
            // Filter programs based on the selected date range
            const filteredPrograms = data?.getTutorBatches?.filter(program => {
                const classStartDate = new Date(program?.startDate);
                return (
                    (!startDate || classStartDate >= startDate) &&
                    (!endDate || classStartDate <= endDate)
                );
            });

            setTutorClass(filteredPrograms);
        } catch (error) {
            // Handle error
        }
    };

    const handleDateRangeChange = async (newStartDate, newEndDate) => {
        setStartDate(newStartDate[0]);
        if (newStartDate.length > 1) {
            setEndDate(newStartDate[1]);
        }
        let startDate = newStartDate[0]
        let endDate = newStartDate[1]
        try {
            const data = await MyDashboardService.getTutorClass({
                tutorId: viewer?._id,
                shopId
            });
            // Filter programs based on the selected date range
            const filteredPrograms = data?.getTutorBatches?.filter(program => {
                const classStartDate = new Date(program?.startDate);
                return (
                    (!startDate || classStartDate >= startDate) &&
                    (!endDate || classStartDate <= endDate)
                );
            });

            setTutorClass(filteredPrograms);
        } catch (error) {
            // Handle error
        }
    }
    return (
        <JumboCardQuick
            title={t(<b>Assigned Classes</b>)}
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
                        <MenuItem onClick={() => handleFilterSelect("Today")}>Today</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("Yesterday")}>Yesterday</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("This Week")}>This Week</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("This Month")}>This Month</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("This Year")}>This Year</MenuItem>
                        <MenuItem onClick={() => handleFilterSelect("Range")}>Range</MenuItem>
                    </Menu>
                </div>
            } noWrapper
        >
            <JumboScrollbar
                autoHeight={true}
                autoHideTimeout={4000}
                autoHeightMin={490}
                autoHide={true}
                hideTracksWhenNotNeeded
            >

                <Divider />

                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ pl: 3 }}><b>Batch</b></StyledTableCell>
                            <StyledTableCell sx={{ pl: 5 }} ><b>Start Date</b></StyledTableCell>
                            <StyledTableCell sx={{ pl: 6 }} ><b>Time</b></StyledTableCell>
                            <StyledTableCell sx={{ pl: 3 }} align={"right"}><b>Students</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tutorClass.length === 0 ? (
                            <p style={{ textAlign: "center", marginTop: "200px" }}>No Data Available</p>
                        ) : (
                            tutorClass?.map((product, index) => (
                                <DashbordTutorIteam item={product} key={index} />
                            ))
                        )}

                    </TableBody>
                </Table>
            </JumboScrollbar>
            <Divider />
            <Link to={"/classes"}>
                <Button sx={{ textTransform: "none", fontSize: 17, color: '#f27474' }}> More</Button>
            </Link>
        </JumboCardQuick>
    );
};

export default DashboardTutorClass;
