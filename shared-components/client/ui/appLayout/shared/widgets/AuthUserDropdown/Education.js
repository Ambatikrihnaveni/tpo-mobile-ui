import { Grid, Typography,  } from '@material-ui/core';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl,  Select, InputAdornment, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";
import { Form, Formik, ErrorMessage,  } from "formik";
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  export default function Education({ handleChange, handleAddUser, handleDeleteUser, education,handleSubmitEducation }) {
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
        noValidate autoComplete="off" onSubmit={handleSubmitEducation}
        
        >
          <Div style={{ margin: {xs:'5px',sm:'50px'},marginTop: '-10px' }}>
            <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Provide Your Educational details here. </h2>
            {/* <p style={{ color: '#475259', fontSize: ' 1.5rem', margin: '5px' }}>Enter your education experience so far, even if you are a current student or did not graduate.
            </p> */}
            <br />
            <p style={{ color: "475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>
            {education.map((list, i) => {
              return (
                <Div key={i}>
                  <Grid container spacing={1} >
                    <Grid item xs={12} sm={2}>
                      <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Qualification *</Typography>
                      <TextField size="small" variant="outlined" name="qualification" placeholder="e.g. SSC" fullWidth value={list.qualification} onChange={e => handleChange(e, i, 'qualification')}
                      /> 
                       {errors.qualification && touched.qualification && education[0].qualification.length === 0 ?(
                        <ErrorMessage name="jobtitle" component="div" style={{ color: '#f74336' }} />
                    ) : null}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Field of Study</Typography>
                      <TextField size="small" variant="outlined" name="study" placeholder="e.g. Financial Accounting" fullWidth value={list.study} onChange={e => handleChange(e, i, 'study')}
                      />{errors.study && touched.study && education[0].study.length === 0  ? (
                        <ErrorMessage name="study" component="div" style={{ color: '#f74336' }} />
                    ) : null}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>School/Collage Name *</Typography>
                      <TextField size="small" variant="outlined" name="schoolname" placeholder="e.g. Oxford Software Institute & Oxford School of English" fullWidth value={list.schoolname} onChange={e => handleChange(e, i, 'schoolname')}
                      />{errors.schoolname && touched.schoolname && education[0].schoolname.length === 0 ? (
                        <ErrorMessage name="schoolname" component="div" style={{ color: '#f74336' }} />
                    ) : null}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Location *</Typography>
                      <TextField size="small" variant="outlined" name="schoollocation" placeholder="e.g. New Delhi, India" fullWidth value={list.schoollocation} onChange={e => handleChange(e, i, 'schoollocation')}
                      />{errors.schoollocation && touched.schoollocation && education[0].schoollocation.length === 0  ? (
                        <ErrorMessage name="schoollocation" component="div" style={{ color: '#f74336' }} />
                    ) : null}
                    </Grid>
                    <Grid item xs={12} sm={1}>
                      <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Score%*</Typography>
                      <TextField size="small" type="number" variant="outlined" name="score" placeholder="e.g. 90%" fullWidth value={list.score} onChange={e => handleChange(e, i, 'score')}
                      />{errors.score && touched.score && education[0].score.length === 0  ? (
                        <ErrorMessage name="score" component="div" style={{ color: '#f74336' }} />
                    ) : null}
                    </Grid>
                    <Grid item xs={11} sm={2}>
                      <FormControl fullWidth>
                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Passed out Year *</Typography>
                        <Select
                          name='gradYear'
                          value={list.gradYear}
                          onChange={(e) => handleChange(e, i, 'gradYear')}
                          size='small'
                          displayEmpty
                          renderValue={(value) => (value ? value : 'Pursuing')}
                          startAdornment={
                            <InputAdornment position="start">
                              <CalendarTodayRoundedIcon />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="">
                            <em>Pursuing</em>
                          </MenuItem>
                          {years.map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {errors.gradYear && touched.gradYear && education[0].gradYear.length === 0 ? (
                                            <ErrorMessage name="gradYear" component="div" style={{ color: '#f74336' }} />
                                        ) : null}
                    </Grid>
                    <Grid item xs={1} sm={1}>
                      {education.length !== 1 &&
                        <Button onClick={() => handleDeleteUser(i)}><DeleteOutlineIcon /></Button>}
                    </Grid>
                  </Grid>
                </Div>
              )
            })}

            <Button variant="text" onClick={handleAddUser}>+ Add Qualification</Button>
          
          </Div>
        </Form>
      )}
    </Formik >

  );
};


