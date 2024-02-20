import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, Select, MenuItem } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { Formik,  } from "formik";
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

export default function SocialMedia({ handleChange, handleAddMedia, handleDeleteMedia, media,handleSubmitMedia }) {
  

  
  return (
    <Formik
      
      validationSchema={validationSchema}
      
    >
      {({  handleSubmit }) => (
        <form  noValidate autoComplete="off">
          <Div style={{ margin: {xs:'5px',sm:'20px 50px'}, marginTop: '-10px' }}>
            <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '5px', fontWeight: '700', fontSize: '2rem',marginRight:'100px' }}>Add your Social Media links here</h2>
          
                <div>
                {media.map((list, i) => {
                  return (
                      <Div key={i}>

                        <Grid container spacing={1} style={{ marginLeft: '2px' }}>
                          <Grid item xs={10} sm={2} lg={2} md={3}>                            
                          <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Account *</Typography>
                            
                            <FormControl sx={{ minWidth: 220, }} size="small">
                              <Select
                              name="account"  value={list.account} onChange={e => handleChange(e, i, 'account')}
                                placeholder="e.g. Youtube"
                                fullWidth
                                labelId="demo-simple-select-autowidth-label"
                                 id="demo-simple-select-autowidth"
                                        
                              >
                                <MenuItem value="" disabled>
                                  <em>None</em>
                                </MenuItem >
                                <MenuItem value='LinkedIn' disabled={media.some(item => item.account === 'LinkedIn' && item !== i)}>
                                  LinkedIn
                                </MenuItem >
                                <MenuItem value='Instagram' disabled={media.some(item => item.account === 'Instagram' && item !== i)}>
                                  Instagram
                                </MenuItem>
                                <MenuItem value='GitHub' disabled={media.some(item => item.account === 'GitHub' && item !== i)}>
                                  GitHub
                                </MenuItem>
                                <MenuItem value='Facebook' disabled={media.some(item => item.account === 'Facebook' && item !== i)} >
                                Facebook
                                </MenuItem>
                                <MenuItem value='Pinterese' disabled={media.some(item => item.account === 'Pinterese' && item !== i)}>
                                Pinterest
                                </MenuItem>
                                <MenuItem value='Youtube' disabled={media.some(item => item.account === 'Youtube' && item !== i)}>
                                Youtube
                                </MenuItem>
                              </Select>
                            </FormControl>
                            
                            
                          </Grid>
                          <Grid item xs={10} sm={4} lg={3} md={6} style={{ marginLeft: '10px' }}>
                          <Typography style={{ color: '#2e475D', fontFamily: '"Nunito",sans-serif', fontSize: 'smaller', marginBottom: '10px', fontWeight: 'bold', }}>Link/URL *</Typography>
                            <TextField
                              size="small"
                              variant="outlined"
                              name="link" value={list.link} onChange={e => handleChange(e, i, 'link')}      
                              placeholder="e.g. www.google.com"
                              fullWidth
                            />
                            
                          </Grid>
                          <Grid item xs={1} sm={1} lg={1} md={1}>
                            {media.length !== 1 &&
                              <Button style={{color:'#f24b64',marginTop:'30px'}} onClick={() => handleDeleteMedia(i)}><DeleteOutlineOutlinedIcon /></Button>}
                          </Grid>
                        
                        </Grid>
                         
                      </Div>
                      )
                    })}
                               

                  <Button variant="text" style={{paddingLeft:'1%'}} onClick={handleAddMedia}>+ Add new</Button>
                </div>
          </Div>
        </form>
      )}
    </Formik>
  );
};
