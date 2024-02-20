import React from 'react';
import NewArticlesChart from "./NewArticlesChart";
import {Avatar, Typography} from "@mui/material";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import Diversity3Icon from '@mui/icons-material/Diversity3';
;
const NewArticles = (props) => {
    let internships = (props?.internships) ? props?.internships?.length : 0;
    const {t} = useTranslation();
     
    return (
        <JumboCardQuick
            noWrapper
            title={<Typography style={{height:'40px'}}>Internships<div style={{width:'5px',height:'20px',float:'right',color:'blue',marginRight:"15px"}}>
    
                <Diversity3Icon style={{fontSize:"25px"}}/>
        
                </div></Typography>}
            subheader={
                
                <Typography mb={0}>{internships}</Typography>
            }
        >
        </JumboCardQuick>
    ); //(internships) ? internships?.length:0
};

export default NewArticles;