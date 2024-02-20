
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Card, Grid } from '@mui/material';
import { Typography } from '@material-ui/core';
import TextField from "@mui/material/TextField";
import Div from "@jumbo/shared/Div";
import King from './Time1';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';

export default function RadioButtonsGroup() {

  return (
    <Card sx={{ width: '600px', height: '100vh', }}>
      <Grid sx={{ ml: 5 }}><Typography >Time Limit</Typography> </Grid>
      <Grid flexGrow={1} sx={{ display: 'inline-flex', ml: 3 }}>
        <Grid item xs={12} md={4} sm={4} lg={3} sx={{ alignItems: 'center' }}>
          <TextField />
        </Grid>
        <Grid item xs={12} md={4} sm={4} lg={3} sx={{ ml: 2 }} >
          <King />
        </Grid>
        <Grid item xs={12} md={4} sm={4} lg={2} sx={{ float: 'right', ml: 2 }}>
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="Hide Quiz time -display" />

          </FormGroup>
        </Grid>
      </Grid>
      <Grid sx={{ ml: 3 }}><Typography >Time Limit for the Quiz is 0 means no time limit</Typography></Grid><br />
      <Grid sx={{ ml: 3 }}> <Typography  >Quiz Feedback Mode</Typography> </Grid> <br />
      <Grid sx={{ ml: 2 }} ><Typography >(Pick the quiz system's behaviour on choice based question)</Typography></Grid>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="Default"
        name="radio-buttons-group"
      >
        <Grid >
          <Card item xs={12} md={12} lg={12} sx={{ m: 2, borderStyle: 'ridge' }}>   <FormControlLabel value="Default" control={<Radio />} label="Default" /> <br /><p>Answers shown after Quiz is Finished </p></Card>
          <Card item xs={12} md={12} lg={12} sx={{ m: 2, borderStyle: 'ridge' }}>   <FormControlLabel value="Reveal mode" control={<Radio />} label="Reveal mode" /> <br /><p>Show Results After the attempt </p></Card>
          <Card item xs={12} md={12} lg={12} sx={{ m: 2, borderStyle: 'ridge' }}>   <FormControlLabel value="Retry mode" control={<Radio />} label="Retry mode" />  <br /><p>Reattempt Quiz Any Number of times.Define Attempts Allowed Below </p></Card>
        </Grid> </RadioGroup>
      <Div sx={{ textAlign: 'left', ml: 2 }}>
        <Typography >Passing Grade(%)</Typography><br />
        <TextField fullWidth size='medium' />
        <Typography sx={{ ml: 2 }}>Set The Passing Percentage for this Quiz</Typography>
      </Div> </Card>
  );
}