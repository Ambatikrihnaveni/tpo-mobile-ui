import { Card, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import TableContainer from './finance'; 
import SearchAppBar from './search';
import Div from "@jumbo/shared/Div";
export default function Finacetable() {
  return (
    <div>
      <Card>
        
        <Div sx={{flexGrow:1}}>
        <Grid container spacing={3}>
          <Grid item xs={8} md={6} pl={2}>
           <Typography variant="h2" sx={{pl:4 ,pt:2}}>
             Payments </Typography>
        </Grid>
        <Grid item xs={6} md={2} pl={2}>
        <Div sx={{mt:'20px',borderStyle:'solid ',borderColor:'#f0f2f5',borderRadius:'40px'}}>
      <SearchAppBar/></Div>
          </Grid>
        </Grid>
        </Div>
       <TableContainer/>
      </Card>
    </div>
  )
}
