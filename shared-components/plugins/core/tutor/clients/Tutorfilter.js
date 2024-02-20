import React from 'react'
import { Card, Grid } from '@mui/material';

import EnhancedTableHead from './tutor';
import JumboSearch from './tutorSearch';
import Div from "@jumbo/shared/Div";
import Button from '@mui/material/Button';
import TutorHeader from './tutorHeader';
import TutorCourse from './tutorCourse';
import SelectSmall from './tutorSelect';
import TutorSort from './tuterSortby';
import MaterialUIPickers from './tutorDate';
import Typography from "@mui/material/Typography";
import AddButtons from './tutorForm';
import Stack from '@mui/material/Stack';



export default function Tutorfilter() {
  return (
    <Grid container  spacing={2} sx={{ml:2}}>
    <Grid item xs={4} md={2} lg={1.5} >
     
      <TutorHeader/>
     
           </Grid>
           <Grid item xs={4} md={4}  lg={2}>
           <Button size="small" variant='contained'>Apply</Button>
   
           </Grid>
           <Grid item xs={4} md={6} sm={8}  lg={2}>
     <Div>
      <TutorCourse/>
      </Div>
           </Grid>
           <Grid item xs={4} md={4} sm={4}  lg={2}>
     <Div>
      <TutorSort/>
      </Div>
           </Grid>
           <Grid item xs={4} md={4} sm={4}  lg={2}>
     <Div >
     <MaterialUIPickers />
      </Div>
           </Grid>
       </Grid>
  )
}
