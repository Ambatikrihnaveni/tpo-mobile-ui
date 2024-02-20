import React,{lazy} from 'react';
import Page from "@jumbo/shared/Page";
import moduleRoutes from '../../../../plugins/core/Modules'
import AuthPage from "@jumbo/shared/Page/authPage";


const MiscDashboard = lazy(()=>import('../pages/dashboards/misc/MiscDashboard'))
const ListViewPage = lazy(()=>import('../pages/list-views/listViewPage/ListViewPage'))
const ShopSettingsRegion = lazy(()=>import('../../../../plugins/core/dashboard/client/components/ShopSettingsRegion'))
const Adminprofile = lazy(()=>import('../../../../plugins/core/adminprofile/adminProfile'))
const ViewProfile = lazy(()=>import('../../../../plugins/core/viewProfile/viewProfile'))
const EditProfile = lazy(()=>import('../shared/widgets/AuthUserDropdown/EditProfile'))
const TutorCalendaritem = lazy(()=>import('../pages/list-views/listViewPage/components/RecordsList/components/Calendars/TutorCalendaritem.js'))
const CalendarEvents = lazy(()=>import('../pages/calendarEvents/calendarEvents'))
const EvaluationItem = lazy(()=>import('../pages/list-views/listViewPage/components/RecordsList/evaluationItem'))
const StudentAssignmentItem = lazy(()=>import('../pages/list-views/listViewPage/components/RecordsList/studentassignmentitem'))
const Error404 = lazy(() => import('../pages/extra-pages/Error404/Error404'))

export default tutorRoutes = [
    
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
            path: "/modules",
            element: <Page component={ListViewPage} />,
            isAuthRequired: true
        },
       
        {
            path: "/classes",
            element:<Page component={ListViewPage} />,
            isAuthRequired:true
        },
        {
            path: "/calendar",
            element:<Page component={TutorCalendaritem} />,
            isAuthRequired:true
        },
        {
            path:  `/calendar/:batchId/:eventId/event`,
            element:<Page component={CalendarEvents} />,
            isAuthRequired:true
        },
        
        {
            path: "/calendar/:lessonId/assignment",
            element: <Page component={StudentAssignmentItem} />,
            isAuthRequired: true
        },
        {
            path: "/assignments",
            element: <Page component={ListViewPage} />,
            isAuthRequired: true
        },
        {
            path: "/assignments/:assignmentId/questions",
            element: <Page component={ListViewPage} />,
            isAuthRequired: true
        },
        
        {
            path: "/assignments/questions/:assignmentId/:studentId/evaluation",
            element: <Page component={EvaluationItem} />,
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
  
        ...moduleRoutes,
    
]
