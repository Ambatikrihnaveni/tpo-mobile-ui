import React from "react";
import DashboardsIcon from "mdi-material-ui/ViewDashboard";
import MycoursesIcon from "mdi-material-ui/BookOpenVariant";
import { PiStudentFill } from "react-icons/pi";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { MdOutlineReceiptLong } from "react-icons/md";



    const tutorMenus = [
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
                    uri: "/students",
                    label: 'Students',
                    type: "nav-item",
                    icon: <PiStudentFill sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/modules",
                    label: 'Modules',
                    type: "nav-item",
                    icon: <MycoursesIcon sx={{ fontSize: 20 }} />
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
                            uri: "/classes",
                            label: 'Classes',
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
            label: 'sidebar.menu.assignments',
            type: "section",
            children: [
                {
                    uri: "/assignments",
                    label: 'Assignments',
                    type: "nav-item",
                    icon: <AssignmentIcon sx={{ fontSize: 20 }} />
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




export default tutorMenus;
