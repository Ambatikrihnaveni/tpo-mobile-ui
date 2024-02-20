import React from 'react';
import { Grid, TextField, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Form, Formik } from "formik";
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete, Checkbox, } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AdminDetails(params) {

 

    return (
        <Formik
            validateOnChange={true}

            validationSchema={validationSchema}
            enableReinitialize

        >{({ }) => (
            <Form>
                <Div sx={{ p: { xs: 2, md: 5 } }}>
                    <Div sx={{ textAlign: 'center', mb: 4 }}>
                    </Div>

                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }} >
                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b>College Admin</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="college admin"
                                size="small"
                                label=" College Admin Name"
                                value={params.collegeAdmin}
                                onChange={(e) => {
                                    params.handelCollegeChange(e);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b> Admin Email</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="admin email"
                                size="small"
                                label=" Admin Email"
                                value={params.adminEmail}
                                onChange={(e) => {
                                    params.handelAdminChange(e);
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b>Designation</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="designation"
                                size="small"
                                label="Admin Designation"
                                value={params.designation}
                                onChange={(e) => {
                                    params.handelDesinChange(e);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b>College Type</b></Typography>
                          
                            <Autocomplete
                                fullWidth
                                size='small'
                                multiple
                                id="checkboxes-tags-demo"
                                limitTags={3}
                                options={params?.field}
                                getOptionLabel={(option) => option}
                                onChange={params.handelSpacalChange}
                                value={params?.specalization}
                               renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                  <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                  />
                                  {option}
                                </li>
                              )}
                        
                                renderInput={(param) => (
                                    <TextField {...param} label="Select College Type" variant="outlined" />
                                )}
                            /> 
                        
                        </Grid>
                    </Grid>


                </Div>
            </Form>

        )}
        </Formik>
    )
}

