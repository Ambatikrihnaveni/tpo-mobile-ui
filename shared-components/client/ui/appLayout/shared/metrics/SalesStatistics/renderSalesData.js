import {Stack, Typography} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import React from "react";
import {styled} from "@mui/material/styles";

const Item = styled("div")(({theme}) => ({
    color: theme.palette.common.white,
    marginBottom: 16,
    width: '33%',
    [theme.breakpoints.down('lg')]: {
        width: '16.5%',
    },
    [theme.breakpoints.down('md')]: {
        width: '33.3%',
    },
    [theme.breakpoints.down('sm')]: {
        width: '50%',
    },
    padding: theme.spacing(0, 2)
}));

const renderSalesData = (totalPayments, totalUpcomingPayments,totalReceivedPayments) => {
    const salesData = [
        {
            "name": "No.of Payments",
            "amount": totalPayments
        },
        {
            "name": "Total Upcoming Amount",
            "amount":`₹${totalUpcomingPayments}`
        },
        {
            "name": "Total Received Amount",
            "amount": `₹${totalReceivedPayments}`
          }
          
    ]
    return (
        <Stack
            direction={"row"}
            flexWrap={"wrap"}
            sx={{p: theme => theme.spacing(0, 1, 2),minHeight:150}}
        >
            {
                salesData.map((item, key) => (
                    <Item key={key}>
                        <Typography variant={"body1"} color={"common.white"} mb={1}>
                            <DateRangeIcon fontSize={"small"} sx={{verticalAlign: "middle", mr: 1, mt: -.5}}/>
                            {item.amount}
                        </Typography>
                        <Typography variant={"h6"} color={"common.white"} mb={0}>{item.name}</Typography>
                    </Item>
                ))
            }
        </Stack>
    )
};
export default renderSalesData;
