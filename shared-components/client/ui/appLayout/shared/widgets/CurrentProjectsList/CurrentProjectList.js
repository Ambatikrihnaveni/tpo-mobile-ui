import React from 'react';
import ProjectsList from "./ProjectsList";
import {Chip} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";

const CurrentProjectsList = (props) => {
    const {scrollHeight} = props;
    const {t} = useTranslation();
     
    return (
        <JumboCardQuick
            title={t('Projects')}
            
            action={
                <Chip color={"warning"} label={"Search"}
                 size={"small"}/>
                }
                
            headerSx={{borderBottom: 1, borderBottomColor: 'divider'}}
            wrapperSx={{p: 0}}
        >
           
            <JumboScrollbar
                autoHeight autoHeightMin={scrollHeight ? scrollHeight : 356}
                autoHide  
                autoHideDuration={200}
                autoHideTimeout={500}
            >
                <ProjectsList projects = {props.projects}/>
            </JumboScrollbar>
       
        </JumboCardQuick>

    );
};
/* Todo scrollHeight props define */
export default CurrentProjectsList;
