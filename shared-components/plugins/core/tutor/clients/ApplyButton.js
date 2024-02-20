import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Grid } from '@mui/material';


export default function ApplyButtons() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Apply
      </Button>
      <Stack direction="row" alignItems="center" >
        
        <Grid >
      <Button variant="contained" component="label">
      <RefreshIcon/>Reset
      </Button></Grid>
     
    </Stack>

    </Stack>
  );
}