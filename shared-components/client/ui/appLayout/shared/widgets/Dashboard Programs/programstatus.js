import React, { } from 'react';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import LatestPosts from "../LatestPosts";
import FilterListIcon from '@mui/icons-material/FilterList';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import Button from '@reactioncommerce/catalyst/Button';
import { Link } from 'react-router-dom';
import Divider from "@mui/material/Divider";
import CampaignsList from './programlist';
import { MenuItem, Menu, IconButton } from '@mui/material';
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


const MarketingCampaign = ({ scrollHeight }) => {
    const { t } = useTranslation();
    const { shopId } = useCurrentShopId()
    const [programs, setPrograms] = React.useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("Today");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    React.useEffect(() => {
        const fetchAllPrograms = async () => {
            try {
                const data = await MyDashboardService.programs(shopId);
                setPrograms(data);
            } catch (error) {
                // Handle error
            }
        };

        fetchAllPrograms();
    }, [shopId]);

    // Fetch filtered programs when the filter changes
    React.useEffect(() => {
        const fetchFilteredPrograms = async () => {
            try {
                const data = await MyDashboardService.programs(shopId);

                // Filter programs based on the selected date range
                const filteredPrograms = data.filter(program => {
                    const createdAtDate = new Date(program.createdAt);
                    return (
                        (!startDate || createdAtDate >= startDate) &&
                        (!endDate || createdAtDate <= endDate)
                    );
                });

                setPrograms(filteredPrograms);
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
            const fetchData = async () => {
                try {
                    const data = await MyDashboardService.programs(shopId);

                    // Filter programs based on the selected date range
                    const filteredPrograms = data.filter(program => {
                        const createdAtDate = new Date(program.createdAt);
                        return (
                            (!startDate || createdAtDate >= startDate) &&
                            (!endDate || createdAtDate <= endDate)
                        );
                    });

                    setPrograms(filteredPrograms);
                } catch (error) {
                    // Handle error
                }
            };

            fetchData();
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
            const fetchData = async () => {
                try {
                    const data = await MyDashboardService.programs(shopId);

                    // Filter programs based on the selected date range
                    const filteredPrograms = data.filter(program => {
                        const createdAtDate = new Date(program.createdAt);
                        return (
                            (!startDate || createdAtDate >= startDate) &&
                            (!endDate || createdAtDate <= endDate)
                        );
                    });

                    setPrograms(filteredPrograms);
                } catch (error) {
                    // Handle error
                }
            };

            fetchData();
        } catch (err) {
        }

    };
    return (
        <JumboCardQuick
            title={
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{t('Program Status')}</span>
            }
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
                autoHeight
                autoHide
                autoHideDuration={200}
                autoHideTimeout={500}
                autoHeightMin={410}
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
                {programs.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "200px" }}>No Data Available</p>
                    ) : (
                    <CampaignsList programs={programs} />
                )}

            </JumboScrollbar>
            <Divider />
            <Link to={"/myprograms"}>
                <Button style={{ color: '#f27474', fontSize: '14px' }}> More</Button>
            </Link>
        </JumboCardQuick>
    );
};
/* Todo scrollHeight prop define :- */
LatestPosts.propTypes = {
    scrollHeight: PropTypes.number
};
export default MarketingCampaign;
