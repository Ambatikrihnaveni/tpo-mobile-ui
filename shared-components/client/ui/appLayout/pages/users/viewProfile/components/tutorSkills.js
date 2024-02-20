import React, {useState} from 'react';
import { Typography,LinearProgress} from "@mui/material";


function TutorSkills({viewer}) {
   
    const userdata = { ...viewer }
    const colors = ['warning', 'secondary', 'success', 'primary'];

  return (
    <div>
            {userdata?.profile?.skills?.map((item,index) => (
                <div key={item.id}> 
                <Typography color="text.primary">{item.skill}</Typography>
                <div style={{display:"flex"}}>
                <LinearProgress
                   variant="determinate"
                   value={(item?.skill_rating/10*100)}
                   sx={{
                     width: '100%',
                     borderRadius: 0.5,
                     height: 9,
                     mb: 2,
                     mt:1,
                   }}
                   color={colors[index % colors.length]}
                 />
                  <Typography sx={{ml:1}}>{item?.skill_rating}/10</Typography>
                  </div>
                </div>
            ))}
                           
    </div>
  )
}

export default TutorSkills