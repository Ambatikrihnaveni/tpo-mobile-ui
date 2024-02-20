import React, { useState } from 'react';
import { Typography, LinearProgress } from "@mui/material";
import useAuth from "/imports/client/ui/hooks/useAuth";
import styled from "@mui/material/styles/styled";

const colors = ['warning', 'secondary', 'success', 'primary'];


const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 5,
  flex: 1
}));

function StudentSkills() {

     ;
  const { isViewerLoading, viewer, data } = useAuth();
  const [user, setUser] = useState(viewer);
  const userdata = { ...viewer }


  return (
    <>
    {viewer?.profile?.skills?.length > 0 ? 
    (<div>


      {viewer?.profile?.skills?.map((item, index) => (
        <div key={item.id}>
          <Typography color="text.primary">{item.skill}</Typography>
          <div style={{display:"flex"}}>
          <StyledLinearProgress
            sx={{ mb: 2, mt: 1 }}
            variant={"determinate"}
            value={item.skill_rating/10*100}
            // color={item.color}
            color={colors[index % colors.length]}
          />
          <Typography sx={{ml:1}}>{item?.skill_rating}/10</Typography>
          </div>

        </div>
      ))}

    </div>):
              (<Typography style={{verticalAlign:'center',textAlign:'center',marginTop:'50px',marginBottom:'40px'}}> No data available</Typography>) 
      }
              </>
  )
}

export default StudentSkills