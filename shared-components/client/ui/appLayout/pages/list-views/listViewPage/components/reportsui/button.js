import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelects() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width:150}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Batch</InputLabel>
        <Select sx={{height:40,pl:2}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Batch 1</MenuItem>
          <MenuItem value={20}>Batch 2</MenuItem>
          <MenuItem value={30}>Batch 3</MenuItem>
          <MenuItem value={40}>Batch 4</MenuItem>
          <MenuItem value={50}>Batch 5</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}