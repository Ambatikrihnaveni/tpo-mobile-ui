import React from 'react';
import {List} from "@mui/material";
import CampaignItem from "./programitem";

const CampaignsList = ({programs}) => {
    return (
        <List disablePadding>
            {
                    <CampaignItem  programs={programs}/>
            
            }
        </List>
    );
};

export default CampaignsList;
