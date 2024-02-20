import React from "react";
import { Grid } from "@mui/material";
import { Card, Divider } from "@mui/material";
import Comments from "../../../../../calendarEvents/studentcalendarEvent/comments/comments";
import EventDetails from "./eventDetails";

export default function EventData() {
    return (
        <Card sx={{minHeight:"600px"}}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={8.5}>
                    <EventDetails />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3.4}>
                    <Comments />
                </Grid>
            </Grid>
        </Card>
    );
}
