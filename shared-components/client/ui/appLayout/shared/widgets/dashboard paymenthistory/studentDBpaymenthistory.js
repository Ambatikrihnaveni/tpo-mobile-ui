
import React from 'react';
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import styled from "@emotion/styled";
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import { useQuery } from "@apollo/react-hooks";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useTranslation } from "react-i18next";
import DashboardPaymentHistoryItem from './paymenthistoryitem';
import useAuth from '../../../../hooks/useAuth';
import paymentRecords from '../../../../graphql/services/payment-services/queries/paymentRecords';
import { Link } from 'react-router-dom';
import { MenuItem, Menu, IconButton } from '@mui/material';
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { PaymentServices } from '../../../../graphql/services/payment-services/paymentServices';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "none",
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const StudentDbPaymentHistory = () => {

    const { t } = useTranslation();
    const { viewer } = useAuth()
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredPaymentHistory, setFilteredPaymentHistory] = useState([]);
    const accountId = viewer?._id
    const role = viewer?.role
    const [data, setData] = useState([])
    const [isFilterSelected, setIsFilterSelected] = useState(false)
    const { data: paymentHistory } = useQuery(paymentRecords, {
        variables: {
            accountId: viewer?._id,
            role: viewer?.role
        },
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = (filter) => {
        setIsFilterSelected(true)
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
            setData(data?.paymentHistory)
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
            const data = await PaymentServices.paymentHistory(accountId, newStartDate?.toString(), newEndDate?.toString(), role)
            setData(data?.paymentHistory)

        } catch (err) {
        }
    };
    return (
        <JumboCardQuick
            title={t(<b>Payment History </b>)}
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
                autoHeightMin={490}
                autoHide={true}
                hideTracksWhenNotNeeded
            >
                {selectedFilter === "Range" && (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleDateRangeChange}
                        />
                    </LocalizationProvider>
                )}

                <Divider />

                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell sx={{ pl: 3 }}><b>Date</b></StyledTableCell>
                            <StyledTableCell  ><b>Program</b></StyledTableCell>
                            <StyledTableCell sx={{ pr: 3 }}><b>Training partner</b></StyledTableCell>
                            <StyledTableCell ><b>{(viewer?.role === "Student") ? "Amount" : "Groups"}</b></StyledTableCell>
                            {(viewer?.role === "College-Admin") &&
                                <>
                                    <StyledTableCell  ><b>Students</b></StyledTableCell>
                                    <StyledTableCell  ><b>Amount</b></StyledTableCell>
                                </>
                            }

                        </TableRow>
                    </TableHead>
                    {isFilterSelected ? (
                        data && data.length > 0 ? (
                            data?.map((item, index) => (
                                <DashboardPaymentHistoryItem item={item} viewer={viewer} key={index} />
                            ))
                        ) : (
                            <p style={{ textAlign: "center", marginTop: "200px" }}>No Data Available</p>
                            )
                    ) : (
                        paymentHistory && paymentHistory.ordersByAccountId && paymentHistory.ordersByAccountId.length > 0 ? (
                            paymentHistory.ordersByAccountId?.map((payment, index) => (
                                <DashboardPaymentHistoryItem item={payment} viewer={viewer} key={index} />
                            ))
                        ) : (
                            <p style={{alignContent:'center', fontWeight:'bold'}}>No payment history available</p>
                        )
                    )}
                </Table>
            </JumboScrollbar>
            <Divider />
            <Link to={"/payments"}>
                <Button sx={{ textTransform: "none", fontSize: 17, color: '#f27474' }}> More</Button>
            </Link>
        </JumboCardQuick>
    );
};
/* Todo scrollHeight prop define */
export default StudentDbPaymentHistory;
