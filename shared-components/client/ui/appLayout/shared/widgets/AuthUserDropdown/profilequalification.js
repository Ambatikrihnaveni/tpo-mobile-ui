import { Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl,  Select, InputAdornment, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";
import { Form, Formik, } from "formik";
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import * as yup from "yup";


const validationSchema = yup.object({

  qualification: yup
      .string("Enter your qualification")
      .required("Qualification is required"),
  schoolname: yup
      .string("Enter your schoolname")
      .required("School name is required"),
  study: yup
      .string("Enter your study").required("Study is required"),
  schoollocation: yup
      .string("Enter your school location")
      .required("School location is required"),
  score: yup
      .string()
      .required("Score is required")
      .matches(/^\d+$/, "Score must be a number")
      .max(100, "Score must be less than or equal to 100"),
  gradYear: yup.string().required("Grad year is required"),
});
  export default function Education(qualificationData) {
    
    const {qualification,schoolcollname,fieldofstudy,location,score,passedyear,addQualification,addSchoolcollname,addFieldofstudy,addLocation,addScore,addPassedyear}=qualificationData
    const [degree, setDegree] = React.useState(" ");
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  // const [schoolname, setSchoolName]= useState('')
  const [schoollocation, setSchoolLocation] = useState('')
  const [gradYear, setGradYear] = useState('')

  const handleGradChange = (event) => {
    setGradYear(event.target.value);
  };

  const currentMonth = new Date().getMonth(); // Get current month (0-11)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

 

  return (
    <Formik 
    initialValues={{
      qualification: '',
      schoolname:'',
      study:'',
      schoollocation:'',
      score:'',
      gradYear:'',
  }}

  onSubmit={(values, { setSubmitting }) => {
      setSubmitting(false);
  }}
  validationSchema={validationSchema}
    >
      {({ errors, touched})  => (
        <Form 
        noValidate autoComplete="off"
        
        >
          <Div style={{ margin: '50px', marginTop: '-10px' }}>
            <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Tell us about your education</h2>
            <p style={{ color: '#2e475D', fontSize: ' 1.5rem', margin: '5px' }}>Enter your education experience so far, even if you are a current student or did not graduate.
            </p>
            <br />
            <p style={{ color: "475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>
           
            {qualificationData.qualificationList.map((qualificationList, index) => (
                <Div key={index}>
                  <Grid container spacing={1} >
                    <Grid item xs={2}>
                      <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Qualification *</Typography>
                      <TextField size="small" variant="outlined"  placeholder="e.g. SSC" fullWidth
                      value={qualificationList.qualification} 
                      
                      onChange={e => addQualification(e, index)} /> 
                      
                    </Grid>
                    <Grid item xs={2}>
                      <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Field of Study</Typography>
                      <TextField size="small" variant="outlined" placeholder="e.g. Financial Accounting" fullWidth
                      value={qualificationList.fieldofstudy} 
                      onChange={e => addFieldofstudy(e, index)}/>  
                    </Grid>
                    <Grid item xs={2.5}>
                      <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>School/Collage Name *</Typography>
                      <TextField size="small" variant="outlined" placeholder="e.g. Oxford Software Institute & Oxford School of English" fullWidth
                      value={qualificationList.schoolcollname} 
                      onChange={e => addSchoolcollname(e, index)}/>
                    </Grid>
              
                    <Grid item xs={2}>
                      <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Location *</Typography>
                      <TextField size="small" variant="outlined" placeholder="e.g. New Delhi, India" fullWidth
                      value={qualificationList.location} 
                      onChange={e => addLocation(e, index)}/>
                      
                    </Grid>
                    <Grid item xs={1}>
                      <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Score%*</Typography>
                      <TextField size="small" type="number" variant="outlined"  placeholder="e.g. 90%" fullWidth
                      value={qualificationList.score} 
                      onChange={e => addScore(e, index)}/>
                      
                    </Grid>
                    <Grid item xs={2} >
                      <FormControl fullWidth>
                        <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Passed out Year *</Typography>
                        <Select
                          value={qualificationList.passedyear} 
                          onChange={e => addPassedyear(e, index)}
                          size='small'
                          displayEmpty
                          renderValue={(value) => (value ? value : 'Year')}
                          startAdornment={
                            <InputAdornment position="start">
                              <CalendarTodayRoundedIcon />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="">
                            <em>Year</em>
                          </MenuItem>
                          {years.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                  
                    </Grid>                 
                  </Grid>
                  {qualificationData.qualificationList.length > 1 && (
                           <DeleteOutlineOutlinedIcon style={{color:'#f24b64',float:'right',margin:'1px 1px 15px 12px'}} onClick={() => qualificationData.handleDeleteQualification(index)}/>
                           )}
                </Div>
                                    ))}


            <Button variant="text" onClick={qualificationData.handleAddQualification}>+ Add Qualification</Button>
           
          </Div>
        </Form>
      )}
    </Formik >

  );
};


