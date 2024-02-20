import React from 'react';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import { Typography, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';


export default function ProgramType({data, handleChange}) {
  const handleProgramTypeChange = (event) => {
    handleChange(event.target.value);

  };
  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
      <Typography variant='h3' style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textTransform: 'none', fontStyle: 'classic', marginBottom:'20px' }}>Program Type</Typography>
      <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350' ,marginBottom:'16px'}}>Choose the appropriate program type from the following options
</Typography>

      <Div sx={{ mt: 3, mb: 3 }}>
        <FormControl    fullWidth sx={{minWidth:"500px",height: "60px"}}>
          <InputLabel id="demo-simple1-select-label" style={{ marginTop: -1 }}>Program Type</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple1-select-label"
            id="demo-simple1-select"
            name="programType"
            label="Program Type"
            size="small"
            value={data}
        onChange={handleProgramTypeChange}
          >
            <MenuItem value="internships">Internships</MenuItem>
            <MenuItem value="courses">Courses</MenuItem>
            <MenuItem value="projects">Projects</MenuItem>
          </Select>
        </FormControl>
      </Div>
    </Div>
  );
}
