import { Grid, Typography } from "@mui/material";
import React from "react";
export default function Overview(record){
       
       const Overview =record?.record?.overview
    return(
        <Grid>
            <Typography style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '400', color: '#484848',textAlign:"justify"}}>
              <div dangerouslySetInnerHTML={{ __html: Overview}} /> 
            </Typography>
        </Grid>
    )
}