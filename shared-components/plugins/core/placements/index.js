import React,{lazy} from 'react'
import { RiArrowUpSFill } from "react-icons/ri";
import { RiArrowDownSFill } from "react-icons/ri";
import * as RiIcons from 'react-icons/ri'
import { Grid } from '@material-ui/core';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { registerOperatorRoute } from "../../../../../imports/client/ui";
import Projects from './projects/Popularcourses';
import { Divider, List } from '@mui/material';
import Courses from './courses/courses';
import Internships from './internships/Popularcourses';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import SpokeIcon from '@mui/icons-material/Spoke';
import WorkIcon from '@mui/icons-material/Work';
import Jobmatch from '../../../../client/ui/appLayout/pages/placementCell/jobmatch';
import LoadableVisibility from "react-loadable-visibility/react-loadable";

export default function Placements() {
  return (
    <>
    <div style={{marginBottom:'15px'}}>All placements</div>
    <Divider/>
    
    <div style={{marginBottom:'25px'}}>
      <Jobmatch/>
    </div>
    
    <div style={{marginBottom:'25px'}} >
      <Applayjob/>
    </div>
   
    <div>
      <Rejectjob/>
    </div>
   
    </>
  )}


  const LoadingComponent = (props) => {
    return (
      <div style={{marginTop:'40vh'}}>
        <div style={{margin: 'auto', textAlign:'center'}}>
         <img src="/loading.gif" width="80px" />
        </div>
      </div>
    )
  }
  
  const ListViewPage = lazy(()=>import('../../../../client/ui/appLayout/pages/list-views/listViewPage/ListViewPage'))
 
  

  registerOperatorRoute({
    id:6,
      group: "adminStudentNavs", //adminStudentNavs comnNavigation
      priority: 15,
     // createRouteWithNoPrefix: true,
      path: "/placements",
      MainComponent:ListViewPage ,
      SidebarIconComponent: WorkIcon,
     
      sidebarI18nLabel: "Placement Cell",
      iconClosed: <RiArrowDownSFill />,
      iconOpened: <RiArrowUpSFill />,
    subNav:[
      {
        path: "/jobmatches",
        SidebarIconComponent: WorkHistoryIcon,
        sidebarI18nLabel:"Job Matches",
        count:7,
      },
      {
        path: "/appliedjobs",
        SidebarIconComponent: TouchAppIcon,
        sidebarI18nLabel:"Applied Jobs",
        count:6,
      },{
        path: "/rejectedjobs",
        SidebarIconComponent: EventBusyIcon,
        sidebarI18nLabel:"Rejected Jobs",
        count:3,
      }
    ]
    
    });
   
    registerOperatorRoute({
      group: "subnavigation",
      path: "/jobmatches",
      MainComponent: ListViewPage,
    });
    
    registerOperatorRoute({
      group: "subnavigation",
      path: "/appliedjobs",
      MainComponent: ListViewPage,
    });
    
    registerOperatorRoute({
      group: "subnavigation",
      path: "/rejectedjobs",
      //MainComponent: Internships,
      MainComponent: ListViewPage,
  
    });
  