import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, InputAdornment, Button,Grid } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Course({courseList,handleAddClick, addCourse,handleDeleteCourse}) {

  return (
    <div>
      <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', paddingLeft:'50px' }}>Provide us with the details of the courses you offer.</h2>
    
      {courseList?.map((x, index) => (
        <div key={index}>
      
          <Grid container>
          <Grid xs={1}> </Grid>
            <Grid xs={9} >
        <TextField
          key={index}
          fullWidth
          size="small"
          style={{marginTop:'15px'}}
          variant="outlined"
          label='Course'
          value={x?.course}
          onChange={e => addCourse(e, index)}
        />
        </Grid>
        
        <Grid item xs={1}>
      {courseList.length > 1 && (
          <DeleteOutlineOutlinedIcon style={{ color: '#f24b64',  fontSize: '25px',float:'right',marginTop:'18px',marginRight:'50px' }} onClick={() => handleDeleteCourse(index)} />
      )}
          </Grid>
         </Grid>
       </div>
      ))}
      <Button variant="text" style={{marginLeft:'120px'}} onClick={handleAddClick}>+ Add Course</Button> 
    </div>
  );
}

export default Course;
