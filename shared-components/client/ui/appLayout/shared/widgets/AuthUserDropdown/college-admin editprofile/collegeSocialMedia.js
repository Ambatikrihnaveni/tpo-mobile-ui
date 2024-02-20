import { Grid, Typography,  } from '@material-ui/core';
import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Select, MenuItem,Button } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Formik } from "formik";
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

export default function ColalgeSocialMedia(mediaData) {
  const {account,link,addAccount,addLink}=mediaData

  
  return (
    <Formik
      
      validationSchema={validationSchema}
      
    >
      {({  handleSubmit }) => (
        <form  noValidate autoComplete="off">
          <Div style={{ margin: '50px', marginTop: '-10px' }}>
            <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '5px', fontWeight: '700', fontSize: '2rem' }}>Add your social medial links here</h2>
            <br />
                <div>
                      <Div>
                        {mediaData.mediaList.map((mediaList, index) => (

                        <Grid container spacing={1} style={{ marginLeft: '2px' }}    key={index} >
                          <Grid item xs={1.5}></Grid>
                          <Grid item xs={2.5}>                            
                          <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Account *</Typography>
                            
                            <FormControl sx={{ minWidth: 220, }} size="small">
                              <Select
                                placeholder="e.g. Youtube"
                                labelId="demo-simple-select-autowidth-label"
                                 id="demo-simple-select-autowidth"
                                 value={mediaList.account}
                                 onChange={e => addAccount(e, index)}        
                              >
                                <MenuItem value="" disabled>
                                  <em>None</em>
                                </MenuItem >
                                <MenuItem value='LinkedIn' disabled={mediaData.mediaList.some(item => item.account === 'LinkedIn' && item !== mediaList)}>
                                  LinkedIn
                                </MenuItem >
                                <MenuItem value='Instagram' disabled={mediaData.mediaList.some(item => item.account === 'Instagram' && item !== mediaList)}>
                                  Instagram
                                </MenuItem>
                                <MenuItem value='GitHub' disabled={mediaData.mediaList.some(item => item.account === 'GitHub' && item !== mediaList)}>
                                  GitHub
                                </MenuItem>
                                <MenuItem value='Facebook' disabled={mediaData.mediaList.some(item => item.account === 'Facebook' && item !== mediaList)}>
                                Facebook
                                </MenuItem>
                                <MenuItem value='Pinterese' disabled={mediaData.mediaList.some(item => item.account === 'Pinterese' && item !== mediaList)}>
                                Pinterest
                                </MenuItem>
                                <MenuItem value='Youtube' disabled={mediaData.mediaList.some(item => item.account === 'Youtube' && item !== mediaList)}>
                                Youtube
                                </MenuItem>
                              </Select>
                            </FormControl>
                            
                            
                          </Grid>
                          <Grid item xs={6}>
                          <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Link/URL *</Typography>
                            <TextField
                              size="small"
                              variant="outlined"
                              value={mediaList.link}
                              onChange={e => addLink(e, index)}        
                              placeholder="e.g. www.google.com"
                              fullWidth
                            />
                            
                          </Grid>
                          <Grid item xs={1}>
                           {mediaData.mediaList.length > 1 && (
                           <DeleteOutlineOutlinedIcon style={{color:'#f24b64',marginTop:'40px',fontSize:'25px'}} onClick={() => mediaData.handleDeleteMedia(index)}/>
                           )}
                           </Grid>
                        </Grid>
                         ))}
                      </Div>
                               

                  <Button variant="text" style={{paddingLeft:'1%'}} onClick={mediaData.handleAddMedia}>+ Add new</Button>
                </div>
          </Div>
        </form>
      )}
    </Formik>
  );
};
