import React, { useState } from 'react';
import { Card, Button, Grid, TextField, Typography, Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Div from "@jumbo/shared/Div";
import swal from 'sweetalert';
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
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


export default function BankDetails(bankData) {

    const { accountName, bankName, ifscCode, accountNumber, branch, handleAccountNameChange, handleAccountNumber, hanl
        , handleBranchChange, handleIfscCodeChange ,handleBankNameChange} = bankData
    return (
        <>
            <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', paddingLeft: '50px' }}>Add your Bank Details</h2>
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
                    <Div sx={{ p: { xs: 2, md: 5 } }}>


                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Account Name</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="college admin"
                                    size="small"
                                    label=" Enter Name "
                                    value={accountName}
                                    onChange={handleAccountNameChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}  >
                                <Typography sx={{ padding: '3px 3px' }}><b> Bank Name</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="admin email"
                                    size="small"
                                    label=" Enter Bank Name"
                                    value={bankName}
                                    onChange={handleBankNameChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Account Number</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="designation"
                                    size="small"
                                    label="Enter Account Number"
                                    value={accountNumber}
                                    onChange={handleAccountNumber}

                                />
                            </Grid>

                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>IFSC Code</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    name="spacalization"
                                    label="Enter IFSC Code"
                                    value={ifscCode}
                                    onChange={handleIfscCodeChange}

                                />
                            </Grid>
                            <Grid item xs={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Branch</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    name="spacalization"
                                    label="Enter Bank Branch"
                                    value={branch}
                                    onChange={handleBranchChange}

                                />
                            </Grid>
                        </Grid>


                    </Div>
                </Form>

            )}
            </Formik> </>
    )
}

