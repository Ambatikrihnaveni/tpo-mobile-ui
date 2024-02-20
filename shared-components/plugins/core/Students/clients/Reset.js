import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Reset() {
  return (
    <Stack direction="row" alignItems="center" >

      <Grid >
        <Button variant="contained" component="label" sx={{ width: '30px', height: '28px' }}>
          <RefreshIcon />Reset
        </Button>
      </Grid>

    </Stack>
  );
}
