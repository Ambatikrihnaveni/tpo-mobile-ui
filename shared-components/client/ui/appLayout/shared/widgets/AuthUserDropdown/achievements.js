import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Grid } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Achieve({achieveList,addAchieve, handleAddAchieve,handleDeleteAchieve}) {
  

  return (
    <div>
      <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', paddingLeft:'50px' }}>What are your achievements?</h2>
     
      {achieveList?.map((x, index) => (
        <div key={index}>
          <Grid container>
            <Grid xs={1}></Grid>
            <Grid xs={9}>
        <TextField
          key={index}
          fullWidth
          size="small"
          style={{marginTop:'15px'}}
          variant="outlined"
          label="Achievement"
          value={x?.achieve}
          onChange={e => addAchieve(e, index)}        
          />
          </Grid>
          <Grid item xs={1}>
      {achieveList.length > 1 && (
          <DeleteOutlineOutlinedIcon style={{ color: '#f24b64',  fontSize: '25px',float:'right',marginTop:'18px',marginRight:'50px' }} onClick={() => handleDeleteAchieve(index)} />
      )}
          </Grid>
          </Grid>
          </div>
          ))}
        
          <Button variant="text" style={{marginLeft:'120px'}} onClick={handleAddAchieve}>+ Add Achievement</Button>
    </div>
  )
}

export default Achieve;
