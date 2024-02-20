
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Div from '../../../../client/ui/@jumbo/shared/Div/Div';
import { Typography } from '@mui/material';

export default function Programbatches({ data, handleChange }) {

  return (
    <Div style={{ minHeight: '50vh' }}>
      <Typography variant='h3' style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textTransform: 'none', fontStyle: 'classic', }}> How Many Batches do you want to create ?</Typography>
      <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '10px' }}>Enter the batch name and corresponding session times for each batch. Include the start and end times of each session.
      </Typography>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '50%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          sx={{ width: '50%' }}
          value={data}
          onChange={handleChange}
        />
      </Box>
    </Div>
  )
}
