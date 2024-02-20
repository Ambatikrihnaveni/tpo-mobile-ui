import React, { useState } from 'react';
import { Grid, Typography ,Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function ProfileSkills(skillsData) {
  const {skill,rating,addSkill,addRating}=skillsData
  

  return (
    <div style={{ margin: '10px 70px 70px' }}>
      <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine", Georgia, serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem',marginRight:'150px' }}>What skills would you like to highlight?</h2>

      {skillsData.skillsList.map((skillsList, index) => (
        <Grid container spacing={2} key={index} style={{marginTop:'5px'}}>
          <Grid item xs={5}>
            <TextField
              size='small'
              fullWidth
              id={`skill-input-${index}`}
              placeholder='e.g. Front-end developer'
              label="Skill"
              variant="outlined"
              value={skillsList.skill}
              onChange={e => addSkill(e, index)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size='small'
              fullWidth
              id={`rating-input-${index}`}
              label="Rating"
              placeholder='e.g. 10/10'
              variant="outlined"
              value={skillsList.rating}
              onChange={e => addRating(e, index)}
            />
          </Grid>
          <Grid item xs={1}>
          {skillsData.skillsList.length > 1 && (
          <DeleteOutlineOutlinedIcon style={{color:'#f24b64'}} onClick={() => skillsData.handleDeleteSkills(index)}/>
          )}
          </Grid>
        </Grid>
      ))}
      <Button variant="text" style={{ padding: '10px', cursor: 'pointer' }} onClick={skillsData.handleAddSkills}>+ Add new skill</Button>
    </div>
  );
}

export default ProfileSkills;
