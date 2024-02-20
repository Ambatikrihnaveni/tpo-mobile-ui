import { Grid, Typography } from "@mui/material";
import React from "react";
export default function Overview({data}){
    return(
        <Grid>
            <Typography style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '400', color: '#484848',textAlign:"justify"}}>
            <div dangerouslySetInnerHTML={{ __html: data?.program_content }} /> 
            </Typography>
        </Grid>
    )
}