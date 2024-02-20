import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import EnhancedTableHead from './tutor';
import Button from '@mui/material/Button';
import JumboSearch from './tutorSearch';
import Tutorfilter from './Tutorfilter';
import StudentForm from './tutorForm';
import {useJumboDialog} from "@jumbo/components/JumboDialog/hooks/useJumboDialog";




export default function TutorsList() {

  const {showDialog, hideDialog} = useJumboDialog();

  const handleContactAdd = React.useCallback(() => {
    hideDialog();
}, [hideDialog]);
  const showAddContactDialog = React.useCallback(() => {
    showDialog({
        title: "Add new Tutors",
        content: <StudentForm onSave={handleContactAdd} />
    });
}, [handleContactAdd, showDialog]);


  return (
    <Card >
     <Grid >
      <Grid container sx={{mt:2,ml:2}}>
     <Grid item xs={4} sm={4} lg={2} >
              
            <Typography variant='h4'>Tutors</Typography>
            </Grid>
            <Grid item xs={8} md={4} sm={4}  lg={8} >
       <JumboSearch />
       </Grid> 
       <Grid item xs={12} md={4} sm={4}  lg={2} >
    
    
    <Button  
    disableElevation
    variant={"contained"}
    sx={{
        mb: 2,
        '& .MuiSvgIcon-root': {
            fontSize: '1.5rem'
        }
    }}
    onClick={showAddContactDialog}>Add New</Button>

 

   
          </Grid>
       </Grid>

           
            </Grid>
       <Grid>
          <Tutorfilter/>
       </Grid>
 <Grid sx={{p:1}}>
        <EnhancedTableHead/>
      
        </Grid>
      
    </Card>

  )
}
