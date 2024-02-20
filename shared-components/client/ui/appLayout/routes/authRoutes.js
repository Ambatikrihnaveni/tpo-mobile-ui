import React from "react";
import AuthPage from "@jumbo/shared/Page/authPage";


const SetRole = React.lazy(()=>import("../../../../plugins/core/dashboard/client/components/SetRole"))
const Login = React.lazy(()=>import("../pages/auth-pages/login"))
const Signup = React.lazy(()=>import("../pages/auth-pages/signup"))
const ForgotPassword = React.lazy(()=>import("../pages/auth-pages/forgot-password"))
const ResetPassword = React.lazy(()=>import("../pages/auth-pages/reset-password"))
const EditProfileUI = React.lazy(()=>import("../pages/auth-pages/tutor-profile/tutorprofile"))
const ResetPasswordSuccess = React.lazy(()=>import("../pages/auth-pages/reset-password/resetPasswordSuccess"))
const InviteUser = React.lazy(()=>import("../pages/auth-pages/reset-password/invite.js"))
const profileSuccess = React.lazy(()=>import("../pages/auth-pages/tutor-profile/profileSuccess.js"))
const sentMailSuccess = React.lazy(()=>import( "../pages/auth-pages/forgot-password/sentMail"))
const InviteJobForm = React.lazy(()=>import("../pages/auth-pages/reset-password/InviteJob"))


export default authRoutes = [
    {
        path: "/user/login",
        element: <AuthPage component={Login} layout={"solo-page"} />,
        isAuthRequired:false
    },

   
    {
        path: "/user/sign-up",
        element: <AuthPage component={Signup} layout={"solo-page"} />,
        isAuthRequired:false
    },
    {
        path: "/user/reset-password-success",
        element: <AuthPage component={ResetPasswordSuccess} layout={"solo-page"} />,
        isAuthRequired:false
    },
   
    {
        path: "/user/profile-setup-success",
        element: <AuthPage component= {profileSuccess} layout={"solo-page"} />,
        isAuthRequired: false
    },
    {
        path: "/user/sent-mail",
        element: <AuthPage component={sentMailSuccess} layout={"solo-page"} />,
        isAuthRequired:false
    },
     
    {
        path: "/user/set-profile",
        element: <AuthPage component={EditProfileUI} layout={"solo-page"} />,
        isAuthRequired:false
    },
    {
        path: "/user/set-role",
        element: <AuthPage component={SetRole} layout={"solo-page"} />,
        isAuthRequired:false
    },
   
  
    {
        path: "/user/forgot-password",
        element: <AuthPage component={ForgotPassword} layout={"solo-page"} />,
        isAuthRequired:false
    },
    {
        path: "/user/reset-password",
        element: <AuthPage component={ResetPassword} layout={"solo-page"} />,
        isAuthRequired:false
    },
    {
        path: "/user/invite",
        element: <AuthPage component={InviteUser} layout={"solo-page"} />,
        isAuthRequired:false
    },
    {
        path:"/user/inviteJob",
        element:<AuthPage component={InviteJobForm} layout={"solo-page"}/>,
        isAuthRequired:false
    },
   
   

];
