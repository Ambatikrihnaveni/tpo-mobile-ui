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



    const TP_menus = [
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
                            uri: "/payments",
                            label: 'Upcoming',
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
                        },
                        {
                            uri: "/payments/manualPayments",
                            label: 'Manual Payments',
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




export default TP_menus;
