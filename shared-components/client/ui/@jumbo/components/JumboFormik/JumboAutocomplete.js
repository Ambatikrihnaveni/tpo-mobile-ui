import * as React from 'react';
//import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {useField} from "formik";
import { Autocomplete } from 'material-ui-formik-components/Autocomplete'
import { fieldToTextField } from 'formik-material-ui'

export default function JumboAutocomplete({ textFieldProps, ...props }) {
  
    const {
        form: { setTouched, setFieldValue }
      } = props
      const { error, helperText, ...field } = fieldToTextField(props)
      const { name } = field
    
      return (
        <Autocomplete
          {...props}
          {...field}
          onChange={(_, value) => setFieldValue(name, value)}
          onBlur={() => setTouched({ [name]: true })}
          getOptionSelected={(item, current) => item.value === current.value}
          renderInput={props => (
            <TextField
              {...props}
              {...textFieldProps}
              helperText={helperText}
              error={error}
            />
          )}
        />
      )
    }

