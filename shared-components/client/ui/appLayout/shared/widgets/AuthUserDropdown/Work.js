import React, { useState } from 'react'
import MenuItem from "@mui/material/MenuItem";
import { Card, CardContent, InputLabel, Select, FormControl, Menu, Grid, Typography, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Div from "@jumbo/shared/Div";
import { Form, Formik, Field, ErrorMessage, } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button'
const validationSchema = yup.object({
    startmonth: yup
        .string("Select Start Month")
        .required("Start month is required"),
    endmonth: yup
        .string("Select End Month")
        .required("End month is required"),
    selectedStartYear: yup
        .string("Select Start Year")
        .required("Start year is required"),
    selectedEndYear: yup
        .string("Select End Year")
        .required("End year is required"),
    location: yup
        .string("Enter your Location")
        .required("Location is required"),
    employer: yup
        .string("Enter your Employer name").required("Employer name is required"),
    jobtitle: yup
        .string("Enter your job title")
        .required("Job Title is required"),

});


export default function Work({ data, handleChange, handleDelete, handleEdit, handleSubmit, }) {
    
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, index) => currentYear - index);
    const [startmonth, setStartMonth] = useState("")
    const [location, setLocation] = useState("")
    const [jobtitle, setJobTitle] = useState("")
    const [employer, setEmployer] = useState("")
    const [endmonth, setEndMonth] = useState("")
    const [selectedStartYear, setSelectedStartYear] = useState('');
    const [selectedEndYear, setSelectedEndYear] = useState('');
    const [checked, setChecked] = React.useState(false);
    const [disableSelectFields, setDisableSelectFields] = useState(false);
    const [noExperienceChecked, setNoExperienceChecked] = useState(false);


    const handleCheckboxChange = (event) => {
        setDisableSelectFields(event.target.checked);
        if (event.target.checked) {
            handleChange({
                target: {
                    name: "endmonth",
                    value: "",
                },
            });
            handleChange({
                target: {
                    name: "selectedEndYear",
                    value: "",
                },
            });
        }
    };
    const handleCheckboxChange1 = (event) => {
        setNoExperienceChecked(event.target.checked);

        if (event.target.checked) {
            handleChange({
                target: {
                    name: "endmonth",
                    value: "",
                },
            });
            handleChange({
                target: {
                    name: "selectedEndYear",
                    value: "",
                },
            });
        }
    };
   

    return (
        <Formik
            validateOnChange={true}
            initialValues={{
                startmonth: '',
                endmonth: '',
                jobtitle: '',
                employer: '',
                location: '',
                description:'',
                selectedEndYear: '',
                selectedStartYear: ''
            }}
            onSubmit={(values, { setSubmitting }) => {
                // Handle form submission
                // You can access form values using the "values" object
                console.log(values);
                setSubmitting(false);
            }}
            validationSchema={validationSchema}>
            {({ isSubmitting, setFieldValue, errors, touched }) => (
                <Form noValidate autoComplete="off" onSubmit={handleSubmit} >
                    <Div style={{ margin: {xs:'5px',sm:'70px'}, }}>
                        <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Tell us about your most recent job.</h2>
                     
                        <br />
                        <p style={{ color: "#2e475D", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>
                        <Grid container spacing={2}>
                            {data.work.map((work, index) => (
                                <Grid item key={index} xs={12} sm={6} md={4}>
                                    {!noExperienceChecked && (
                                    <Card style={{ border: '1px solid #2e475D' }}>
                                        <CardContent>
                                            <h2 style={{ color: '#50C2C9', fontFamily: '"Domine",Georgia,serif', fontWeight: '400', fontSize: '2rem' }}>{work.jobtitle}</h2>
                                            <Typography style={{ color: '#2e475D', fontSize: '20px' }}>{work.employer}</Typography>
                                            <Typography style={{ color: '#2e475D', fontSize: '20px' }}>{work.location}</Typography>
                                            <Typography style={{ color: '#2e475D', fontSize: '20px' }}>
                                                {disableSelectFields
                                                    ? `${work.startmonth} ${work.selectedStartYear} - Currently work here`
                                                    : `${work.startmonth} ${work.selectedStartYear} - ${work.endmonth} ${work.selectedEndYear}`}
                                            </Typography>

                                            {/* Display other work details */}
                                            <div style={{ textAlign: 'right' }}>
                                                <IconButton onClick={() => handleEdit(index)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(index)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </Card>)}
                                </Grid>
                            ))}
                        </Grid>
                        <br />
                   
                        {!noExperienceChecked && (
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography style={{ color: '#2e475D', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Internship/Project Title *</Typography>
                                <Field as={TextField} size="small" variant="outlined" name="jobtitle" placeholder="e.g. Software Developer" fullWidth value={data.jobtitle} onChange={handleChange}
                                />
                                {errors.jobtitle && touched.jobtitle && data.jobtitle?.length === 0 ? (
                                    <ErrorMessage name="jobtitle" component="div" style={{ color: '#f74336' }} />
                                ) : null}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel style={{ color: '#2e475D', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Employer *</InputLabel>
                                <Field as={TextField} size="small" variant="outlined" name="employer" placeholder="e.g. Tech soft" fullWidth value={data.employer} onChange={handleChange}
                                />
                                {errors.employer && touched.employer && data.employer.length === 0 ? (
                                    <ErrorMessage name="employer" component="div" style={{ color: '#f74336' }} />
                                ) : null}                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography style={{ color: '#2e475D', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Location *</Typography>
                                <Field as={TextField} size="small" variant="outlined" name="location" placeholder="e.g. New Delhi" fullWidth value={data.location} onChange={handleChange}
                                />
                                {errors.location && touched.location && data.location.length === 0 ? (
                                    <ErrorMessage name="location" component="div" style={{ color: '#f74336' }} />
                                ) : null}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography style={{ color: '#2e475D', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Description *</Typography>
                                <Field as={TextField} id={`outlined-multiline-static`} size="small" variant="outlined" name="description" placeholder="e.g. Description" fullWidth value={data.description} onChange={handleChange} multiline rows={2}
                                />
                            </Grid>
                        </Grid>
                        )}
                        <br />
                        {/* Start date */}
                        {!noExperienceChecked && (
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Typography style={{ color: '#2e475D', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '-7px' }}>Start Date</Typography>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                name='startmonth'
                                                value={data.startmonth}
                                                onChange={handleChange}
                                                displayEmpty
                                                renderValue={(value) => (value ? value : 'Month')}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <CalendarTodayRoundedIcon />
                                                    </InputAdornment>
                                                }
                                            >
                                                <MenuItem value="">
                                                    <em>Month</em>
                                                </MenuItem>
                                                <MenuItem value="January">January</MenuItem>
                                                <MenuItem value="February">February</MenuItem>
                                                <MenuItem value="March">March</MenuItem>
                                                <MenuItem value="April">April</MenuItem>
                                                <MenuItem value="May">May</MenuItem>
                                                <MenuItem value="June">June</MenuItem>
                                                <MenuItem value="July">July</MenuItem>
                                                <MenuItem value="August">August</MenuItem>
                                                <MenuItem value="September">September</MenuItem>
                                                <MenuItem value="October">October</MenuItem>
                                                <MenuItem value="November">November</MenuItem>
                                                <MenuItem value="December">December</MenuItem>
                                            </Select>
                                        </FormControl>{errors.startmonth && touched.startmonth && data.startmonth.length === 0 ? (
                                            <ErrorMessage name="startmonth" component="div" style={{ color: '#f74336' }} />
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                name='selectedStartYear'
                                                value={data.selectedStartYear}
                                                onChange={handleChange}
                                                displayEmpty
                                                renderValue={(value) => (value ? value : 'Year')}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <CalendarTodayRoundedIcon />
                                                    </InputAdornment>
                                                }                                >
                                                <MenuItem value="">
                                                    <em>Year</em> {/* Placeholder text */}
                                                </MenuItem>
                                                {years.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {errors.selectedStartYear && touched.selectedStartYear && data.selectedStartYear.length === 0 ? (
                                            <ErrorMessage name="selectedStartYear" component="div" style={{ color: '#f74336' }} />
                                        ) : null}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography style={{ color: '#2e475D', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '-7px' }}>End Date *</Typography>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                name='endmonth'
                                                value={data.endmonth}
                                                onChange={handleChange} displayEmpty
                                                renderValue={(value) => (value ? value : 'Month')}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <CalendarTodayRoundedIcon />
                                                    </InputAdornment>
                                                }
                                                disabled={disableSelectFields}
                                            >
                                                <MenuItem value="">
                                                    <em>Month</em>
                                                </MenuItem>
                                                <MenuItem value="January">January</MenuItem>
                                                <MenuItem value="February">February</MenuItem>
                                                <MenuItem value="March">March</MenuItem>
                                                <MenuItem value="April">April</MenuItem>
                                                <MenuItem value="May">May</MenuItem>
                                                <MenuItem value="June">June</MenuItem>
                                                <MenuItem value="July">July</MenuItem>
                                                <MenuItem value="August">August</MenuItem>
                                                <MenuItem value="September">September</MenuItem>
                                                <MenuItem value="October">October</MenuItem>
                                                <MenuItem value="November">November</MenuItem>
                                                <MenuItem value="December">December</MenuItem>
                                            </Select>
                                        </FormControl>
                                        {errors.endmonth && touched.endmonth && data.endmonth.length === 0 ? (
                                            <ErrorMessage name="endmonth" component="div" style={{ color: '#f74336' }} />
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                name='selectedEndYear'
                                                value={data.selectedEndYear}
                                                onChange={handleChange}
                                                displayEmpty
                                                renderValue={(value) => (value ? value : 'Year')}
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <CalendarTodayRoundedIcon />
                                                    </InputAdornment>
                                                }
                                                disabled={disableSelectFields}
                                            >
                                                {years.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>{errors.selectedEndYear && touched.selectedEndYear && data.setSelectedEndYear.length === 0 ? (
                                            <ErrorMessage name="selectedEndYear" component="div" style={{ color: '#f74336' }} />
                                        ) : null}

                                    </Grid>
                                    <br />
                                    <FormControlLabel control={<Checkbox checked={disableSelectFields} onChange={handleCheckboxChange}
                                    />} label="I currently work here" style={{ color: '#2e475D', marginLeft: '10px' }}

                                    />

                                </Grid>
                            </Grid>

                        </Grid>
                        )}
                        {!noExperienceChecked && (
                        <Button variant="outlined" type="submit"
                        disabled={
                            noExperienceChecked ||
                            !data.startmonth ||
                            !data.selectedStartYear ||
                            (!disableSelectFields && (!data.selectedEndYear || !data.endmonth)) ||
                            !data.location ||
                            !data.employer ||
                            !data.jobtitle
                        }>
                            + Add Internship/Project
                        </Button>)}
                         
                    </Div>
                </Form>
            )
            }
        </Formik >
    )
}
