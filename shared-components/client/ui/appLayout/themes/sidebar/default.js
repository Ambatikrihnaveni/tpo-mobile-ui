import {alpha} from "@mui/material/styles";

export const sidebarTheme = {
    type: "linear-gradient",
    palette: {
        primary: {
            main: '#ffffff',
            light: '#ffffff',
            dark: '#28c6d1',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#E44A77',
            light: '#FF7EA6',
            dark: '#DF295E',
            contrastText: '#FFF'
        },
        error: {
            main: '#E73145',
            light: '#FF6A70',
            dark: '#AD001E',
            contrastText: '#FFF'
        },
        warning: {
            main: '#F39711',
            light: '#FFC84C',
            dark: '#BB6900',
            contrastText: '#FFF'
        },
        info: {
            main: '#2EB5C9',
            light: '#6FE7FC',
            dark: '#008598',
            contrastText: '#FFF'
        },
        success: {
            main: '#3BD2A2',
            light: '#78FFD3',
            dark: '#00A073',
            contrastText: '#FFF'
        },
        text: {
            primary: '#2e475D',
            secondary: '#8595A6',
            disabled: '#A2B2C3',
        },
        
        nav: {
            action: {
                active: '#ffffff',
                hover: '#ffffff',
            },
            background: {
               // active: alpha('#7352C7', .15),
               active:"#51bda0",
                hover: "#51bda0"
            },
            tick: {
                active: '#50C2C9',
                hover: "#ADB5BD"
            }
        },
        divider : '#DEE2E6',
        background: {
            paper: "#ffffff",
            default: '#F5F7FA',
        }, 
        
        /* backgroundimage:{
            type:'linear-gradient',
            colors: ["#80ced7", "#04619f"],

        }, */
        action: {
            active: '#ffffff',
            hover: '#4db0e1',
        },
        colors:{
            
        }
    }
};