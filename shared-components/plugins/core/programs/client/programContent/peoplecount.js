

import  React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
 import { Typography} from '@mui/material';
 import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';

export default function PeoplesCount({batchStrength,addBatchStrength}) {
  return (
    <Div style={{minHeight: '50vh'}}>
    <Box sx={{textAlign:'center',marginTop:'-100px'}}  >
      <Typography style={{color:'rgb(0, 0, 0)',fontWeight: '700', fontStyle: 'normal',  fontSize: '25px',padding:'10px 5px'}}>No of Students for each Batch</Typography>
      <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom:'15px' }}>Enter the desired number of students for each batch.
</Typography>

        <TextField
          id="standard-number"
          type= "number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
          value={batchStrength}
          onChange={(e)=>addBatchStrength(e)}
          style={{width:'60%'}}
          placeholder='Ex: 30'
        />
       </Box>
       </Div>
  );
}
