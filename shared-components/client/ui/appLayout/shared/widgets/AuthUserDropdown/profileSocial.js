import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Select, MenuItem } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Formik, FieldArray } from "formik";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


import * as yup from "yup";

const validationSchema = yup.object({
  socialLinks: yup.array().of(
    yup.object({
      link: yup.string().required('Link/URL is required'),
      account: yup.string().required('Account is required')
    })
  )
});

export default function ProfileSocial( {addLink, addAccount, mediaList,handleAddMedia,handleDeleteMedia}) {
  

  
  return (
    <Formik
      
      validationSchema={validationSchema}
      
    >
      {({  handleSubmit }) => (
        <form  noValidate autoComplete="off">
          <Div style={{ margin: '10px', }}>
            <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '5px', fontWeight: '700', fontSize: '2rem',marginRight:'100px' }}>Add your social medial links here</h2>
           {/*  <br />
            <p style={{ color: "#475259", fontWeight: '700', fontSize: '0.8rem', margin: '0 0 1.5rem' }}>* indicates a required field</p> */}
                <div>
                      <Div>
                        {mediaList?.map((x, index) => (

                        <Grid container spacing={1} style={{ marginLeft: '2px' }}    key={index} >
                          <Grid item xs={1.5}></Grid>
                          <Grid item xs={2.5}>                            
                          <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Account *</Typography>
                            
                            <FormControl sx={{ minWidth: 220, }} size="small">
                              <Select
                                placeholder="e.g. Youtube"
                                labelId="demo-simple-select-autowidth-label"
                                 id="demo-simple-select-autowidth"
                                 value={x?.account }
                                 onChange={e => addAccount(e, index)}        
                              >
                                <MenuItem value="" disabled>
                                  <em>None</em>
                                </MenuItem >
                                <MenuItem value='LinkedIn' disabled={mediaList.some(item => item.account === 'LinkedIn' && item !== x)}>
                                  LinkedIn
                                </MenuItem >
                                <MenuItem value='Instagram' disabled={mediaList.some(item => item.account === 'Instagram' && item !== x)}>
                                  Instagram
                                </MenuItem>
                                <MenuItem value='GitHub' disabled={mediaList.some(item => item.account === 'GitHub' && item !== x)}>
                                  GitHub
                                </MenuItem>
                                <MenuItem value='Facebook' disabled={mediaList.some(item => item.account === 'Facebook' && item !== x)}>
                                Facebook
                                </MenuItem>
                                <MenuItem value='Pinterese' disabled={mediaList.some(item => item.account === 'Pinterese' && item !== x)}>
                                Pinterest
                                </MenuItem>
                                <MenuItem value='Youtube' disabled={mediaList.some(item => item.account === 'Youtube' && item !== x)}>
                                Youtube
                                </MenuItem>
                              </Select>
                            </FormControl>
                            
                            
                          </Grid>
                          <Grid item xs={5}>
                          <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Link/URL *</Typography>
                            <TextField
                              size="small"
                              variant="outlined"
                              value={x?.link}
                              onChange={e => addLink(e, index)}        
                              placeholder="e.g. www.google.com"
                              fullWidth
                            />
                            
                          </Grid>
                          <Grid item xs={1}>
                           {mediaList.length > 1 && (
                           <DeleteOutlineOutlinedIcon style={{color:'#f24b64',marginTop:'30px'}} onClick={() => handleDeleteMedia(index)}/>
                           )}
                           </Grid>
                        </Grid>
                         ))}
                      </Div>
                               

                  <Button variant="text" style={{paddingLeft:'1%'}} onClick={handleAddMedia}>+ Add new</Button>
                </div>
          </Div>
        </form>
      )}
    </Formik>
  );
};
