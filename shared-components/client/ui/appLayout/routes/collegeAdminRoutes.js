import React,{lazy} from 'react';
import Page from "@jumbo/shared/Page";
import AuthPage from "@jumbo/shared/Page/authPage";


const MiscDashboard = lazy(()=>import('../pages/dashboards/misc/MiscDashboard'))
const ListViewPage = lazy(()=>import('../pages/list-views/listViewPage/ListViewPage'))
const ShopSettingsRegion = lazy(()=>import('../../../../plugins/core/dashboard/client/components/ShopSettingsRegion'))
const Adminprofile = lazy(()=>import('../../../../plugins/core/adminprofile/adminProfile'))
const ViewProfile = lazy(()=>import('../../../../plugins/core/viewProfile/viewProfile'))
const EditProfile = lazy(()=>import('../shared/widgets/AuthUserDropdown/EditProfile'))
const InviteTutor = lazy(()=>import('../../../../client/ui/appLayout/pages/auth-pages/reset-password/inviteTutor'))
const CollegeDetails = lazy(() => import("../pages/auth-pages/collegeDetails/collegeDetails"))


export default collegeAdminRoutes = [
    
        {
            path: "/dashboard",
            element:<Page component={MiscDashboard} />,
            isAuthRequired:true
        },
    
        {
            path: "/students",
            element:<Page component={ListViewPage} />,
            isAuthRequired:true
        },
       
        {
            path: "/groups",
            element:<Page component={ListViewPage} />,
            isAuthRequired:true
        },
        {
            path: "/groups/:groupId/groupList",
            element:<Page component={ListViewPage} />,
            isAuthRequired:true
        },
        
        {
            path: "/internships",
            element: <Page component={ListViewPage} />,
            isAuthRequired: true
        },
        {
            path: "/courses",
            element: <Page component={ListViewPage} />,
            isAuthRequired: true
        },
        {
            path: "/projects",
            element: <Page component={ListViewPage} />,
            isAuthRequired: true
        },
      
        {
            path: "/payments",
            element: <Page component={ListViewPage}  />,
            isAuthRequired:true
        },
        
        {
            path: "/webinars",
            element: <Page component={ListViewPage} />,
            isAuthRequired:true
        },
       
        {
            path: "/settings",
            element: <Page component={ShopSettingsRegion} />,
            isAuthRequired:true
        },
        {
            path: "/notifications",
            element: <Page component={ListViewPage} />,
            isAuthRequired:true
        },
        {
            path: "/notifications/sent",
            element: <Page component={ListViewPage} />,
            isAuthRequired:true
        },
        {
            path: "/notifications/:notificationId/notification",
            element: <Page component={ListViewPage} />,
            isAuthRequired:true
        },
        {
            path: "/profile",
            element: <Page component={Adminprofile} />,
            isAuthRequired:true
        },
        {
            path: "/:userId/profile",
            element: <Page component={Adminprofile} />,
            isAuthRequired:true
        },
        {
            path: "/:userId/viewprofile",
            element: <Page component={ViewProfile} />,
            isAuthRequired:true
        },
        {
            path: "/profile/edit-profile",
            element: <Page component={EditProfile} />,
            isAuthRequired:true
        },
        {
            path: "/inviteuser",
            element: <Page component={InviteTutor} />,
            isAuthRequired:true
        },
        {
            path: '/user/college-details',
            element: <AuthPage component= {CollegeDetails} layout = {"solo-page"} />,
            isAuthRequired: false
        },
    
]
