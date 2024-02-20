import { Grid, Typography } from "@mui/material";
import React from "react";
export default function Eligibility(record){
         
         const Eligibility = record?.record?.eligibility
    return(
        <Grid>
        <Grid>
            <Typography style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '400', color: '#484848',textAlign:"justify"}}>
               <div dangerouslySetInnerHTML={{ __html: Eligibility}} /> 
            </Typography>
        </Grid>
        </Grid>
        
    )
}