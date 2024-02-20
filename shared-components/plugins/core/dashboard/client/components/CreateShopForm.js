import React, { useState } from "react";
import PropTypes from "prop-types";
import SimpleSchema from "simpl-schema";
import TextField from "@material-ui/core/TextField";
import { makeStyles,  } from "@material-ui/core";
import muiOptions from "reacto-form/cjs/muiOptions";
import useReactoForm from "reacto-form/cjs/useReactoForm";
import { Card,Button } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  textField:{
    marginTop:"20px",
    minWidth: 200
  }
}));

/**
 * CreateShopForm
 * @param {Object} props Component props
 * @returns {Node} React component
 */

const formSchema = new SimpleSchema({
  name: {
    type: String,
    min: 3
  },
  users: {
    type: String,
    min: 2
  }
});
const validator = formSchema.getFormValidator();

/**
 * CreateShopForm
 * @param {Object} props Component props
 * @returns {Node} React component
 */
function CreateShopForm(props) {
  const { onSubmit } = props;
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    getFirstErrorMessage,
    getInputProps,
    hasErrors,
    submitForm
  } = useReactoForm({
    async onSubmit(...args) {
      setIsSubmitting(true);
      await onSubmit(...args);
      setIsSubmitting(false);
    },
    validator
  });
  return (
    <div style={{height: '60vh'}}>
      <Card sx={{maxWidth:"450px", textAlign:'center', padding:'20px 30px', m: 'auto'}}>
        <TextField
          className={classes.textField}
          label="Institute name"
          error={hasErrors(["name"])}
          fullWidth
          helperText={getFirstErrorMessage(["name"])}
          {...getInputProps("name", muiOptions)}
        />
        {props.insError &&<div style={{color:"#ef5350",textAlign:"left",fontSize:"13px"}}>{props.insError}</div>}
        <br/>

        <TextField
          className={classes.textField}
          label="Max. Users"
          error={hasErrors(["users"])}
          fullWidth
          sx={{mt:2}}
          type="number"
          helperText={getFirstErrorMessage(["users"])}
          {...getInputProps("users", muiOptions)}
        />
        <br/>       

        <Button
          sx={{mt:3}}
         // disabled={isSubmitting}
          onClick={submitForm}
          variant="contained"
        >
          Create Institute
         {/*  {isSubmitting ? "Creating Institute..." : "Create Institute"} */}
        </Button>
        
      </Card>
    </div>
  );
}
CreateShopForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
export default CreateShopForm;