import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Div from "../../../../../../@jumbo/shared/Div";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";

export default function CutoffMarks(params) {
    const {
        fields,
        handleAddFields,
        handleFieldChange,
        handleRemoveFields
    } = params

  return (
    <Grid sx={{ textAlign: "center" }}>
      <Div>
        <Typography sx={{ fontSize: 29, fontWeight: "bold" }}>Cut-Off Marks Allotment</Typography>
        <Typography sx={{ mb: 1, mt: 2 }}>Enter The Number Of Days , Weeks, Or Months Corresponding To Your Desired Program Duration</Typography>
      </Div>
      {fields.map((field, index) => (
        <Div key={index}>
          <Div sx={{ display: "flex", mt: 3, mb: 3 }}>
            <TextField
              fullWidth
              label="Marks"
              type="number"
              placeholder="0-20"
              value={field.marks_GPA || ''}
              onChange={(e) => handleFieldChange(index, 'marks_GPA', e.target.value)}
            />
            &nbsp;&nbsp;
            <TextField
              fullWidth
              variant="outlined"
              label="College Name"
              placeholder="College Name"
              value={field.collegeName}
              onChange={(e) => handleFieldChange(index, 'collegeName', e.target.value)}
            />
            &nbsp;&nbsp;
            <TextField
              fullWidth
              variant="outlined"
              label="Location"
              placeholder="Location"
              value={field.collegeLocation}
              onChange={(e) => handleFieldChange(index, 'collegeLocation', e.target.value)}
            />
            &nbsp;&nbsp;
            {
              index === fields.length - 1 ? (
                <AddIcon
                sx={{ color: "#50C2C9" }}
                onClick={handleAddFields}
              />
              ):(
                <CancelIcon
                sx={{ color: "#50C2C9", cursor: "pointer" }}
                onClick={() => handleRemoveFields(index)}
              />
              )
            }
          </Div>
        </Div>
      ))}
    </Grid>
  );
}