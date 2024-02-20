import React from 'react';
import {agents} from './data'
import AgentDetail from "./AgentDetail";
import {Typography,Card,CardContent} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useTranslation} from "react-i18next";
import Div from "@jumbo/shared/Div";
import gql from "graphql-tag";
import { useQuery } from 'react-apollo';
import NoTutor from './noTutors';

const tutorsQuery = gql`
query tutors(
        $shopId: ID
        $status: String
        $categories: [String]
        $query: String
    ) {
        tutors(
        shopId: $shopId
        status: $status
        categories: $categories
        query: $query
        ) {
        _id
        emailRecords{
            address
            verified
        }
        profile{
            isStatus
            isApproved
            availableDays
            certificates
            address
            picture
            price
            qualification
            categories
            experience
            bio
        }
        userMedia {
            _id
            URLs {
              thumbnail
            }
            priority
        }
        role
        userId
        isProfile
        name
        phoneNumber
    }
}
`

const PopularAgents = () => {
    
    const shopId = window.localStorage.getItem('accounts:shopId');

    const {data} = useQuery(tutorsQuery,{
        variables:{
            shopId
        }
    });

    let tutors=[]
    if(data){
        for(let i=0;i<data?.tutors.length;i++){
            if(data?.tutors[i].profile.isStatus =="Approved"){
                tutors.push(data?.tutors[i])
            }
            
        }
    
    }
   
 
    const {t} = useTranslation();
    return (
        <React.Fragment>
            <Typography variant={"h5"} sx={{mb: 2}}>{t("Popular Instructors")}</Typography>
            <Grid container spacing={2}>
                
                {(tutors?.length > 0) ? 
                    tutors?.map((tutorsData, index) => (
                        <Grid item xs={12} sm={6} lg={2} key={index}>
                            <AgentDetail tutors = {tutorsData}/>
                        </Grid>
                    )) : <NoTutor/>
                }
            </Grid>
        </React.Fragment>
    );
};
export default PopularAgents;
