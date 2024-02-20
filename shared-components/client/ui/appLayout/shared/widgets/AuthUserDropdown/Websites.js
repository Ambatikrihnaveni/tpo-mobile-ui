import React, { useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Div from '@jumbo/shared/Div';
import { Form, Formik } from 'formik';
import TextField from '@mui/material/TextField';
import { Card, CardContent, InputLabel, Select, FormControl, Menu, } from '@mui/material';
import { Grid, Typography,Snackbar, Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { FaRegLightbulb } from "react-icons/fa";

export default function Websites({websiteList,handleAddWebsite,handleCheck, addWebsite,handleCloseWebsiteDialog}) {
    const [inputs, setInputs] = useState([
        { link: '', addToHeader: false },
        { link: '', addToHeader: false },
        { link: '', addToHeader: false }
    ]);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSave = () => {

        setOpenSnackbar(true);

        setTimeout(() => {
            handleCloseWebsiteDialog();
          }, 500);
            };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // Close the Snackbar
        setOpenSnackbar(false);
    };
    const handleChange = (e, index, field) => {
        const updatedInputs = [...inputs];
        updatedInputs[index][field] = e.target.value;
        setInputs(updatedInputs);
    };

    const handleCheckboxChange = (e, index) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].addToHeader = e.target.checked;
        setInputs(updatedInputs);
    };

    return (
        <Formik>
            <Form>
                <Div style={{ margin: {sm:'50px',xs:'0'} }}>
                    <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2.5rem' }}>Websites, Portfolios, Profiles</h2>
                    <Accordion style={{ marginTop: '15px', width: '100%' }}>
                        <Card style={{ backgroundColor: '#faecd0', border: ' 3px solid #efc778', boxShadow: '1px 2px 9px #efc778', marginTop: '15px', display: 'flex' }}>
                            <Typography variant='h3' style={{ color: '#2e475D', fontSize: '1rem', display: 'flex', padding: '10px 2px 1px 4px' }}><FaRegLightbulb style={{ paddingRight: '2px' }} />ProTip</Typography>
                            <Typography style={{ color: '#2e475D', fontSize: '0.9rem', padding: '10px 1px 6px 12px' }}>
                                We recommend adding social networks like Linkedin to your header, to help employers get to know you better.
                            </Typography>
                        </Card>
                    </Accordion>
                    <br />
                    <Grid container spacing={1}>
                    {websiteList?.map((x, index) => (
                            <Grid item xs={12} key={index} container alignItems="center" style={{marginLeft:{sm:'100px',xs:'0'}}}>
                                    <Typography style={{ color: '#2e475D', fontFamily: '"Nunito", sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold' }}>Link/URL</Typography>
                                    <TextField
                                        style={{ width: '50%' }}
                                        size="small"
                                        variant="outlined"
                                        name="link"
                                        placeholder="www.linkedin/yourprofile/"
                                        fullWidth
                                        value={x?.website}
                                        onChange={e => addWebsite(e, index)}
                                    />

                                

                            </Grid>

                        ))}

                    </Grid>
                    <Button variant="text" onClick={handleAddWebsite}>+ Add Link</Button>


                    <Button variant="contained" style={{float:'right',marginTop:'20%'}} onClick={handleSave}>Save</Button>
                    <Snackbar
                    open={openSnackbar}
                    autoHideDuration={500}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success" sx={{
            backgroundColor: '#4CAF50', 
            color: 'white',  '& .MuiSvgIcon-root': { color: 'white' },          
        }}>
                        Save Successfully
                    </Alert>
                </Snackbar>
                </Div>
            </Form>
        </Formik>
    );
}
