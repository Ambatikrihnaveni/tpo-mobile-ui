import React, { useState } from 'react'
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { Form, Formik, Field, ErrorMessage, FieldArray } from "formik";
import { Grid, } from '@mui/material'
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { Avatar, Stack, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";
import { use } from 'chai';
import JumboSelectField from "@jumbo/components/JumboFormik/JumboSelectField";
import TextField from '@mui/material/TextField';
import { Card, CardContent, InputLabel, Select, Button } from "@mui/material";
import styled from 'styled-components';
import ProfileMediaGallery from './profileMediaGallery';

const useStyles = makeStyles((theme) => ({
    passportAvatar: {
        width: '150px',
        height: '170px',
        borderRadius: '0',
    },
}));
const phoneRegExp = () => /^(\+?\d{0,5})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const validationSchema = yup.object({
    email: yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    firstname: yup
        .string("Enter your First name")
        .required("First name is required"),
    phonenumber: yup
        .string("Enter your Phonenumber")
        .max(12, 'Phone number must have 10 numbers with country code')
        .min(10, 'Please enter valid phone number')
        .required("Phone number is required"),
   
    country: yup
        .string("Enter your Country").required("Country is required"),
    pincode: yup
        .number("Pincode should be numeric value.")
        .required("Pincode is required"),
    city: yup
        .string("City field cannot be empty.")
        .required("City is required")
});
export default function BasicDetails({ data, handleChange, userData }) {
     
    const classes = useStyles();

    const h2 = styled.div`
    font-family: "Domine", Georgia, serif;
  `;
    const validateEmail = (value) => {
        let errorMessage;

        if (!value) {
            errorMessage = "Email is required";
        } else if (value.length < 10 || value.length > 10) {
            errorMessage = "Enter a valid email";
        }

        return errorMessage;
    };



    return (

        <Formik
            initialValues={{
                email: '',
                fathername:'',
                firstname: '',
                phonenumber: '',
                city: '',
                country: '',
                pincode: ''
            }}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
            }}
            validationSchema={validationSchema}

        >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
                <Form noValidate autoComplete="off"

                >
                    <Div sx={{ margin: {xs:'5px',sm:'70px'}, marginTop: '-10px' }}
                    >

                        <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Complete Your Personal Details First.</h2>
                        {/* <p style={{ color: '#475259', fontSize: ' 1.5rem', margin: '5px' }}>We suggest including an email and phone number.</p> */}
                        <br />
                        <p style={{ color: "#475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>
                        <Grid container spacing={3}>
                            <Grid item xs={3} >

                            <ProfileMediaGallery
                              editable={true}
                              media={userData?.userMedia}
                              userId={userData?._id}
/>
                    

                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Full Name *</Typography>
                                        <Field as={TextField} size="small" variant="outlined" name="firstname" placeholder="e.g. John" fullWidth value={data.firstname} onChange={handleChange('firstname')}
                                        /> {errors.firstname && touched.firstname && data.firstname?.length === 0 ? (
                                            <ErrorMessage name="firstname" component="div" style={{ color: '#f74336' }} />
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                    <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Email *</Typography>
                                        <Field as={TextField} size="small" variant="outlined" name="email" placeholder="e.g. sanvipatel@sample.com" fullWidth value={data.email} onChange={handleChange('email')}
                                            disabled
                                        />
                                        {errors.email && touched.email && data.email.length === 0 || (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) ? (
                                            <ErrorMessage name="email" component="div" style={{ color: '#f74336' }} />
                                        ) : null}

                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Father Name </Typography>
                                        <TextField size="small" variant="outlined" placeholder="e.g. John" fullWidth name="fathername"  value={data.fathername} onChange={handleChange('fathername')}
                                        /> 
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                    <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Hall Ticket Number</Typography>
                                        <TextField size="small" variant="outlined"  placeholder="e.g. 17HM1A3545" fullWidth name="hallticket"  value={data.hallticket} onChange={handleChange('hallticket')}
                                            
                                        />
                                       

                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>
                                            City *
                                        </Typography>
                                        <Field as={TextField} size="small" variant="outlined" name="city" placeholder="e.g. New Delhi" fullWidth value={data.city} onChange={handleChange('city')}
                                            inputProps={{
                                            }} />{errors.city && touched.city && data?.city?.length === 0 ? (
                                                <ErrorMessage name="city" component="div" style={{ color: '#f74336' }} />
                                            ) : null}

                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Country *</Typography>
                                        <Field as={TextField} size="small" variant="outlined" name="country" placeholder="e.g. India" fullWidth value={data.country} onChange={handleChange('country')}
                                            inputProps={{
                                            }} />{errors.country && touched.country && data?.country?.length === 0 ? (
                                                <ErrorMessage name="country" component="div" style={{ color: '#f74336' }} />
                                            ) : null}
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Pincode *</Typography>
                                        <Field type="number" as={TextField} size="small" variant="outlined" name="pincode" placeholder="e.g. 110034" value={data.pincode} onChange={handleChange('pincode')}
                                        />{errors.pincode && touched.pincode && data?.pincode?.length === 0 ? (
                                            <ErrorMessage name="pincode" component="div" style={{ color: '#f74336' }} />
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Phone Number *</Typography>
                                        <Field as={TextField} type="number" size="small" variant="outlined" name="phonenumber" placeholder="e.g. +91 2211334455" fullWidth value={data.phonenumber} onChange={handleChange('phonenumber')}
                                            sx={{
                                                '& input[type=number]': {
                                                    '-moz-appearance': 'textfield'
                                                },
                                                '& input[type=number]::-webkit-outer-spin-button': {
                                                    '-webkit-appearance': 'none',
                                                    margin: 0
                                                },
                                                '& input[type=number]::-webkit-inner-spin-button': {
                                                    '-webkit-appearance': 'none',
                                                    margin: 0
                                                }
                                            }}
                                        />{errors.phonenumber && touched.phonenumber && data.phonenumber?.length === 0 || data.phonenumber?.length < 10 || data.phonenumber?.length > 12 ? (
                                            <ErrorMessage name="phonenumber" component="div" style={{ color: '#f74336' }} />
                                        ) : null}

                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                        </Grid>

                    </Div>
                </Form>
            )}

        </Formik>

    )
}
