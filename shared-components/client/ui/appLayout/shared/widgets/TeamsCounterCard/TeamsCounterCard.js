import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Div from "@jumbo/shared/Div";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';


const TeamsCounterCard = (props) => {
    const students = (props?.students) ? props?.students?.length : 0;
    return (
        <JumboCardQuick bgColor={'white'}>
            <Div sx={{display:"flex", alignItems: 'center'}}>
                {/* <img alt={""} src={getAssetPath(`${ASSET_IMAGES}/dashboard/teamsIcon.svg`, "46x46")}/> */}
                <Div sx={{ flex: 1}}>
                    <Typography  mb={.5} style={{marginRight:"4px"}}>Students<div style={{width:'5px',height:'20px',float:'right',color:'blue',marginRight:"10px"}}>
                        <PersonIcon style={{fontSize:"25px"}}/>
                        </div></Typography>
                      { 
                        <Typography mb={0}>{students}</Typography>

                      }
                </Div>
            </Div>
        </JumboCardQuick>
    );
};

export default TeamsCounterCard;