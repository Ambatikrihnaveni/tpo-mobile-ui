import React from 'react';
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

export default function CollegeAddress(params) {

    return (
        <Formik
            validateOnChange={true}
            initialValues={{
                addres: '',
                city: '',
                state: '',
                country: '',

            }}

            validationSchema={validationSchema}
            enableReinitialize

        >{({ }) => (
            <Form>
                <Div sx={{ p: { xs: 2, md: 5 } }}>
                    <Div sx={{ textAlign: 'center', mb: 4 }}>
                    </Div>

                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }} >
                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b>Address</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="college admin"
                                size="small"
                                label=" Enter Addres "
                                value={params.address}
                                onChange={(e) => {
                                    params.handelAddresChange(e);
                                }}
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
                                value={params.city}
                                onChange={(e) => {
                                    params.handelCityChange(e);
                                }}
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
                                value={params.state}
                                onChange={(e) => {
                                    params.handelStateChange(e);
                                }}
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
                                value={params.country}
                                onChange={(e) => {
                                    params.handelCountryChange(e);
                                }}
                            />
                        </Grid>
                    </Grid>


                </Div>
            </Form>

        )}
        </Formik>
    )
}

