import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import Div from "@jumbo/shared/Div";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";

const FilesCounterCard = (props) => {
    let projects = (props?.projects) ? props?.projects?.length : 0;
    return (
        <JumboCardQuick bgColor={'white'}
        noWrapper
        title={<Typography style={{height:'40px',marginRight:"10px"}}>Projects<div style={{width:'5px',height:'20px',float:'right',color:'blue',marginRight:"10px"}}>

             <AccountTreeIcon style={{fontSize:"25px"}}/>      
            </div></Typography>}
        subheader={
            
            <Typography mb={0}>{projects}</Typography>
        }
        
        >
        </JumboCardQuick>
    );
};

export default FilesCounterCard;