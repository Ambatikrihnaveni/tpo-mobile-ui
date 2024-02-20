import React, { useState } from 'react';
import { Grid, TextField, Typography, } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Form, Formik } from "formik";
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const validationSchema = yup.object({
    email: yup
        .string("Enter your email")
        .email("Enter a valid email")
        .required("Email is required"),
    name: yup.string("enter your name").required('Batch Name is required'),

});


export default function Address(addressData) {

const {address,city,country,state,addAddress,addCity,addCountry,addState}=addressData
  return (
    <>
    <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', paddingLeft:'50px' }}>Add your Institute Address</h2>
                   
    <Formik
    validateOnChange={true}
    initialValues={{
        addres: '',
        city: '',
        state: '',
        country: '',
      
    }}

    validationSchema={validationSchema}
    //   onSubmit={onInvit}
    enableReinitialize

>{({ }) => (
    <Form>
            <Div sx={{ p:{xs:2,md:5}}}>
                
            
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                    <Grid item xs={12} sm={6} >
                        <Typography sx={{ padding: '3px 3px' }}><b>Address</b></Typography>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            name="college admin"
                            size="small"
                            label=" Enter Address "
                            value={address}
                            onChange={addAddress}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}  >
                        <Typography sx={{ padding: '3px 3px' }}><b> City</b></Typography>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            name="admin email"
                            size="small"
                            label=" Enter City Name"
                            value={city}
                            onChange={addCity}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                    <Grid item xs={6} >
                        <Typography sx={{ padding: '3px 3px' }}><b>State</b></Typography>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            name="designation"
                            size="small"
                            label="Enter State Name"
                            value={state}
                            onChange={addState}
                           
                        />
                    </Grid>

                    <Grid item xs={6} >
                        <Typography sx={{ padding: '3px 3px' }}><b>Country</b></Typography>
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            size="small"
                            name="spacalization"
                            label="Enter Country Name"
                            value={country}
                            onChange={addCountry}
                           
                        />
                    </Grid>
                </Grid>


            </Div>
    </Form>

)}
</Formik> </>
)
}

