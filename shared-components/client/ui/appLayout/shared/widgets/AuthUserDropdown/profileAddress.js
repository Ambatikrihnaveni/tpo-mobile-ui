import React, { useState } from 'react'
import Div from "@jumbo/shared/Div";
import { Form, Formik,} from "formik";
import { Grid, } from '@mui/material'
import {  Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import * as yup from "yup";
import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    passportAvatar: {
        width: '150px',
        height: '170px',
        borderRadius: '0',
    },
}));

const validationSchema = yup.object({
    address: yup
    .string("Enter your Address").required("Address is required"),
    state: yup
    .string("Enter your State").required("State is required"),
 
   
    country: yup
        .string("Enter your Country").required("Country is required"),
   
    city: yup
        .string("City field cannot be empty.")
        .required("City is required")
});
export default function ProfileAddress({ data, handleChange, userData }) {
    const classes = useStyles();
    ;

    const h2 = styled.div`
    font-family: "Domine", Georgia, serif;
  `;
   


    return (

        <Formik
            initialValues={{
                
                //link: '',
                city: '',
                country: '',
                address: '',
                state:'',

            }}

            onSubmit={(values, { setSubmitting }) => {
                  
                setSubmitting(false);
            }}
            validationSchema={validationSchema}

        >
            {({ isSubmitting, setFieldValue, errors, touched }) => (
                <Form noValidate autoComplete="off"

                >
                    <Div style={{ margin: '40px', marginTop: '-10px' }}
                    >

                        <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2.5rem',paddingRight:'460px' }}>Tell us where you live.</h2>
                        <p style={{ color: '#475259', fontSize: ' 1.5rem', margin: '5px' }}>Enter your address here.</p>
                        <br />
                        <p style={{ color: "#475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 2.2rem' }}>* indicates a required field</p>
                            
                            <Grid item xs={12} sm={12} lg={6} sx={{marginLeft:'50px'}}>
                            <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Address *</Typography>
                                        <TextField size="small" variant="outlined"  placeholder="e.g. Sanvi" fullWidth 
                                        /> 
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}> City *</Typography>
                                        <TextField size="small" variant="outlined"  placeholder="e.g. Krishna" fullWidth 
                                        />
                                    </Grid>
                                    

                                    </Grid>
                              

                                <br />

                                <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>State *</Typography>
                                        <TextField size="small" variant="outlined"  placeholder="e.g. AP" fullWidth 
                                        
                                        />
                                        </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Typography style={{ color: '#475259', fontWeight: 'bold', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px' }}>Country *</Typography>
                                        <TextField size="small" variant="outlined"  placeholder="e.g. India" fullWidth 
                                        
                                        />
                                     

                                    </Grid>
                                </Grid> 

                                    
                                    
                                </Grid>

                    </Div>
                </Form>
            )}

        </Formik>

    )
}
