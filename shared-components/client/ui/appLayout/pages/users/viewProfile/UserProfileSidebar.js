import React from 'react';
import Grid from "@mui/material/Grid";
import Contacts from "./components/Contacts";
import Friends from "./components/Friends";
import Photos from "./components/Photos";

const UserProfileSidebar = ({viewer}) => {
    return (
        <Grid container spacing={3.75}>
            <Grid item xs={12} md={6} lg={12}>
                <Contacts  viewer={viewer}/>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
                <Friends viewer={viewer}/>
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
                <Photos viewer={viewer} />
            </Grid>
        </Grid>
    );
};

export default UserProfileSidebar;
