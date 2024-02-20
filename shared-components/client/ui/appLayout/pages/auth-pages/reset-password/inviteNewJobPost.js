import React, { useState } from 'react';
import { Button, Grid, TextField, } from "@mui/material";
import Div from "../../../../@jumbo/shared/Div";
import FormControl from "@mui/material/FormControl";
import swal from 'sweetalert';
import { Form, Formik, ErrorMessage } from "formik";
import { recordService } from '../../../services/record-services';
import { useMutation } from "react-query";
import * as yup from "yup";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const validationSchema = yup.object({
    JobTitle: yup
        .string("Enter your JobTitle")
        .required("JobTitle is required"),
    Company: yup
        .string("Enter your Company")
        .required("JobTitle is Company"),
    Location: yup
        .string("Enter your Location")
        .required("JobTitle is Location"),
    placement: yup
        .string("Enter your placement")
        .required("JobTitle is placement"),
    JobRequirement: yup
        .string("Enter your JobRequirement")
        .required("JobTitle is JobRequirement"),
    CurrencyType: yup
        .string("Enter your CurrencyType")
        .required("JobTitle is CurrencyType"),
    SalaryRange: yup
        .string("Enter your SalaryRange")
        .required("JobTitle is SalaryRange"),
    jobType: yup
        .string("Enter your jobType")
        .required("JobTitle is jobType"),
    Experience: yup
        .string("Enter your Experience")
        .required("JobTitle is Experience"),
    JobDescription: yup
        .string("Enter your JobDescription")
        .required("JobTitle is JobDescription"),
});


function InviteNewJobPost({ shopId }) {

    const [inputList, setInputList] = useState([{ name: '' }]);

    const [JobTitle, setJobTitle] = useState('');
    const [Company, setCompany] = useState('');
    const [Location, setLocation] = useState('');
    const [placement1, setPlacement1] = useState('');
    const [JobRequirement, setJobRequirement] = useState('');
    const [CurrencyType1, setCurrencyType1] = useState('');
    const [SalaryRange, setSalaryRange] = useState('');
    const [jobType1, setjobType1] = useState('');
    const [Experience, setExperience] = useState('');
    const [JobDescription, setJobDescription] = useState('');


    const sweetAlerts = () => {

        swal({
            title: "Success",
            text: "Invitation link has been sent to email",
            icon: "success",
        })
    };

    const [name, setName] = React.useState('');


    const handleInputChange = (e) => {

        const { name, value } = e.target;
        const list = [...inputList];
        setInputList(list);
    }

    const handleInputChange1 = (data, index) => {
        const { name, value } = data;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };


    const inviteUserMutation = useMutation(recordService.inviteUsers, {
        onSuccess: () => {
            sweetAlerts()
            setInputList([{ email: "", role: "" }])
        }
    });

    const inviteShopMember = () => {
        data = { inputdata: inputList, shopId: shopId }
        inviteUserMutation.mutate(data)
    }

    const [CurrencyType, setCurrencyType] = React.useState('');

    const handleChange = (event) => {
        setCurrencyType(event.target.value);
    };

    const [placement, setPlacement] = React.useState('');

    const handleChangeplace = (event) => {
        setPlacement(event.target.value);
    };

    const [jobType, setJobType] = React.useState('');

    const handleChangeJob = (event) => {
        setJobType(event.target.value);
    };


    return (
        <Formik
            validateOnChange={true}
            initialValues={{
                JobTitle: '',
                Company: '',
                Location: '',
                placement1: '',
                JobRequirement: '',
                CurrencyType1: '',
                jobType1: '',
                Experience: '',
                JobDescription: '',
                SalaryRange: ''

            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                setSubmitting(false)
            }}
            validationSchema={validationSchema}
        >{({ isSubmitting, errors, touched }) => (
            <Form onValidate autoComplete='off'>
                {inputList.map((x, i) => {
                    return (
                        <Div>

                            <Grid container spacing={1} sx={{ mb: 1, margin: "10px" }} >

                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name="JobTitle"
                                        label="Job Title"
                                        size="small"
                                        onChange={handleInputChange}
                                    />
                                    {errors.JobTitle && touched.JobTitle && JobTitle.length === 0 ? (
                                        <ErrorMessage name="JobTitle" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name='Company'
                                        label="Company"
                                        size="small"
                                        onChange={handleInputChange}
                                    />
                                    {errors.Company && touched.Company && Company.length === 0 ? (
                                        <ErrorMessage name="Company" component="div" style={{ color: '#f74336' }} />) : null}

                                </Grid>
                            </Grid>

                            <Grid container spacing={1} sx={{ mb: 1, margin: "10px" }} >

                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name="Location"
                                        label="Location"
                                        size="small"
                                        onChange={handleInputChange}
                                    />
                                    {errors.Location && touched.Location && Location.length === 0 ? (
                                        <ErrorMessage name="Location" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>
                                <Grid item md={5}>
                                    <FormControl fullWidth>

                                        <InputLabel id="demo-simple-select-label">placement</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='placement'
                                            value={placement}
                                            label="placement"
                                            onChange={handleChangeplace}
                                        >
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {errors.placement1 && touched.placement1 && placement1.length === 0 ? (
                                        <ErrorMessage name="placement1" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>

                            </Grid>

                            <Grid container spacing={1} sx={{ mb: 1, margin: "10px" }} >

                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name="JobRequirement"
                                        label="Job Requirement"
                                        size="small"
                                        onChange={handleInputChange}
                                    />
                                    {errors.JobRequirement && touched.JobRequirement && JobRequirement.length === 0 ? (
                                        <ErrorMessage name="JobRequirement" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>
                                <Grid item md={5} spacing={0}>
                                    <FormControl fullWidth>
                                        <InputLabel style={{ minHeight: "5px" }} id="demo-simple-select-label">Currency Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='CurrencyType'
                                            value={CurrencyType}
                                            label="Currency Type"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10}>₹ INR</MenuItem>
                                            <MenuItem value={20}>$ USD</MenuItem>
                                            <MenuItem value={30}>€ EURO</MenuItem>
                                            <MenuItem value={30}>£ POUND</MenuItem>
                                        </Select>
                                        {errors.CurrencyType1 && touched.CurrencyType1 && CurrencyType1.length === 0 ? (
                                            <ErrorMessage name="CurrencyType1" component="div" style={{ color: '#f74336' }} />) : null}
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={1} sx={{ mb: 1, margin: "10px" }} >

                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name='SalaryRange'
                                        label="Salary Range"
                                        size="small"
                                        onChange={handleInputChange}
                                    ></TextField>
                                    {errors.SalaryRange && touched.SalaryRange && SalaryRange.length === 0 ? (
                                        <ErrorMessage name="SalaryRange" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>

                                <Grid item md={5}>
                                    <FormControl fullWidth>
                                        <InputLabel style={{ minHeight: "5px" }} id="demo-simple-select-label">Job Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='jobType'
                                            value={jobType}
                                            label="Job Type"
                                            onChange={handleChangeJob}
                                        >
                                            <MenuItem value={10}>Remote</MenuItem>
                                            <MenuItem value={20}>Offline</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {errors.jobType1 && touched.jobType1 && jobType1.length === 0 ? (
                                        <ErrorMessage name="jobType1" component="div" style={{ color: '#f74336' }} />) : null}

                                </Grid>


                            </Grid>
                            <Grid container spacing={1} sx={{ mb: 1, margin: "10px" }} >

                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name="Experience"
                                        label="Experience"
                                        size="small"
                                        onChange={handleInputChange}
                                    />
                                    {errors.Experience && touched.Experience && Experience.length === 0 ? (
                                        <ErrorMessage name="Experience" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>
                                <Grid item md={5}>
                                    <TextField
                                        fullWidth
                                        name="JobDescription"
                                        label="Job Description"
                                        size="small"
                                        onChange={handleInputChange}
                                    />
                                    {errors.JobDescription && touched.JobDescription && JobDescription.length === 0 ? (
                                        <ErrorMessage name="JobDescription" component="div" style={{ color: '#f74336' }} />) : null}
                                </Grid>

                            </Grid>

                        </Div>

                    );
                })}
                <Grid container spacing={2} sx={{ mt: -3 }}>
                    <Grid item xs={6} sx={{ mt: 8 }}>
                        <Button type='submit' variant='contained' onClick={inviteShopMember}>Add New</Button>
                    </Grid>
                </Grid>
            </Form>

        )}
        </Formik>
    );
}

export default InviteNewJobPost;