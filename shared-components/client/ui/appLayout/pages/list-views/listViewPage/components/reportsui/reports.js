import React from 'react'
import SearchAppBar from './search'
import { Card, Divider, Grid, Typography } from '@mui/material';
import Div from "@jumbo/shared/Div";
import BasicSelect from './new'
import BasicSelects from './button'
import MaterialUIPickers from './add'
import BasicTable from './points'
export default function Reports() {
  return (
    <Div>
<Card >
<Card>
<Typography variant="h4" sx={{pl:6,pt:2,color:"#1999dd"}}>Reports</Typography>
</Card>
     <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 1, md: 3}} style={{margin:'5px'}}>
     <Grid item xs={6} md={3} >
       <Div sx={{width:"250px",borderStyle:'solid ',pl:2,borderColor:'#f0f2f5',borderRadius:'40px'}}>
<SearchAppBar/></Div></Grid>
<Grid item xs={4} md={2} >
  <MaterialUIPickers/>
</Grid>
<Grid item xs={3} md={2}>
<BasicSelect/>
</Grid>
<Grid item xs={3} md={4} >
<BasicSelects/>
</Grid>
</Grid>
<Divider/>
<BasicTable/>
      </Card>
       </Div>
  )
}