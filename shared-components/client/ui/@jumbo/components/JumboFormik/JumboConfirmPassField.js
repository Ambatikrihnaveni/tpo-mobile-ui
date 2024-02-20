import React from 'react';
import {useField} from "formik";
import {IconButton} from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//todo: to see how to define prop-types for this component

const JumboConfirmPassField = (props) => {
    
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <>
        <FormControl  variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
           
           {...props}
           {...field}
           helperText={errorText}
           error={!!errorText}
          />
        </FormControl>
        <div style={{color:"#ef5350",textAlign:"left"}}>{errorText}</div>
        </>
    );
};

export default JumboConfirmPassField;