import React, { useState } from 'react'
import MenuItem from "@mui/material/MenuItem";
import { Card, CardContent, InputLabel, Select, FormControl, Grid, Typography, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import Div from "@jumbo/shared/Div";
import { Form, Formik,} from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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


export default function ProfileExperience(experienceData) {
   // const {addTitle,addJoblocation,addEmployer,addStartmonth,addStartyear,addEndmonth,addEndyear,experienceinput}=experienceData
     
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, index) => currentYear - index);
    const [selectedStartYear, setSelectedStartYear] = useState('');
    const [selectedEndYear, setSelectedEndYear] = useState('');
    const [checked, setChecked] = React.useState(false);
    const [disableSelectFields, setDisableSelectFields] = useState(false);
    const [index,setIndex] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        joblocation: '',
        employer: '',
        startmonth: '',
        startyear: '',
        endmonth: '',
        endyear: '',
        currentlyWorking: false,
    });
    const handleChange = (e) => {
        setChecked((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      };

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
  

    const onFormSubmit=()=>{
         
        if(index != null){
            experienceData.handleEditExperience(formData,index)
            setIndex(null)
        }else{
            experienceData.handleAddExperience(formData)
        }
       
        setFormData({
            title: '',
            joblocation: '',
            employer: '',
            startmonth: '',
            startyear: '',
            endmonth: '',
            endyear: '',
            currentlyWorking: false,
        })
    }
const handleEditExperience =(experienceList,index)=>{
setIndex(index)
setFormData(experienceList)

}


    const handleStartChange = (event) => {
        setSelectedStartYear(event.target.value);
    };
    const handleEndChange = (event) => {
        setSelectedEndYear(event.target.value);
    };
  

    // Function to add a new experience entry
   
    return (
        <Formik
            validateOnChange={true}
            initialValues={{    
                startmonth: '',
                endmonth: '',
                jobtitle: '',
                employer: '',
                location: '',
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
                <Form noValidate autoComplete="off">
                    <Div style={{ margin: '70px' }}>
                        <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Tell us about your most recent job</h2>
                        <p style={{ color: '#475259', fontSize: ' 1.5rem', margin: '5px' }}>We’ll start there and work backward.
                        </p>
                        <br />
                        <p style={{ color: "#475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>
                        
                         <Grid container spacing={2}>
                        {experienceData.experienceList.map((experienceList, index) => (
                            <div key={index} style={{marginLeft:'20px'}}>
                                <Card style={{ border: '1px solid #475259', marginBottom: '10px' }}>
                                    <CardContent>
                                        <Typography style={{ color: '#50C2C9', fontFamily: '"Domine",Georgia,serif', fontWeight: '400', fontSize: '2rem' }}>
                                            {experienceList.title}
                                        </Typography>
                                        <Typography style={{ color: '#475259', fontSize: '20px' }}>{experienceList.joblocation}</Typography>
                                        <Typography style={{ color: '#475259', fontSize: '20px' }}>{experienceList.employer}</Typography>
                                        <Typography style={{ color: '#475259', fontSize: '20px' }}>
                                            {experienceList.disableSelectFields
                                                ? `${experienceList.startmonth} ${experienceList.startyear} - Currently work here`
                                                : `${experienceList.startmonth} ${experienceList.startyear} - ${experienceList.endmonth} ${experienceList.endyear}`}
                                        </Typography>
                                        <div style={{ textAlign: 'right' }}>
                                            <IconButton onClick={() =>handleEditExperience(experienceList,index)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => experienceData.handleDeleteExperience(index)}>
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                        
                          </Grid>
                        <br />
             
                        <div >
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Job Title *</Typography>
                                <TextField size="small" variant="outlined"  placeholder="e.g. Software Developer" fullWidth
                                 value={formData.title} 
                                 onChange={e => setFormData({...formData,title:e.target.value && e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})}/>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Employer *</InputLabel>
                                <TextField size="small" variant="outlined" placeholder="e.g. Tech soft" fullWidth 
                                 value={formData.joblocation} 
                                 onChange={e => setFormData({...formData,joblocation:e.target.value && e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})}/>
                                                          </Grid>

                            <Grid item xs={6}>
                                <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', type: 'text' }}>Location *</Typography>
                                <TextField size="small" variant="outlined"  placeholder="e.g. New Delhi" fullWidth
                                 value={formData.employer} 
                                 onChange={e => setFormData({...formData,employer:e.target.value && e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})}
                                />
                               
                            </Grid>
                        </Grid>
                        <br />
                        {/* Start date */}
                        <Grid container spacing={4}>
                            <Grid item xs={6}>
                                <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '-7px' }}>Start Date</Typography>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={formData.startmonth} 
                                                onChange={e => setFormData({...formData,startmonth:e.target.value})}
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
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={formData.startyear} 
                                                onChange={e =>setFormData({...formData,startyear:e.target.value})}
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
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '-7px' }}>End Date</Typography>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                 displayEmpty
                                                 value={formData.endmonth} 
                                                 onChange={e =>setFormData({...formData,endmonth:e.target.value})}
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
                                       
                                    </Grid>
                                    <Grid item xs={12} md={6} >
                                        <FormControl fullWidth>
                                            <Select
                                                displayEmpty
                                                value={formData.endyear} 
                                                onChange={e => setFormData({...formData,endyear:e.target.value})}
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
                                        </FormControl>

                                    </Grid>
                                    <br />
                                    <FormControlLabel control={<Checkbox checked={disableSelectFields} onChange={handleCheckboxChange}
                                    />} label="I currently work here" style={{ color: '#475259', marginLeft: '10px' }}
                                                    
                                    />
                                
                                </Grid>
                            </Grid>

                        </Grid>
                        
                        </div>
                        
                        <Button variant="text" type="submit" onClick={onFormSubmit}
                       
                         disabled={
                            
                           formData.startmonth=="" || formData.title=="" || formData.joblocation=="" || formData.employer==""  || formData.startyear==""||(( formData.endmonth=="" || formData.endyear=="" )&&disableSelectFields==false)
                          } 
                         
                        >
                            + Add Work Experience
                        </Button>
                    </Div>
                </Form>
            )}
        </Formik >
    )
}
