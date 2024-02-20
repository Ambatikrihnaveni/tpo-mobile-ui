import React, { useState } from 'react'
import Div from "@jumbo/shared/Div";
import { Form, Formik,  } from "formik";
import { Grid, } from '@mui/material'
import { Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import ProfileMediaGallery from './profileMediaGallery';
import useAuth from '../../../../hooks/useAuth';

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
    surname: yup
        .string("Enter your Sur name")
        .required("Surname is required"),
    country: yup
        .string("Enter your Country").required("Country is required"),
    pincode: yup
        .number("Pincode should be numeric value.")
        .required("Pincode is required"),
    city: yup
        .string("City field cannot be empty.")
        .required("City is required")
});
export default function ProfileBasic(params) {
    const { name, email, number, website, city, state, country, address, addName, addEmail, addNumber, addWebsite, addCity, addState, addCountry, addAddress } = params
    const classes = useStyles();
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = React.useState(viewer);


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

    React.useEffect(() => {
        if (viewer) {
            setUser(viewer);
        }
    }, [viewer]);



    return (

        <Formik
            initialValues={{
                firstname: '',
                phonenumber: '',
                email: '',
                //  surname: '',
                // city: '',
                // country: '',
                //pincode: ''
            }}

            onSubmit={(values, { setSubmitting }) => {

                setSubmitting(false);
            }}
            validationSchema={validationSchema}

        >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
                <Form noValidate autoComplete="off"

                >
                    <Div style={{ margin: '50px 50px', marginTop: '-10px' }}
                    >

                        <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', marginRight: '300px' }}>Complete your personal details first.</h2>
                        <p style={{ color: '#475259', fontSize: ' 1.5rem', margin: '5px' }}>We suggest that you fill out all the required fields here.</p>
                        <br />
                        <p style={{ color: "#475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>


                        <ProfileMediaGallery
                            editable={true}
                            media={user?.userMedia}
                            userId={user?._id}
                        />



                        <Grid item xs={12} sm={6} lg={6} sx={{ marginLeft: '50px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} >
                                    <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}> Name *</Typography>
                                    <TextField fullWidth size="small" value={name}
                                        onChange={addName} variant="outlined" label="Name" sx={{ mt: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Email *</Typography>
                                    <TextField fullWidth size="small" type={email} value={email}
                                        onChange={addEmail} variant="outlined" label="Email" disabled='true' sx={{ mt: 2 }} />


                                </Grid>

                            </Grid>
                            <br />
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} >
                                    <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Phone Number *</Typography>
                                    <TextField fullWidth type="number" value={number}
                                        onChange={addNumber} size="small" variant="outlined"
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
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6} >
                                    <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Web Site </Typography>
                                    <TextField size="small" variant="outlined" name="website" placeholder="e.g. www.website.com" fullWidth
                                        value={website}
                                        onChange={addWebsite}
                                    />

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} lg={6} >
                                <Grid container spacing={3} style={{ marginTop: '8px' }}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Address *</Typography>
                                        <TextField size="small" variant="outlined" placeholder="e.g. Auto Nagar" fullWidth
                                            value={address}
                                            onChange={addAddress} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}> City *</Typography>
                                        <TextField size="small" variant="outlined" placeholder="e.g. Guntur" fullWidth
                                            value={city}
                                            onChange={addCity} />
                                    </Grid>


                                </Grid>


                                <br />

                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>State </Typography>
                                        <TextField size="small" variant="outlined" placeholder="e.g. AP" fullWidth
                                            value={state}
                                            onChange={addState}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Country *</Typography>
                                        <TextField size="small" variant="outlined" placeholder="e.g. India" fullWidth
                                            value={country}
                                            onChange={addCountry}
                                        />


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
