import React from 'react';
import {Grid} from "@mui/material";
import CurrentProjectList from "../../../shared/widgets/CurrentProjectsList";
import RecentActivities1 from "../../../shared/widgets/RecentActivities1";
import ProjectCounterCard from "../../../shared/widgets/ProjectCounterCard";
import TasksCounterCard from "../../../shared/widgets/TasksCounterCard";
import TeamsCounterCard from "../../../shared/widgets/TeamsCounterCard";
import FilesCounterCard from "../../../shared/widgets/FilesCounterCard";
import NewArticles from "../../../shared/metrics/NewArticles";
import AvgDailyTraffic from "../../../shared/metrics/AvgDailyTraffic";
import PopularAgents from "../../../shared/widgets/PopularAgents";
import gql from "graphql-tag";
import { useQuery } from 'react-apollo';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';

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
const studentsQuery = gql`

query students(
    $shopId: ID
    $query: String
) {
students(
    shopId: $shopId
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
        address
        qualification
        status
        year
        address           
    }
    role
    userId
    isProfile
    name
    phoneNumber
  }
}
`;

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
        field
        shopId
        createdBy
        createdAt
        program_content
        products{
            _id
        }
    }
}
`;

const institutesQuery = gql`
query shops{
    shops{
        nodes{
            _id
            brandAssets {
                navbarBrandImage {
                    large
                }
            }
            name
            shopLogoUrls {
                primaryShopLogoUrl
            }
        }
    }
}`;

const viewerQuery = gql`
query getViewer {
  viewer {
    _id
    firstName
    language
    lastName
    name
    primaryEmailAddress
    adminUIShops {
      _id
      brandAssets {
        navbarBrandImage {
          large
        }
      }
      name
      shopLogoUrls {
        primaryShopLogoUrl
      }
    }
    role
    shopId{
        _id
        name
    }
    phoneNumber
    isProfile
    profile{
      bio
      address
      qualification
      experience
      price
      isStatus
      isApproved
      availableDays
      picture
      categories
      selectedFromTime
      selectedToTime
      certificates
    }
  }
}
`;

const tutorStudentsQuery = gql`
query tutorStudents{
    tutorStudents{
        _id
        bio
        name
        role
        profile{
            bio
        }
    }
}
`;

const tutorProgramsQuery = gql`
query tutorPrograms(
    $type: String
){
    tutorPrograms(
        type: $type
    ){
        _id
        name
        type
        shopId
        createdBy
        createdAt
        field
        program_content
    }
}
`
const EcommerceDashboard = () => {
    const shopId = window.localStorage.getItem('accounts:shopId');
 
    const { data: viewerData } = useQuery(viewerQuery);
    let role = viewerData?.viewer?.role;
    const [studentsInfo, setStudentsInfo] = React.useState();
    const [internshipsInfo, setInternshipsInfo] = React.useState();
    const [coursesInfo, setCoursesInfo] = React.useState();
    const [projectsInfo, setProjectsInfo] = React.useState();
    if(role == "Admin" || role == "Master-Admin") {
        MyDashboardService.instituteStudents(shopId).then(data=>{
            setStudentsInfo(data);
        }).catch(err => {
            console.log(err);
        });
        MyDashboardService.institutePrograms({shopId, type:'internships', query:null}).then(data =>{
            setInternshipsInfo(data)
        }).catch(err =>{
            console.log(err);
        })
        MyDashboardService.institutePrograms({shopId, type:'courses', query:null}).then(data =>{
            setCoursesInfo(data)
        }).catch(err =>{
            console.log(err);
        })
        MyDashboardService.institutePrograms({shopId, type:'projects', query:null}).then(data =>{
            setProjectsInfo(data)
        }).catch(err =>{
            console.log(err);
        })
    }else if(role == "Tutor") {
        MyDashboardService.tutorStudents().then(data => {
            setStudentsInfo(data);
        }).catch(err => {
            console.log(err);
        });
        MyDashboardService.tutorInterships({type:'internships'}).then(data => {
            setInternshipsInfo(data);
        }).catch(err => {
            console.log(err);
        })
        MyDashboardService.tutorInterships({type:'courses'}).then(data => {
            setCoursesInfo(data);
        }).catch(err => {
            console.log(err);
        })
        MyDashboardService.tutorInterships({type:'projects'}).then(data => {
            setProjectsInfo(data);
        }).catch(err => {
            console.log(err);
        })
    }
  
    const {data: tutorsData} = useQuery(tutorsQuery,{
        variables:{
            shopId,
        }
    });
   

    const {data: institutesData} = useQuery(institutesQuery);

    return (
        <Grid container spacing={3.75} >
                 {(role == "Admin" || role == "Master-Admin") && 
             <Grid item xs={12} sm={4} lg={2}>
             <ProjectCounterCard institutes={institutesData?.shops?.nodes} />
            </Grid> }
            {(role == "Admin" || role == "Master-Admin") && 
            <Grid item xs={12} sm={4} lg={2}>
               <TasksCounterCard tutors={tutorsData} />
            </Grid>}
            {(role == "Admin" || role == "Master-Admin" || role == "Tutor") && 
            <Grid item xs={12} sm={4} lg={2}>
                <TeamsCounterCard students={studentsInfo} /> 
            </Grid>}
            <Grid item xs={12} sm={4} lg={2}>
                <NewArticles internships={internshipsInfo} headerSx={{ pb: 1.25 }} />
            </Grid>
            <Grid item xs={12} sm={4} lg={2}>
                <AvgDailyTraffic courses={coursesInfo} />
            </Grid>
            <Grid item xs={12} sm={4} lg={2}>
                <FilesCounterCard projects={projectsInfo} />
            </Grid>
            <Grid item xs={12}>
                { (role == "Admin" || role == "Master-Admin") && <PopularAgents tutors={tutorsData} />}
            </Grid>
            <Grid item xs={12} md={5}>
                <RecentActivities1 scrollHeight={365} />
            </Grid>
            <Grid item xs={12} md={7}>
                <CurrentProjectList projects = {projectsInfo}/>
            </Grid>
        </Grid>
    );
};

export default EcommerceDashboard;
