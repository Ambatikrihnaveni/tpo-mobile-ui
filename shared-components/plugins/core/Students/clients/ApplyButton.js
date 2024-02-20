import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';

export default function ApplyButtons() {
  return (
    <Stack direction="row" alignItems="center" >

      <Grid >
        <Button variant="contained" component="label" sx={{ width: '30px', height: '28px' }}>
          Apply
        </Button>
      </Grid>

    </Stack>
  );
}