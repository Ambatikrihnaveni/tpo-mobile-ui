import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch'
import { Typography } from '@mui/material';

export default function TutorSettings() {
  const [state, setState] = React.useState({
    email: true,
    whatsapp: false,
    class: true,
    student: false,
    tutor: true,
    tutors: false

  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };


  return (
    <FormControl component="fieldset" variant="standard" >
      <Typography variant='h4' sx={{ ml: '15px', mt: '20px' }}> <b>Notifications</b></Typography>
      <FormGroup sx={{ mt: '20px' }}>
        <FormControlLabel
          control={<Switch checked={state.email} onChange={handleChange} name="email" sx={{ ml: '95px' }} />}
          label="Student& Tutor notification via email"
          labelPlacement="start"
          sx={{ justifyContent: 'start' }}

        />
        <FormControlLabel
          control={<Switch checked={state.whatsapp} onChange={handleChange} name="whatsapp" sx={{ ml: '70px' }} />}
          label="Student& Tutor notification via whatsapp"
          labelPlacement="start"
          sx={{ justifyContent: 'start' }}

        />

      </FormGroup>
      <Typography variant='h4' sx={{ ml: '15px', mt: '20px' }}> <b> Alerts</b></Typography>
      <FormGroup sx={{ mt: '20px' }}>
        <FormControlLabel
          control={<Switch checked={state.class} onChange={handleChange} name="class" sx={{ ml: '130px' }} />}
          label="Alert the class time before 5 min"
          labelPlacement="start"
          sx={{ justifyContent: 'start' }}

        />
        <FormControlLabel
          control={<Switch checked={state.student} onChange={handleChange} name="student" sx={{ ml: '125px' }} />}
          label="Alert when student skip the class"
          labelPlacement="start"
          sx={{ justifyContent: 'start' }}

        />
        <FormControlLabel
          control={<Switch checked={state.tutor} onChange={handleChange} name="tutor" sx={{ ml: '110px' }} />}
          label="Alert tutor about class before 5 min"
          labelPlacement="start"
          sx={{ justifyContent: 'start' }}

        />
        <FormControlLabel
          control={<Switch checked={state.tutors} onChange={handleChange} name="tutors" sx={{ ml: '196px' }} />}
          label="Alert tutor if they skip"
          labelPlacement="start"
          sx={{ justifyContent: 'start' }}
        />

      </FormGroup>

    </FormControl>
  );
}
