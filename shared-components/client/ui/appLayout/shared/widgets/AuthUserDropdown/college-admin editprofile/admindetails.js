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
import { Autocomplete, Checkbox, } from '@mui/material';
import { FormControlLabel, ListItemText } from '@mui/material';
import useAuth from "/imports/client/ui/hooks/useAuth";
import ProfileMediaGallery from '../profileMediaGallery';
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



const initialField = [
    'Engineering',
    'Pharmacy',
    'Degree',
    'Diploma',
    'Intermediate',
    'Nursing',
    'ITI',
    'PG',
    'Other'
  ];
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function AdminDetails(params) {

    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = React.useState(viewer);
    const uploadedImage = React.useRef(null);

    const handleImageUpload = React.useCallback((e) => {

        const [file] = e.target.files;
        if (file) {

            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);

            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }, []);


    React.useEffect(() => {
        if (viewer) {
            setUser(viewer);
        }
    }, [viewer]);

    return (
        <Formik
            validateOnChange={true}

            validationSchema={validationSchema}
            //   onSubmit={onInvit}
            enableReinitialize

        >{({ }) => (
            <Form>
                <Div sx={{ p: { xs: 2, md: 5 } }}>

                    <h2 style={{ width: '100%', color: '#=2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Add your details here.</h2>
             


                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }} >
                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b>College Admin*</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="college admin"
                                size="small"
                                placeholder='e.g. John'
                                value={params.collegeAdmin}
                                onChange={(e) => {
                                    params.handelCollegeChange(e);
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <Typography sx={{ padding: '3px 3px' }}><b> Admin Email*</b></Typography>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                variant="outlined"
                                name="admin email"
                                size="small"
                                placeholder='e.g. john @exapmple.com'
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
                                options={initialField}
                                getOptionLabel={(option) => option}
                                onChange={params.handelSpacalChange}
                               defaultValue={params?.selectedFields? params?.selectedFields:[]} 
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

