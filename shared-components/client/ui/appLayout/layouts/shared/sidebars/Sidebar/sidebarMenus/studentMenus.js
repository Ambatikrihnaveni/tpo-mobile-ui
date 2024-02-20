import React from "react";
import DashboardsIcon from "mdi-material-ui/ViewDashboard";           
import EventSeatIcon from '@mui/icons-material/EventSeat';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DescriptionIcon from '@mui/icons-material/Description';
import TutorIcon from "mdi-material-ui/AccountTie";
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { MdOutlineReceiptLong } from "react-icons/md";
import Diversity2Icon from '@mui/icons-material/Diversity2';


    const studentMenus = [
        {
            label: 'sidebar.menu.home',
            type: "section",
            children: [
                {
                    uri: "/dashboard",
                    label: 'Dashboard',
                    type: "nav-item",
                    icon: <DashboardsIcon sx={{ fontSize: 20 }} />
                },
               
                {
                    uri: "/groups",
                    label: 'Groups',
                    type: "nav-item",
                    icon: <Diversity2Icon sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/programs",
                    label: 'Programs',
                    type: "nav-item",
                    icon:  <TutorIcon sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/myadmissions",
                    label: 'Admissions',
                    type: "nav-item",
                    icon:  <CastForEducationIcon sx={{ fontSize: 20 }} />
                },
            ]
        },
    
        {
    
            label: 'sidebar.menu.classes',
            type: "section",
            children: [
                {
                    label: 'Classes',
                    type: "collapsible",
                    icon: <CastForEducationIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/todaysclass",
                            label: 'Todays Class',
                            type: "nav-item",
                            icon: <CastForEducationIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/calendar",
                            label: 'Calendar',
                            type: "nav-item",
                            icon: <CalendarMonthIcon sx={{ fontSize: 20 }} />,
                        },
    
                    ]
                },
    
            ]
        },
    
       
        {
    
            label: 'sidebar.menu.extensions',
            type: "section",
            children: [
                {
                    label: 'Events',
                    type: "collapsible",
                    icon: <EventSeatIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/webinars",
                            label: 'Webinar',
                            type: "nav-item",
                        },
    
                    ]
                },
    
            ]
        },
    
        {
    
            label: 'sidebar.menu.placementprep',
            type: "section",
            children: [
                {
                    label: 'Placement Prep',
                    type: "collapsible",
                    icon: <WorkOutlineIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/placementpreep/aptitude",
                            label: 'Aptitude',
                            type: "nav-item",
                            icon:<PsychologyIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/placementpreep/technical",
                            label: 'Technical',
                            type: "nav-item",
                            icon:<CodeOffIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/placementpreep/modelpapers",
                            label: 'Model-Papers"',
                            type: "nav-item",
                            icon:<DescriptionIcon sx={{ fontSize: 20 }} />,
                        },
    
                    ]
                },
    
            ]
        },
    
        {
    
            label: 'sidebar.menu.competitiveprep',
            type: "section",
            children: [
                {
                    label: 'Competitive Prep',
                    type: "collapsible",
                    icon: <BarChartIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/competitivepreep/entranceexam",
                            label: 'Entrance Exam',
                            type: "nav-item",
                            icon:<HistoryEduIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/competitivepreep/modelpapers",
                            label: 'Model Papers',
                            type: "nav-item",
                            icon:<DescriptionIcon sx={{ fontSize: 20 }} />,
                        },
    
                    ]
                },
    
            ]
        },
        {
            label: 'sidebar.menu.payments',
            type: "section",
            children: [
                {
                    uri: "/payments",
                    label: 'Payments',
                    type: "nav-item",
                    icon: <MdOutlineReceiptLong sx={{ fontSize: 20 }} />
                },
            ]
        },
    
    ];

   



export default studentMenus;
