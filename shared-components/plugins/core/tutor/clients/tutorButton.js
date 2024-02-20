import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export default function EditButtons() {
  return (
    <Stack direction="row" alignItems="center" >
      <Button variant="contained" component="label">
        Edit
      </Button>
    </Stack>
  );
}