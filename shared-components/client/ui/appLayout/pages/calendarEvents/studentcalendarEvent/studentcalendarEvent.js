import React from "react";
import { Grid } from "@mui/material";
import { Card, Divider } from "@mui/material";
import Lesson from "./lesson";
import Comments from "./comments/comments";

export default function StudentcalendarEvent() {
    return (
        <Card sx={{minHeight:"600px"}}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={8.5}>
                    <Lesson />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={3.4}>
                    <Comments />
                </Grid>
            </Grid>
        </Card>
    );
}
