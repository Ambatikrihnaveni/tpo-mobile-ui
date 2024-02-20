import React from 'react';
import {List} from "@mui/material";
//import {projects} from "./data";
import ProjectItem from "./ProjectItem";
import gql from "graphql-tag";
import { useQuery } from 'react-apollo';

const programsQuery = gql`
query programs(
    $shopId: ID!
    $type: String
    $query: String
){
    programs(
        shopId: $shopId
        type: $type
        query: $query
    ){
        _id
        name
        type
        shopId
        createdBy
        createdAt
        program_content
        field
        products{
            _id
    
        }
    }
}
`

const ProjectsList = (props) => {
    /* const shopId = window.localStorage.getItem('accounts:shopId');
    const {data: projectsData} = useQuery(programsQuery, {
        variables:{
            shopId,
            type:"projects",
            query:null
        }
        
    }) */
    const { projects } = props;
    

    return (
            <List disablePadding>
                {
                  projects?.map((projectsData, index) => (
                        <ProjectItem projects={projectsData} />
                    ))
                }
            </List>
    );
};

export default ProjectsList;
