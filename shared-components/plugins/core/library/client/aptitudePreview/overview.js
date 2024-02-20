import { Grid, Typography } from "@mui/material";
import React from "react";
export default function AptitudeOverview({record}){
    return(
        <Grid>
            <Typography style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '400', color: '#484848',textAlign:"justify"}}>
            <div dangerouslySetInnerHTML={{ __html: record?.description }} /> 
            </Typography>
        </Grid>
    )
};
