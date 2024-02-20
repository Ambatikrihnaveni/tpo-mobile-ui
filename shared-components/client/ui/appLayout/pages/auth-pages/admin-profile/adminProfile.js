
import React from 'react';
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Div from "@jumbo/shared/Div";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { useState } from "react";

const validationSchema = yup.object({
    firstname: yup
        .string('Enter your firstname')
        .required('firstname is required'),

    lastname: yup
        .string('Enter your lastname')
        .required('lastname is required'),

    maxuserscountfields: yup
        .string('Enter Maximum users count')
        .required('Maximum users count is required'),

    company: yup
        .string('Enter your Company name')
        .required('Company name is required')
});

const Editprofile = ({ disableSmLogin }) => {
    const { setAuthToken, refetchViewer } = useJumboAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");


    const adminProfile = (firstname, lastname, company, maxuserscountfields) => {
        ;
        /*  authServices.signIn({ firstname, lastname,  company, maxuserscountfields })
             .then((data) => {
                 setAuthToken(data?.tokens?.accessToken);
             }); */
    }



    return (
        <Div
            sx={{
                width: 500,
                maxWidth: "100%",
                margin: "auto",
                p: 4
            }}
        >
            <Typography>
                <Link color={"black"} underline={"none"} fontStyle={"serif"} fontSize={20} fontWeight={500}>
                    Complete Your Profile                  </Link>
            </Typography>
            <Formik
                validateOnChange={true}
                initialValues={{
                    firstname: '',
                    lastname: '',
                    username: '',
                    email: '',
                    phonenumber: '',
                    company: '',
                    maxuserscountfields: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);
                    adminProfile(data.firstname, data.lastname, data.company, data.maxuserscountfields);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form style={{ textAlign: 'left' }} noValidate autoComplete='off'>
                        <div sx={{ display: 'flex' }}>
                            <Div sx={{ mt: 1, mb: 2 }}>
                                <JumboTextField
                                    fullWidth
                                    name="firstname"
                                    label="First Name"
                                    type="text"
                                />
                            </Div>
                            <Div sx={{ mt: 1, mb: 2 }}>
                                <JumboTextField
                                    fullWidth
                                    name="lastname"
                                    label="Last Name"
                                    type="text"
                                />
                            </Div>
                        </div>
                        <div sx={{ display: 'flex' }}>

                            <Div sx={{ mt: 1, mb: 3 }}>
                                <JumboTextField
                                    fullWidth
                                    name="username"
                                    label="Username"
                                />
                            </Div>
                            <Div sx={{ mt: 1, mb: 3 }}>
                                <JumboTextField
                                    fullWidth
                                    name="email"
                                    label="Email"
                                />
                            </Div>
                        </div>
                        <Div sx={{ mt: 1, mb: 2 }}>
                            <JumboTextField
                                fullWidth
                                type="number"
                                name="phonenumber"
                                label="Phone Number"
                                sx={{'& input[type=number]': {
                                    '-moz-appearance': 'textfield'
                                },
                                '& input[type=number]::-webkit-outer-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                },
                                '& input[type=number]::-webkit-inner-spin-button': {
                                    '-webkit-appearance': 'none',
                                    margin: 0
                                }}}
                            />
                        </Div>

                        <Div sx={{ mt: 1, mb: 2 }}>
                            <JumboTextField
                                fullWidth
                                name="company"
                                label="Company Name"
                                type="text"
                            />
                        </Div>
                        <Div sx={{ mt: 1, mb: 2 }}>
                            <JumboTextField
                                fullWidth
                                name="maxuserscountfields"
                                label="Maximum Users Count"
                                type="text"
                            />
                        </Div>
                        <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mb: 3 }}
                            loading={isSubmitting}
                        >Save</LoadingButton>

                    </Form>
                )}
            </Formik>
        </Div>
    );
};
export default Editprofile;
