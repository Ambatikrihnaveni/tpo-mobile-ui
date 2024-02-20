import React, {useState} from 'react';
import ChartSalesOverview from "./ChartSalesOverview";
import Typography from "@mui/material/Typography";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";

const SalesOverview = ({ receivedPayments, upcomingPayments }) => {
    const {t} = useTranslation();
    const [chartData, setChartData] = useState([]);

    const calculateMonthlyRevenue = (receivedPayments, upcomingPayments) => {
        // Calculate monthly revenue for every month (January to December) in any year
        const monthlyRevenue = [];
        
        for (let month = 1; month <= 12; month++) {
            const monthKey = month.toString().padStart(2, '0'); // Format as "01", "02", etc.
    
            // Initialize an object to hold monthly revenue totals
            const monthlyTotals = {};
    
            // Loop through received payments
            receivedPayments.forEach(payment => {
                const paymentMonth = payment.date.substring(5, 7); // Extract the month from the date
                const revenue = parseFloat(payment.price);
    
                // Check if the payment is for the current month
                if (paymentMonth === monthKey) {
                    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + revenue;
                }
            });
    
            // Loop through upcoming payments
            upcomingPayments.forEach(payment => {
                const paymentMonth = payment.date.substring(5, 7); // Extract the month from the date
                const revenue = parseFloat(payment.price);
    
                // Check if the payment is for the current month
                if (paymentMonth === monthKey) {
                    monthlyTotals[monthKey] = (monthlyTotals[monthKey] || 0) + revenue;
                }
            });
    
            const max = monthlyTotals[monthKey] || 0;
            const min = monthlyTotals[monthKey] || 0;
    
            monthlyRevenue.push({ hKey: monthKey, Max: max, Min: min });
        }
    
        return monthlyRevenue;
    };
    
    const calculateYearlyRevenue = (receivedPayments, upcomingPayments) => {
        // Get the current year
        const currentYear = new Date().getFullYear();
    
        // Calculate yearly revenue from the last 10 years to the current year
        const yearlyRevenue = [];
    
        for (let year = currentYear - 10; year <= currentYear; year++) {
            const yearKey = year.toString();
    
            // Initialize an object to hold yearly revenue totals
            const yearlyTotals = {};
    
            // Loop through received payments
            receivedPayments.forEach(payment => {
                const paymentYear = payment.date.substring(0, 4); // Extract the year from the date
                const revenue = parseFloat(payment.price);
    
                // Check if the payment is for the current year
                if (paymentYear === yearKey) {
                    yearlyTotals[yearKey] = (yearlyTotals[yearKey] || 0) + revenue;
                }
            });
    
            // Loop through upcoming payments
            upcomingPayments.forEach(payment => {
                const paymentYear = payment.date.substring(0, 4); // Extract the year from the date
                const revenue = parseFloat(payment.price);
    
                // Check if the payment is for the current year
                if (paymentYear === yearKey) {
                    yearlyTotals[yearKey] = (yearlyTotals[yearKey] || 0) + revenue;
                }
            });
    
            const max = yearlyTotals[yearKey] || 0;
            const min = yearlyTotals[yearKey] || 0;
    
            yearlyRevenue.push({ hKey: yearKey, Max: max, Min: min });
        }
    
        return yearlyRevenue;
    };
    
    React.useEffect(() => {
        // Set the chartData to display monthly revenue initially
        setChartData(calculateMonthlyRevenue(receivedPayments, upcomingPayments));
    }, [receivedPayments, upcomingPayments]);

    const switchToMonthlyRevenue = () => {
        setChartData(calculateMonthlyRevenue(receivedPayments, upcomingPayments));
    };

    const switchToYearlyRevenue = () => {
        setChartData(calculateYearlyRevenue(receivedPayments, upcomingPayments));
    };
    return (
        <JumboCardQuick
            noWrapper
            title={<Typography variant={"h4"} style={{fontWeight:'bold'}}>{t('Revenue')}</Typography>}
            action={
                <Stack direction={"row"} spacing={1}>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        onClick={switchToMonthlyRevenue}
                    >
                        Monthly
                    </Button>
                    <Button
                        size={"small"}
                        variant={"contained"}
                        onClick={switchToYearlyRevenue}
                    >
                        Yearly
                    </Button>
                </Stack>
            }
        >
            <ChartSalesOverview data={chartData}/>
        </JumboCardQuick>
    );
};

export default SalesOverview;
