import React, { lazy } from 'react';
import Page from "@jumbo/shared/Page";
import AuthPage from "@jumbo/shared/Page/authPage";

const MiscDashboard = lazy(() => import('../pages/dashboards/misc/MiscDashboard'))
const ListViewPage = lazy(() => import('../pages/list-views/listViewPage/ListViewPage'))
const ShopSettingsRegion = lazy(() => import('../../../../plugins/core/dashboard/client/components/ShopSettingsRegion'))
const Adminprofile = lazy(() => import('../../../../plugins/core/adminprofile/adminProfile'))
const ViewProfile = lazy(() => import('../../../../plugins/core/viewProfile/viewProfile'))
const EditProfile = lazy(() => import('../shared/widgets/AuthUserDropdown/EditProfile'))
const StudentCalendarItem = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/calendars/studentcalendaritem'))
const CalendarEvents = lazy(() => import('../pages/calendarEvents/calendarEvents'))
const StudentAssignmentItem = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/studentassignmentitem'))
const QuizItem = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/quizitem'))
const eventData = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/eventData/eventData'))
const freeQuizzes = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/freeQuizzes'))
const StudentProfile = lazy(() => import("../pages/auth-pages/studentProfile/studentProfile"))
const Error404 = lazy(() => import('../pages/extra-pages/Error404/Error404'))


export default studentRoutes = [

    {
        path: "/dashboard",
        element: <Page component={MiscDashboard} />,
        isAuthRequired: true
    },

    {
        path: "/:webinarId/eventData",
        element: <Page component={eventData} />,
        isAuthRequired: true
    },
    {
        path: "/:programId/lesson-quiz",
        element: <Page component={freeQuizzes} />,
        isAuthRequired: true
    },


    {
        path: "/groups",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/programs",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/myadmissions",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },

    {
        path: "/todaysclass",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/todaysclass/:lessonId/:productId/quiz",
        element: <Page component={QuizItem} />,
        isAuthRequired: true
    },
    {
        path: "/todaysclass/:lessonId/:productId/assignment",
        element: <Page component={StudentAssignmentItem} />,
        isAuthRequired: true
    },
    {
        path: "/calendar",
        element: <Page component={StudentCalendarItem} />,
        isAuthRequired: true
    },
    {
        path: `/calendar/:batchId/:eventId/event`,
        element: <Page component={CalendarEvents} />,
        isAuthRequired: true
    },

    {
        path: "/calendar/:lessonId/assignment",
        element: <Page component={StudentAssignmentItem} />,
        isAuthRequired: true
    },


    {
        path: "/payments",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },

    {
        path: "/webinars",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },

    {
        path: "/settings",
        element: <Page component={ShopSettingsRegion} />,
        isAuthRequired: true
    },
    {
        path: "/notifications",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/notifications/sent",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/notifications/:notificationId/notification",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/profile",
        element: <Page component={Adminprofile} />,
        isAuthRequired: true
    },
    {
        path: "/:userId/profile",
        element: <Page component={Adminprofile} />,
        isAuthRequired: true
    },
    {
        path: "/:userId/viewprofile",
        element: <Page component={ViewProfile} />,
        isAuthRequired: true
    },
    {
        path: "/profile/edit-profile",
        element: <Page component={EditProfile} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/aptitude",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/technical",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/modelpapers",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/competitivepreep/entranceexam",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/competitivepreep/modelpapers",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/user/set-studentProfile",
        element: <AuthPage component={StudentProfile} layout={"solo-page"} />,
        isAuthRequired:false
    },


]
