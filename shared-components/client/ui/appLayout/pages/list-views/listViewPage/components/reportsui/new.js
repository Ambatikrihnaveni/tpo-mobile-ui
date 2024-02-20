import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function BasicSelect() {
  const [age, setAge] = React.useState('');
const handleChange = (event) => {
    setAge(event.target.value);
  };
return (
    <Box sx={{ width:150}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select sx={{height:40,pl:2}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Interships</MenuItem>
          <MenuItem value={20}>Courses</MenuItem>
          <MenuItem value={30}>Projects</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}