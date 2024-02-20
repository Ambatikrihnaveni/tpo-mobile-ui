import React from "react";
import { Grid } from "@mui/material";
import { Card, Divider } from "@mui/material";
import Comments from "../../../../../calendarEvents/studentcalendarEvent/comments/comments";
import WebinarData from "./webinarData";

export default function AcceptedData() {
    return (
        <Card sx={{minHeight:"600px"}}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={8.5}>
                    <WebinarData />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3.4}>
                    <Comments />
                </Grid>
            </Grid>
        </Card>
    );
}
