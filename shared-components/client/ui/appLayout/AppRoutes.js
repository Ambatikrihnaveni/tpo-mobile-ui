import React ,{useEffect,lazy} from "react";

//import routes from "./routes";
import useJumboRoutes from "@jumbo/hooks/useJumboRoutes";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import masterAdminRoutes from "./routes/masterAdminRoutes";
import collegeAdminRoutes from './routes/collegeAdminRoutes';
import tutorRoutes from './routes/tutorRoutes';
import studentRoutes from "./routes/studentRoutes";
import useJumboApp from "../@jumbo/hooks/useJumboApp";

const Error404 = lazy(() => import("./pages/extra-pages/Error404/Error404"))


const AppRoutes = () => {

 

 const role= localStorage.getItem('"accounts:role"' );


 const pageNotFound = [
  {
      path :"*",
      element:<Error404 />
  },]

 let routes= [ ...authRoutes,...pageNotFound]


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



 const appRoutes = useJumboRoutes(routes);



  return <React.Fragment>{appRoutes}</React.Fragment>;
};
export default AppRoutes;

