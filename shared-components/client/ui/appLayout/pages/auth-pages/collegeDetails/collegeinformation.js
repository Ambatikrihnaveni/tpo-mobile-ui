
import React from 'react';
import {  Grid, TextField, Typography,} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Form, Formik } from "formik";
import * as yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from "@material-ui/core/styles";

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

 
const useStyles = makeStyles({
  textarea: {
    resize: "both"
  }
});



export default function CollegeInformation(params) {
           
  const classes = useStyles();


  return (
        <Formik
            validateOnChange={true}


            validationSchema={validationSchema}
            enableReinitialize

        >{({ }) => (
            <Form>
                    <Div sx={{ p:{xs:2,md:5}}}>
                        <Div sx={{ textAlign: 'center', mb: 4 }}>
                        </Div>
                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> College Name</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="name"
                                    size="small"
                                    disabled ={(params.name == "")? false:true}
                                    value={params.name}
                                    onChange={(e) => {
                                        params.handleNameChange(e);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> College Email</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="email"
                                    disabled
                                    size="small"
                                    value={params.email}
                                    onChange={(e) => {
                                      params.handelEmailChange(e);
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b>Phone Number</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    type='number'
                                    variant="outlined"
                                    name="phone"
                                    size="small"
                                    disabled={(params.phone== "") ?false:true}
                                    value={params.phone}
                                    onChange={(e) => {
                                        params.handelPhoneChange(e);
                                    }}
                                />
                            </Grid>

                          
                        </Grid>

                        <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
                            
                            <Grid item xs={12} sm={6} >
                                <Typography sx={{ padding: '3px 3px' }}><b> Website</b></Typography>
                                <TextField
                                    fullWidth
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="website"
                                    size="small"
                                    label="Enter website"
                                    value={params.website}
                                    onChange={(e) => {
                                       params.handelWebsiteChange(e);
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} style={{marginTop:'-90px'}}>
                                <Typography sx={{ padding: '3px 3px' }}><b>Overview</b></Typography>
                                <TextField
                                    fullWidth
                                    label="Overview"
                                    multiline
                                    variant="outlined"
                                    rows={5}
                                    autoComplete="off"
                                    inputProps={{ className: classes.textarea }}
                                    size="small"
                                    value={params.overview}
                                    onChange={(e) => {
                                       params. handelOverViewChange(e);
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
