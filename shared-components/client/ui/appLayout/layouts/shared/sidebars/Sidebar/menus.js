import React from "react";
import DashboardsIcon from "mdi-material-ui/ViewDashboard";
import MycoursesIcon from "mdi-material-ui/BookOpenVariant";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventSeatIcon from '@mui/icons-material/EventSeat';
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
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { MdOutlineReceiptLong } from "react-icons/md";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import WebStoriesIcon from '@mui/icons-material/WebStories';


 function menus(){

    const MA_Menus = [
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
                            uri: "/payments/received",
                            label: 'Received',
                            type: "nav-item",
                        },
                        {
                            uri: "/payments/payable",
                            label: 'Payable',
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
                            uri: "/aptitude",
                            label: 'Aptitude',
                            type: "nav-item",
                            icon:<PsychologyIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/technical",
                            label: 'Technical',
                            type: "nav-item",
                            icon:<CodeOffIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/modelpapers",
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
                            uri: "/entranceexam",
                            label: 'Entrance Exam',
                            type: "nav-item",
                            icon:<HistoryEduIcon sx={{ fontSize: 20 }} />,
                        },
                        {
                            uri: "/modelpapers",
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


    const adminMenus = [
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
                    uri: "/tutors",
                    label: 'Tutors',
                    type: "nav-item",
                    icon: <FaChalkboardTeacher sx={{ fontSize: 20 }} />
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
    
            label: 'sidebar.menu.extensions',
            type: "section",
            children: [
                {
                    label: 'My Programs',
                    type: "collapsible",
                    icon: <Diversity3Icon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/myprograms",
                            label: 'Programs',
                            type: "nav-item",
                        },
                        {
                            uri: "/admissions",
                            label: 'Admissions',
                            type: "nav-item",
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
                    label: 'Payments',
                    type: "collapsible",
                    icon: <AttachMoneyIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/payments/received",
                            label: 'Received',
                            type: "nav-item",
                        },
                        {
                            uri: "/payments/payable",
                            label: 'Payable',
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
                    label: 'Events',
                    type: "collapsible",
                    icon: <EventSeatIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/webinars",
                            label: 'Webinars',
                            type: "nav-item",
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
                    uri: "/mycertificates",
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


    const CA_menus = [
        {
            label: 'sidebar.menu.home',
            type: "section",
            children: [
                {
                    uri: "/dashboards",
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
                            label: 'Webinars',
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
                            label: 'Webinars',
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

    const studentMenus = [
        {
            label: 'sidebar.menu.home',
            type: "section",
            children: [
                {
                    uri: "/dashboards",
                    label: 'Dashboard',
                    type: "nav-item",
                    icon: <DashboardsIcon sx={{ fontSize: 20 }} />
                },
               
               
    
            ]
        },
    
        {
    
            label: 'sidebar.menu.extensions',
            type: "section",
            children: [
                {
                    label: 'My Programs',
                    type: "collapsible",
                    icon: <Diversity3Icon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/myprograms",
                            label: 'Programs',
                            type: "nav-item",
                        },
                        {
                            uri: "/admissions",
                            label: 'Admissions',
                            type: "nav-item",
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
                    label: 'Payments',
                    type: "collapsible",
                    icon: <AttachMoneyIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/payments/received",
                            label: 'Received',
                            type: "nav-item",
                        },
                        {
                            uri: "/payments/payable",
                            label: 'Payable',
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
                    label: 'Events',
                    type: "collapsible",
                    icon: <EventSeatIcon sx={{ fontSize: 20 }} />,
                    children: [
                        {
                            uri: "/webinars",
                            label: 'Webinars',
                            type: "nav-item",
                        },
    
                    ]
                },
    
            ]
        },
    
      
      
    
    ];

    return({
        adminNavs:adminMenus, //traingpartnar menus
        MA_navs:MA_Menus, //master admin menus
        CA_navs:CA_menus, //college admin menus
        tutorNavs:tutorMenus,
        studentNavs:studentMenus
    })
}



export default menus;
