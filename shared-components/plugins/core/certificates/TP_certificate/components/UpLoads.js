import React from 'react'
import Div from "@jumbo/shared/Div";
import { Grid, Select, TextField, Typography, MenuItem, Button, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const menus = ["Director", 'Tutor', 'CEO']
export default function UpLoads({ logo, uploadLogo, uploadSign, authority, onRowAdd, handleChange, onRowDelete,onNameChange }) {
 


  return (
    <Div sx={{ margin: 'auto' }}>
      <Typography variant='h3' sx={{ mt: 2,ml:7}}><b>Upload institute logo</b></Typography>
      <Grid container spacing={3} sx={{ mt: 1, border: '1px solid #7a125f', borderRadius: '15px', p: 2 ,margin:"auto",width:'90%'}}>

        <Grid item xs={12} sm={6} md={6} sx={{ margin: 'auto', display: 'flex' }} >

          <input type="file" name='upload logo' onChange={(e) => uploadLogo(e.target.files[0] || null)} style={{ display: 'block'}} />

        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ margin: 'auto' }}>
          <Div><img src={logo} width='80px' /></Div>
        </Grid>
      </Grid>
      <Typography variant='h3' sx={{ mt: 6 ,ml:7}}> <b>Upload Signatures</b></Typography>
      {authority?.map((authorityData, i) => (
        <Grid container spacing={3} sx={{ mt: 2, border: '1px solid #7a125f', borderRadius: '15px', p: 2 ,margin:"auto",width:'90%',marginBottom:'20px'}} key={i} >
          <Grid item xs={12} sm={4} md={3} sx={{ margin: 'auto' }}>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={authorityData?.designation}
                label="Select designation"
                onChange={(e) => handleChange(e, i)}>
                {menus.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} md={3} sx={{ margin: 'auto' }} >
            <TextField
            id="outlined-basic"
            label="Ente Name"
            variant="outlined" 
            fullWidth
            value={authorityData?.name}
            onChange={(e)=>onNameChange(e,i)}
            />

            
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ margin: 'auto', display: 'flex' }}>
            <input type="file"  onChange={(e) => uploadSign((e.target.files[0] || null), i)} style={{ display: 'block' }} />
            <Div><img src={authorityData?.sign ? authorityData?.sign : '/certificateTemplates/signature.png'} width='80px' /></Div>
          </Grid>
          <Grid item xs={12} sm={2} sx={{ margin: 'auto' }}>
            <Button variant='contained' sx={{ textTransform: 'none' }} disabled={authority.length > 2} onClick={onRowAdd}> Add</Button>
            {
              authority?.length >1 &&
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 2 }}
              onClick={onRowDelete}
            >
              <CloseIcon />
            </IconButton>
            }
           
          </Grid>
        </Grid>
      ))}


    </Div>
  )
}
