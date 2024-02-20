import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Menu, MenuItem } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from "@emotion/styled";
import Divider from "@mui/material/Divider";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useTranslation } from "react-i18next";
import DashbordProgramAssignedIteam from './dashbordProgramAssignedIteam';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useAuth from '../../../../hooks/useAuth';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { PaymentServices } from '../../../../graphql/services/payment-services/paymentServices';
import { useState } from 'react';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
}));

const DashboardTPProgramAssigned = () => {

    const { viewer } = useAuth()
    const { t } = useTranslation();
    const role = viewer?.role;
    const accountId = viewer?._id
    const [assignProgramsData, setAssignProgramsData] = React.useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    React.useEffect(async () => {
        const data = await MyDashboardService.getProgramAssigned(accountId, role);
        if (data) {
            setAssignProgramsData(data)
        }

    }, [accountId])
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
            const data = await PaymentServices.paymentHistory(accountId, newStartDate?.toString(), newEndDate?.toString(), role)
            if (data) {
                setAssignProgramsData(data)
            }
        } catch (err) {
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

            const data = await PaymentServices.paymentHistory(accountId, startDate?.toString(), endDate?.toString(), role)
            if (data) {
                setAssignProgramsData(data)
            }
        } catch (err) {
        }

    };
    return (
        <JumboCardQuick
            title={<b>Program Assigned</b>}
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
            }
            noWrapper
        >
            <JumboScrollbar
                autoHeight={true}
                autoHideTimeout={4000}
                autoHeightMin={510}
                autoHide={true}
                hideTracksWhenNotNeeded
            >

                <Divider />
                {selectedFilter === "Range" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateRangeChange}
                        />
                    </LocalizationProvider>
                )}
                {assignProgramsData.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "200px" }}>No Data Available</p>
                ) : (

                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ pl: 3 }}><b>Date</b></StyledTableCell>
                                <StyledTableCell sx={{ pl: 5 }} ><b>Program</b></StyledTableCell>
                                <StyledTableCell sx={{ pl: 5.3 }} ><b>Type</b></StyledTableCell>
                                <StyledTableCell sx={{ pl: 3 }} align={"right"}><b>Students</b></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                assignProgramsData?.map((product, index) => (
                                    <DashbordProgramAssignedIteam item={product} key={index} />
                                ))
                            }
                        </TableBody>
                    </Table>
                )}
            </JumboScrollbar>
        </JumboCardQuick>
    );
};
/* Todo scrollHeight prop define */
export default DashboardTPProgramAssigned;
