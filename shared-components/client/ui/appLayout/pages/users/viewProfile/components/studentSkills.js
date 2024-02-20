import React, { useState } from 'react';
import { Typography, LinearProgress } from "@mui/material";
import styled from "@mui/material/styles/styled";


const colors = ['warning', 'secondary', 'success', 'primary'];


const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  flex: 1
}));

function StudentSkills({viewer}) {

  return (
    <div>
      {viewer?.profile?.skills?.map((item, index) => (
        <div key={item.id}>
          <Typography color="text.primary">{item.skill}</Typography>
          <div style={{display:"flex"}}>
          <StyledLinearProgress
            sx={{ mb: 2, mt: 1 }}
            variant={"determinate"}
            value={item.skill_rating/10*100}
            color={colors[index % colors.length]}
          />
          <Typography sx={{ml:1}}>{item?.skill_rating}/10</Typography>
          </div>

        </div>
      ))}

    </div>
  )
}

export default StudentSkills