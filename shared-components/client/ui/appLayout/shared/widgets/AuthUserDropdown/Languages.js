import {  Grid, Typography, Button,Snackbar, Alert  } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Div from "@jumbo/shared/Div";



const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

function Languages({languagesList,handleCheck,handleAddLanguages, addLanguage, addLevel,handleDeleteLanguage,handleCloseLanguagesDialog}) {
  
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleSave = () => {

        setOpenSnackbar(true);

        setTimeout(() => {
          handleCloseLanguagesDialog();
          }, 500);
            };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // Close the Snackbar
        setOpenSnackbar(false);
    };
  

  return (
    <div style={{ margin: {sm:'30px 80px',xs:'0'} }}>
      <Typography variant="h2" style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Languages</Typography>
      <Typography style={{ color: '#475259', fontSize: '1.2rem', margin: '5px', paddingBottom: "20px" }}>Include your native language and additional languages you speak</Typography>
      <div style={{ padding: '20px 40px', backgroundColor: 'rgb(243, 246, 251)' }}>
        <FormControlLabel
          control={<Android12Switch defaultChecked />}
          label="Language levels"
        />
      </div>
      <Div>
        
      {languagesList?.map((lang, index) => (
              <Grid container style={{ paddingTop: '15px' }} key={index}>
          <React.Fragment >
            <Grid xs={6} sm={5}>
              <Typography style={{ paddingLeft: '10px' }}>Language</Typography>
              <FormControl sx={{ m: 1, minWidth: 120,  }} size="small">
                <Select
                  labelId={`language-select-label-${index}`}
                  id={`language-select-${index}`}
                  value={lang?.language}
                  onChange={e => addLanguage(e, index)}
                  style={{ width: {sm:'250px',xs:'90px'} }}
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value={'English'}>English</MenuItem>
                  <MenuItem value={'Telugu'}>Telugu</MenuItem>
                  <MenuItem value={'Hindi'}>Hindi</MenuItem>
                  <MenuItem value={'Tamil'}>Tamil</MenuItem>
                  <MenuItem value={'Kannada'}>Kannada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={8} sm={6}>
              <Typography style={{ paddingLeft: '10px' }}>Level</Typography>
              <FormControl sx={{ m: 1, minWidth: 120, }} size="small">
                <Select
                  labelId={`level-select-label-${index}`}
                  id={`level-select-${index}`}
                  value={lang?.level}
                  onChange={e => addLevel(e, index)}
                  style={{ width: {sm:'250px',xs:'90px'}  }}
                >
                  <MenuItem value="">
                  </MenuItem>
                  <MenuItem value={'Proficient'}>Proficient</MenuItem>
                  <MenuItem value={'Advanced'}>Advanced</MenuItem>
                  <MenuItem value={'Upper Intermediate'}>Upper Intermediate</MenuItem>
                  <MenuItem value={'Intermediate'}>Intermediate</MenuItem>
                  <MenuItem value={'Elementary'}>Elementary</MenuItem>
                  <MenuItem value={'Beginner'}>Beginner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={1} sm={1}>
            {languagesList.length !== 1 && 
            <Button variant="text" onClick={() => handleDeleteLanguage(index)} style={{color:'#f55d6f'}}>
              <DeleteIcon />
            </Button>}</Grid>
            <br/>
          </React.Fragment>
       </Grid>  ))}
      </Div>
      
      
    <Button variant="text" style={{ padding: '15px 1px', }} onClick={handleAddLanguages}> <AddIcon style={{fontSize:'20px' }} />Add new language</Button>
      <br/>
      <Button variant="contained" style={{float:'right',marginTop:'2%'}} onClick={handleSave}>Save</Button>
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
    </div>
  );
}

export default Languages;
