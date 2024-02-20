import * as React from 'react';
import Stack from '@mui/material/Stack';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function EditButtons() {
  return (

    <Stack direction="row" spacing={2} sx={{ py: { lg: 6.5 } }}>
      <CheckCircleOutlineIcon />
      <DeleteOutlineIcon style={{ color: 'red' }} />

    </Stack>
  );
}




