import React from 'react'
import TableContainer from './finance'
import SearchAppBar from'./search'
import { Card, Grid, Typography } from '@mui/material';
import Div from "@jumbo/shared/Div";
export default function Finacetable() {
  return (
  <Div>
     <Card >
      <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
      <Grid item xs={6} md={6} >
        <Typography variant="h4" sx={{pl:6,pt:2,color:"#1999dd"}}>Payments</Typography>
        </Grid>
        <Grid item xs={3} md={3}>
        <Div sx={{mt:'20px',borderStyle:'solid ',pl:2,borderColor:'#f0f2f5',borderRadius:'40px'}}>
 <SearchAppBar/></Div></Grid>
        <TableContainer/>
        </Grid>
       </Card>
        </Div>          
  
)
}
