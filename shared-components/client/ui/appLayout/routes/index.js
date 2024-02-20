import React,{lazy} from "react";
import Home from "../pages/home";
import Page from "@jumbo/shared/Page";
import authRoutes from "./authRoutes";
/* import adminRoutes from "./adminRoutes";
import masterAdminRoutes from "./masterAdminRoutes";
import collegeAdminRoutes from './collegeAdminRoutes';
import tutorRoutes from './tutorRoutes';
import studentRoutes from './studentRoutes' */
/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/


 let routes= [ ...authRoutes]



// define the role based routes
/* 
if(role=="Master-Admin"){
  
    routes=[...authRoutes,...masterAdminRoutes,...pageNotFound]
  }else if(role=='Admin'){
    routes= [ ...authRoutes, ...adminRoutes,...pageNotFound]
  }else if(role=="College-Admin"){
    routes= [ ...authRoutes, ...collegeAdminRoutes,...pageNotFound]
  }else if(role=="Tutor"){
    routes=[ ...authRoutes, ...tutorRoutes,...pageNotFound]
  }else if(role=="Student"){
    routes=[ ...authRoutes,...studentRoutes,...pageNotFound]
  }
 */

const routesForPublic = [
    {
        path: "/",
        element: <Page component={Home} />
    },
];






/* const routes = [
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
]; */

export {routes as default};