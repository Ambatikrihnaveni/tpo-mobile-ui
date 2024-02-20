import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


function CollegeAchieve(achieveData) {
  const {achieve,addAchieve}=achieveData

  return (
    <div style={{marginLeft:'50px'}}>
                  <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Add your Achievements</h2>

   
    {achieveData.achieveList.map((achieveList, index) => (
      <Grid container key={index}>
        <Grid item xs={10}>
      <TextField
        
        fullWidth
        style={{marginTop:'15px'}}
        variant="outlined"
        label="Achievement"
        value={achieveList.achieve}
        onChange={e => addAchieve(e, index)}        
        />
        </Grid>
        <Grid item xs={2}>
           {achieveData.achieveList.length > 1 && (
           <DeleteOutlineOutlinedIcon style={{color:'#f24b64',marginTop:'20px',fontSize:'25px',marginLeft:'10px'}} onClick={() => achieveData?.handleDeleteAchieve(index)}/>
           )}
        </Grid>
      </Grid>
        ))}
        <Button variant="text" onClick={achieveData.handleAddAchieve}>+ Add Achievement</Button>
  </div>
  );
}

export default CollegeAchieve;
