import React, { useState } from 'react';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FormControlLabel, ListItemText } from '@mui/material';
const initialField = [
  'Mechanical',
  'Computer Science',
  'IT',
  'Electronics',
  'Communication',
  'Physics',
  'Mathematics',
  'Biology'
];

export default function ProgramField({ data, handleChange }) {
  const [isAddSelected, setIsAddSelected] = useState(false);
const [field, setField] = useState(initialField)
 
  const handleInputChange = (event, newInputValue) => {
    // Add the newInputValue as an option if it's not already in the options list
    if (!field.includes(newInputValue)) {
      setField([...field, newInputValue]);
    }
  };

  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h3' style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textTransform: 'none', fontStyle: 'classic', marginBottom: '20px' }}>Field of study</Typography>
      <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '15px' }}>Select your program's field of study</Typography>
      <Autocomplete
        sx={{ width: '50%' }}
        value={data}
        onChange={handleChange}
        options={field}
        freeSolo
        onInputChange={handleInputChange}
        renderOption={(props, option) => (
          <li {...props}>
            <FormControlLabel
              control={<Checkbox />}
              label={<ListItemText primary={option} />}
            />
          </li>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Select Field of Study or enter your own" variant="outlined" />
        )}
      />
    </Div>
  );
}
