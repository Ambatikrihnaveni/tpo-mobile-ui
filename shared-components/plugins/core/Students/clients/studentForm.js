import React, { useState } from 'react';
import * as yup from "yup";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Div from "@jumbo/shared/Div";
import { Grid, } from '@material-ui/core'
import { FormControl, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const editStudentMutation = gql`
    mutation editStudent($input: EditStudentProfileInput!) {
        editStudent(input: $input)
    }
`
const validationSchema = yup.object({
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});
const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    picture: "",
    qualification: "",
    status: "",
    year: ""
};

const StudentForm = ({ record, onSave }) => {
    const [editStudent] = useMutation(editStudentMutation, { ignoreResults: true });

    const [selectedYear, setSelectedYear] = useState("");
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false);
    const yearOptions = [];

    // Add years to the dropdown from 1900 to the current year
    const currentYear = new Date().getFullYear();
    for (let year = 2010; year <= currentYear; year++) {
        yearOptions.push(
            <option key={year} >
                {year}
            </option>
        );
    }
    const userId = record.userId
    const updateProfile = (email, address, name, phoneNumber, qualification, year, status) => {
        editStudent({
            variables: {
                input: {
                    userId,
                    qualification,
                    status,
                    year,
                    email,
                    address,
                    name,
                    phoneNumber,

                }
            }
        }).then((data) => {
            onSave();
        }).catch((err) => {
            setError(err)
        })
    }
    const onContactSave = (data, { setSubmitting }) => {
        setSubmitting(true);
        updateProfile(data.email, data.address, data.name, data.phoneNumber, data.qualification, data.year, data.status);
        setSubmitting(false);
    };
    return (
        <Formik
            validateOnChange={true}
            initialValues={record?.id ? record : initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={onContactSave}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form noValidate autoComplete="off">
                    <Div
                        sx={{
                            '& .MuiTextField-root': {
                                mb: 3
                            },
                        }}
                    >
                        <JumboAvatarField
                            name={"profile_pic"}
                            alt={"user profile pic"}
                            onFileSelection={(file) => setFieldValue("profile_pic", file)}
                            sx={{ width: 60, height: 60, margin: '0 auto 24px' }}
                        />

                        <Grid container spacing={1}>
                            <Grid item xs={6}>

                                <JumboTextField fullWidth size="small" variant="outlined" name="name" label="Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <JumboTextField fullWidth size="small" variant="outlined" name="email" label="Email" />
                            </Grid>
                            <Grid item xs={6}>
                                <JumboTextField fullWidth size="small" variant="outlined"
                                    name="phoneNumber"
                                    type="number"
                                    label="Phone Number"
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
                            <Grid item xs={6}>
                                <JumboTextField fullWidth size="small" variant="outlined" name="address" label="Address" />
                            </Grid>
                        </Grid>
                        <Div sx={{ mt: 3, mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple1-select-label">Qualification</InputLabel>

                                <JumboSelectField
                                    fullWidth
                                    labelId="demo-simple1-select-label"
                                    id="demo-simple1-select"
                                    name="qualification"
                                    label="Qualification"
                                    size="small"
                                >

                                    <MenuItem value="MTECH">MTECH</MenuItem>
                                    <MenuItem value="BTECH">BTECH</MenuItem>
                                    <MenuItem value="PG">PG</MenuItem>
                                </JumboSelectField>
                            </FormControl>
                        </Div>
                        <Div sx={{ mt: 3, mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="year-dropdown">Passed out year/Expected year</InputLabel>
                                {/*  <JumboSelectField id="year-dropdown" value={selectedYear} onChange={handleSelectYear}
                               name= "year"
                               > */}
                                <JumboSelectField
                                    fullWidth
                                    labelId="demo-simple1-select-label"
                                    id="demo-simple1-select"
                                    name="year"
                                    label="Passed out year/ Expected year"
                                    size="small"
                                    value={selectedYear}
                                >
                                    {yearOptions.map(year => (
                                        <MenuItem value={year.key}>{year.key}</MenuItem>
                                    ))}
                                </JumboSelectField>
                            </FormControl>
                        </Div>
                        <Div sx={{ mt: 3, mb: 3 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple1-select-label">Status</InputLabel>

                                <JumboSelectField
                                    fullWidth
                                    labelId="demo-simple1-select-label"
                                    id="demo-simple1-select"
                                    name="status"
                                    label="status"
                                    size="small"
                                    value={status}
                                >

                                    <MenuItem value="completed">Completed</MenuItem>
                                    <MenuItem value="parsuing">Parsuing</MenuItem>
                                </JumboSelectField>
                            </FormControl>

                        </Div>
                        <LoadingButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ mb: 3 }}
                            loading={isSubmitting}
                        >Save</LoadingButton>
                    </Div>
                </Form>
            )}
        </Formik>
    );
};
StudentForm.defaultProps = {
    onSave: () => {
    }
};
export default StudentForm;
