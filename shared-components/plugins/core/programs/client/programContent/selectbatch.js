import React from 'react';
import { Button, Grid, TextField, Typography ,Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Div from '../../../../../client/ui/@jumbo/shared/Div/Div';
const SelectBatch = (params) => {
const {programBatchRow,
       programBatch,
       addBatchName,
       addBatchFromTime,
       addBatchToTime,
       onaddBatchRow,
       removeBatchRow,
       error
       } = params
       const isAddButtonDisabled = programBatchRow.length >= 4;

  return (
    <Div style={{minHeight: '50vh'}}>
    <Box sx={{marginTop:'-100px',}}>
<Typography variant='h1' sx={{m:2,textAlign:'left',fontWeight:'bold',color:"black",textTransform:'none'}}>Add Batches<span style={{fontSize:"14px"}}>  (max: 4)</span></Typography>
<Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom:'25px' }}>Enter the batch name and corresponding session times for each batch. Include the start and end times of each session.
</Typography>


      {programBatchRow.map((batch, i) => (
        <Grid container spacing={2} style={{marginTop:'10px'}} key={i}>
        <Grid item xs={12} md={4}>
          <TextField
           id="outlined-basic" 
           label="Batch Name "
            variant="outlined" 
            fullWidth
            value={programBatch[i]? programBatch[i].name:''}
            onChange={(e)=>addBatchName(e,i)}
            error={error.hasError}
            helperText={error.message}
            />
        </Grid>
          <Grid item xs={5} md={3}>
          <TextField
            id="time"
            label="Start Time"
            type="time"
            fullWidth
            value={programBatch[i]? programBatch[i].batchStartTime:''}
            onChange={(e)=>addBatchFromTime(e,i)}
            defaultValue="00:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}

          />

           </Grid>
           <Grid item  xs={5} md={3} >
          <TextField
            id="time"
            label=" End Time"
            type="time"
            fullWidth
            value={programBatch[i]? programBatch[i].batchEndTime : ''}
            onChange={(e)=>addBatchToTime(e,i)}
            defaultValue="00:00"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}

          />
          </Grid>
          <Grid item xs={1} md={1}>
                     <Button
                       variant='contained'
                       color='error'
                        onClick={() => removeBatchRow(i)}
                        aria-label="close"
                        disabled={programBatchRow.length > 1 ? false : true}
                        sx={{minWidth:'10px',maxHeight:'30px',ml:1}}
                    >
                        <DeleteOutlineIcon />
                    </Button>
                    </Grid>
      
     </Grid>
      ))}

      <Button onClick={onaddBatchRow} variant="contained" style={{marginTop:'10px'}} disabled={isAddButtonDisabled}> <AddIcon/>Add batch</Button>
    </Box>
    </Div>
  );
};

export default SelectBatch;