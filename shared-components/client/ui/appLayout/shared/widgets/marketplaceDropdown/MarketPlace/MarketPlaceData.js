import React from 'react';
import {Avatar, Card, CardContent, Rating, Typography,Box} from "@mui/material";


const MarketPlaceData = ({agentDetail}) => {
    return (
       
           <div style={{cursor:"pointer"}}>
            <Box display="flex" justifyContent="center" alignItems="center" >
                <Avatar
                    alt={agentDetail.title}
                    src={agentDetail.avatar} 
                    sx={{ width: 60, height: 60, mb: 1, }}
                   
                />
                </Box>
               
                <Typography  sx={{mb:1}} style={{textAlign:"center"}}>  {agentDetail.title}
                
                </Typography>
               
                </div>
         
    );
};
/* Todo agent detail prop */
export default MarketPlaceData;
