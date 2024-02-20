import React from "react";
import DashboardsIcon from "mdi-material-ui/ViewDashboard";
import { PiStudentFill } from "react-icons/pi";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import SettingsIcon from "mdi-material-ui/Cog";
import { MdOutlineReceiptLong } from "react-icons/md";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import WebStoriesIcon from '@mui/icons-material/WebStories';


 
    const CA_menus = [
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
                    uri: "/groups",
                    label: 'Groups',
                    type: "nav-item",
                    icon: <GroupAddIcon sx={{ fontSize: 20 }} />
                },
    
    
            ]
        },
    
        {
    
            label: 'sidebar.menu.extensions',
            type: "section",
            children: [
                {
                    label: 'Enrolled Programs',
                    type: "collapsible",
                    uri: "/myprograms",
                    icon: <Diversity3Icon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/internships",
                            label: 'Internships',
                            type: "nav-item",
                            icon: <Diversity3Icon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/courses",
                            label: 'Courses',
                            type: "nav-item",
                            icon: <Diversity3Icon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/projects",
                            label: 'Projects',
                            type: "nav-item",
                            icon: <WebStoriesIcon sx={{ fontSize: 20 }} />,
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
        
        {
    
            label: 'sidebar.menu.events',
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
            label: 'sidebar.menu.settings',
            type: "section",
            children: [
                {
                    uri: "/settings",
                    label: 'Settings',
                    type: "nav-item",
                    icon: <SettingsIcon sx={{ fontSize: 20 }} />
                },
            ]
        }
    
    ];


   



export default CA_menus;
