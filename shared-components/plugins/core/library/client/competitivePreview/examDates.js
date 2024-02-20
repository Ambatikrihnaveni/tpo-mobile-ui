import React from "react";
import {Card, Typography,} from "@mui/material";
import Div from '@jumbo/shared/Div'
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import moment from 'moment';


export default function ExamDates(record) {
     
     const ExamDate = record?.record?.examDate
     const StartTime = record?.record?.examStartTime
     const EndTime = record?.record?.examEndTime
    return (
        <Div className="container">
            <Div>
                <Grid container spacing={2}  >
                    <Card  sx={{ width: '500px', margin: '10px', marginTop: '50px', border: '2px solid #2e475D',ml:"25%" }}>
                        <Divider />
                        <Grid container sx={{ mt: 2, mb: 2 }}>
                            <Grid item xs={6}>
                                <Typography>START DATE</Typography>
                                <Typography variant="h4"> <b> {moment(ExamDate).format("MMMM DD, YYYY")}</b></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>TIMINGS</Typography>
                                <Typography variant="h4"><b>{StartTime } &nbsp; To &nbsp; {EndTime} </b></Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container sx={{ mt: 2, mb: 2 }}>
                            <Grid item xs={6}>
                                <Typography> </Typography>
                                <Typography variant="h4"><b></b></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography> </Typography>
                                <Typography variant="h4"><b></b></Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container sx={{ backgroundColor: '#2e475D' }}>
                            <Typography variant="h4" sx={{ color: 'white', mt: 2, mb: 2, ml: 10, fontSize: '20px', }}><b></b></Typography>
                        </Grid>
                    </Card>
                </Grid>
            </Div>
        </Div>
    );
};
