import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Typography} from "@mui/material";
import Div from "@jumbo/shared/Div";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const TasksCounterCard = (props) => {
     //;
    return (
        <JumboCardQuick bgColor={'white'}>
            <Div sx={{display:"flex", alignItems: 'center'}}>
{/*                 <img alt={"Task Icon"} src={getAssetPath(`${ASSET_IMAGES}/dashboard/tasksIcon.svg`,"46x46")}/> */}
                <Div sx={{ flex: 1}}>
                    <Typography   mb={.5} style={{marginRight:"10px"}}>Tutors<div style={{width:'5px',height:'20px',float:'right',color:'blue',marginRight:"10px"}}>
                    
                        <PermIdentityIcon style={{fontSize:"25px"}}/>
                       
                        </div></Typography>
                        {
                            props?.tutors &&
                            <Typography   mb={0}>{props?.tutors?.tutors?.length}</Typography>
                        }
                </Div>
            </Div>
        </JumboCardQuick>
    );
};

export default TasksCounterCard;