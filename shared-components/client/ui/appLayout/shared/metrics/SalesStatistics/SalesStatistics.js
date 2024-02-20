import React from 'react';
import { Card, Grid, Typography } from "@mui/material";
import LineChartSales from "./LineChartSales";
import renderSalesData from "./renderSalesData";
import JumboContent from "@jumbo/components/JumboContent";
import Div from "@jumbo/shared/Div";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const SalesStatistics = ({ receivedPayments, upcomingPayments }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const totalPayments = receivedPayments?.length + upcomingPayments.length
    let totalUpcomingPayments = 0
    let totalReceivedPayments = 0
        if (upcomingPayments) {
            upcomingPayments.forEach(item => {
                const amount = parseFloat(item.price);

                if (!isNaN(amount)) {
                    totalUpcomingPayments += amount;
                }
            });
        }
        if (receivedPayments) {
            receivedPayments.forEach(item => {
                const amount = parseFloat(item.price);

                if (!isNaN(amount)) {
                    totalReceivedPayments += amount;
                }
            });
        }



    return (
        <Card>
            <JumboContent
                title={
                    <Typography
                        variant={"h5"}
                        color={"common.white"}
                        fontSize={"20px"}
                        fontWeight={"bold"}
                    >{t('Payment History')}</Typography>
                }
                bgColor={theme => theme.palette.primary.main}
                sx={{ color: 'common.white' }}
            >
                {
                    renderSalesData(totalPayments, totalUpcomingPayments, totalReceivedPayments)
                }
            </JumboContent>
            <JumboContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Div sx={{
                            p: theme => theme.spacing(3, 2, 3, 0)
                        }}>
                            <LineChartSales receivedPayments={receivedPayments} upcomingPayments={upcomingPayments}/>
                        </Div>
                    </Grid>

                </Grid>
            </JumboContent>
        </Card>
    );
};

export default SalesStatistics;
