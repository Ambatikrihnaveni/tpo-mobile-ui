import React from "react";
import DashboardsIcon from "mdi-material-ui/ViewDashboard";
import MycoursesIcon from "mdi-material-ui/BookOpenVariant";
import { PiStudentFill } from "react-icons/pi";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { LiaCertificateSolid } from "react-icons/lia";
import SettingsIcon from "mdi-material-ui/Cog";
import {LiaUniversitySolid} from "react-icons/lia";
import CampaignIcon from '@mui/icons-material/Campaign';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import LanguageIcon from '@mui/icons-material/Language';
import BarChartIcon from '@mui/icons-material/BarChart';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import DescriptionIcon from '@mui/icons-material/Description';
import TutorIcon from "mdi-material-ui/AccountTie";


    const MA_menus = [
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
                {
                    uri: "/programsList",
                    label: 'Programs',
                    type: "nav-item",
                    icon:  <TutorIcon sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/collegeadmins",
                    label: 'Colleges',
                    type: "nav-item",
                    icon: <LiaUniversitySolid sx={{ fontSize: 20 }} />
                },
                {
                    uri: "/trainingpartners",
                    label: "Training Partner",
                    type: "nav-item",
                    icon: <Diversity3Icon sx={{ fontSize: 20 }} />
                },
    
    
            ]
        },
    
        {
    
            label: 'sidebar.menu.extensions',
            type: "section",
            children: [
                {
                    label: 'Payments',
                    type: "collapsible",
                    icon: <AttachMoneyIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/payments/payable",
                            label: 'Payable',
                            type: "nav-item",
                        },
                        {
                            uri: "/payments/received",
                            label: 'Received',
                            type: "nav-item",
                        },
                        
                        {
                            uri: "/payments/transactions",
                            label: 'Transactions',
                            type: "nav-item",
                        }
                    ]
                },
    
            ]
        },
        {
    
            label: 'sidebar.menu.extensions',
            type: "section",
            children: [
                {
                    label: 'Campaign',
                    type: "collapsible",
                    icon: <CampaignIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/announcement",
                            label: 'Announcement',
                            type: "nav-item",
                            icon: <AnnouncementIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/webinars",
                            label: 'Webinar',
                            type: "nav-item",
                            icon: <LanguageIcon sx={{ fontSize: 20 }} />,
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
            label: 'sidebar.menu.certificates',
            type: "section",
            children: [
                {
                    uri: "/certificates",
                    label: 'Certificates',
                    type: "nav-item",
                    icon: <LiaCertificateSolid sx={{ fontSize: 20 }} />
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



export default MA_menus;
