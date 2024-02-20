import React from 'react';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
import { Typography ,TextField} from '@mui/material';


const ProgramTitle = ({ data, handleChange }) => {
  const handleTitleChange = (event) => {
    handleChange(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1));
  };

  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h3' style={{ color: 'black', fontSize: '25px', fontWeight: 'bold', textTransform: 'none', fontStyle: 'classic' }}>Program Name</Typography>
      <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '15px' }}>Give a name to your program</Typography>

      <TextField id="outlined-basic" label="Program name" variant="outlined"
        value={data}
        onChange={handleTitleChange}
        placeholder='Ex: Full Stack Development'
        sx={{ m: 1, width: '50%' }} />
         <br/>
    <br/>
    </Div>
   
  );
};

export default ProgramTitle;
