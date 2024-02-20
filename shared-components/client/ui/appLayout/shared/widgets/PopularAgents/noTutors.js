

import React from "react";
import {Card,CardContent} from "@mui/material";
import Div from "@jumbo/shared/Div";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";


function NoTutor(){
    return(
        <JumboCardQuick bgColor={'white'} style={{marginLeft:"17px",width:"100%",textAlign:"center",height:"100px"}}>
            
            <Div  variant={"h4"} >
            <Typography style={{marginTop:"18px"}}> No tutor's are available</Typography>                        
            </Div>
            
        </JumboCardQuick>
    )
}
export default NoTutor