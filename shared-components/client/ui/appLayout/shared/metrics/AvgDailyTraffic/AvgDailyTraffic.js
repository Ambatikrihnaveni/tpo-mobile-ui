import React from 'react';
import AvgDailyTrafficChart from "./AvgDailyTrafficChart";
import TimelineIcon from '@mui/icons-material/Timeline';
import Typography from "@mui/material/Typography";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import { Avatar } from '@mui/material';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';



const AvgDailyTraffic = (props) => {
    let courses = (props?.courses) ? props?.courses?.length : 0;
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            noWrapper
            title={<Typography style={{height:'40px'}}>Courses<div style={{width:'5px',height:'20px',float:'right',color:'blue',marginRight:"15px"}}>
            
                <ImportContactsIcon style={{fontSize:"25px"}}/>
                
                </div></Typography>}
            subheader={
                
                <Typography mb={0}>{courses}</Typography>
            }
        >
            {/* <AvgDailyTrafficChart/> */}
        </JumboCardQuick>
    );
};  

export default AvgDailyTraffic;