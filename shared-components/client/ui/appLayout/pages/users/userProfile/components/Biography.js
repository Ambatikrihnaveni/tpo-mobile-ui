import React from 'react';
import {Typography} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import useAuth from '../../../../../hooks/useAuth';
const Biography = () => {
      
    const {viewer}= useAuth()
    return (
        <JumboCardQuick
            title={"Bio"}
            headerSx={{pb: 0}}
            sx={{mb: 3.75}}
        >
            <Typography variant="h3" fontWeight="300" mb={2} ml={5}>
                 <div dangerouslySetInnerHTML={{ __html: viewer?.profile?.bio }} /> 
                 <div dangerouslySetInnerHTML={{ __html: viewer?.profile?.summary }} /> 
                
                 </Typography>
           
            
        </JumboCardQuick>
    );
};

export default Biography;
