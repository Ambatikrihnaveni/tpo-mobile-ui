import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Skills({ skillsList, addSkill, handleChange, handleDeleteSkills }) {
  const isRatingDisabled = (index) => !skillsList[index].skill;
  
  return (
    <div style={{ margin: {xs:'5px',sm:'10px 70px 70px'}, }}>
      <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine", Georgia, serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', marginRight: '100px' }}>What skills would you like to highlight?</h2>

      {skillsList?.map((list, i) => (
        <Grid container spacing={2} style={{ marginTop: '5px' }} key={i}>
          <Grid item xs={11} md={6}>
          <TextField
            size='small'
            fullWidth
            placeholder='e.g. Front-end developer'
            label="Skill"
            variant="outlined"
            value={list.skill}
            onChange={(e) => handleChange(e, i, 'skill')}
          />
          </Grid>
          <Grid item xs={10.5} md={5}>
          <TextField
            size='small'
            fullWidth
            label="Rating"
            placeholder='e.g. 10/10'
            variant="outlined"
            value={list.rating}
            onChange={(e) => handleChange(e, i, 'rating')}
            disabled={isRatingDisabled(i)}
          />
          </Grid>
          <Grid item xs={1.5} md={1}>
            {skillsList.length !== 1 && (
              <Button style={{ color: '#f24b64' }} onClick={() => handleDeleteSkills(i)}>
                <DeleteOutlineOutlinedIcon />
              </Button>
            )}
          </Grid>
        </Grid>
      ))}

      <Button variant="text" style={{ margin: '10px', cursor: 'pointer' }} onClick={addSkill}>
        + Add Skill
      </Button>
    </div>
  );
}

export default Skills;
