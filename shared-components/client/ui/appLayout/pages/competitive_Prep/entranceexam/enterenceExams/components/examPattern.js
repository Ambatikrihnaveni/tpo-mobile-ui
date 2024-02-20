import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Div from "../../../../../../@jumbo/shared/Div";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ExamPattern(params) {
    const {
        handleAddField,
        handleCancelField,
        setInputFields,
        inputFields
    } = params
    
  return (
    <Grid>
      <Div sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 29, fontWeight: "bold" }}>Exam Pattern</Typography>
        <Typography sx={{ mb: 1, mt: 2 }}>Add Exam Structure Here</Typography>
      </Div>
      {inputFields.map((field, index) => (
        <Div key={index} sx={{ display: "flex" ,mt:3,mb:3}}>
          <TextField
            fullWidth
            label="Subject"
            value={field.subjectName}
            onChange={(e) => {
              const updatedFields = [...inputFields];
              updatedFields[index].subjectName = e.target.value;
              setInputFields(updatedFields);
            }}
          />
          &nbsp;&nbsp;
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="No of Questions"
            type="number"
            value={field.numberOfQuestions}
            onChange={(e) => {
              const updatedFields = [...inputFields];
              updatedFields[index].numberOfQuestions = parseInt(e.target.value);
              setInputFields(updatedFields);
            }}
          />
          &nbsp;&nbsp;
          <TextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Marks"
            type="number"
            value={field.marksPerSubject}
            onChange={(e) => {
              const updatedFields = [...inputFields];
              updatedFields[index].marksPerSubject = parseInt(e.target.value);
              setInputFields(updatedFields);
            }}
          />
          &nbsp;&nbsp;
          {index === inputFields.length - 1 ? (
            <AddIcon sx={{color:"#50C2C9"}} onClick={handleAddField} />
          ) : (
            <CancelIcon sx={{color:"#50C2C9"}} onClick={() => handleCancelField(index)} />
          )}
        </Div>
      ))}
    </Grid>
  );
}
