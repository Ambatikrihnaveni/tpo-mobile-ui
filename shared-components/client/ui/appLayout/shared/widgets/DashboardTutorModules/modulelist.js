import React from 'react';
import {List} from "@mui/material";
import ModuleItem from './moduleitem';

const ModuleList = ({tutorModules}) => {
    return (
        <List disablePadding>
            {
                    <ModuleItem tutorModules={tutorModules}/>
            
            }
        </List>
    );
};

export default ModuleList;
