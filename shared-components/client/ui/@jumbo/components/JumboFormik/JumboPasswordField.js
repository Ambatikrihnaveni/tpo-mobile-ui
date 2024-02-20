import React from 'react';
import {useField} from "formik";
import {IconButton,FormHelperText,FormControlLabel} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

//todo: to see how to define prop-types for this component

const JumboPasswordField = (props) => {
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <>
        <FormControl  variant="outlined" fullWidth sx={{color:(errorText!="")? '#E73145':''}}>
          <InputLabel htmlFor="outlined-adornment-password" sx={{color:(errorText!="")? '#E73145':''}}>Password</InputLabel>
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
           error={!!errorText}
          />
          <FormHelperText id="my-helper-text" sx={{color:'#E73145'}}>{errorText}</FormHelperText>
        </FormControl>
        </>
    );
};

export default JumboPasswordField;