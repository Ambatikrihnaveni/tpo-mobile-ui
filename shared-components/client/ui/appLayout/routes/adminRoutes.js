import React, { lazy } from 'react';
import Page from "@jumbo/shared/Page";
import moduleRoutes from '../../../../plugins/core/Modules'
import AuthPage from "@jumbo/shared/Page/authPage";



const MiscDashboard = lazy(() => import('../pages/dashboards/misc/MiscDashboard'))
const ListViewPage = lazy(() => import('../pages/list-views/listViewPage/ListViewPage'))
const TP_Certificates = lazy(() => import('../../../../plugins/core/certificates/TP_certificate/TP_Certificates'))
const ShopSettingsRegion = lazy(() => import('../../../../plugins/core/dashboard/client/components/ShopSettingsRegion'))
const Adminprofile = lazy(() => import('../../../../plugins/core/adminprofile/adminProfile'))
const ViewProfile = lazy(() => import('../../../../plugins/core/viewProfile/viewProfile'))
const EditProfile = lazy(() => import('../shared/widgets/AuthUserDropdown/EditProfile'))
const InviteTutor = lazy(() => import('../../../../client/ui/appLayout/pages/auth-pages/reset-password/inviteTutor'))
const AddProgram = lazy(() => import('../../../../plugins/core/programs/client/addProgram'))
const acceptedData = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/webinarAccept/acceptedData'))



export default adminRoutes = [

    {
        path: "/dashboard",
        element: <Page component={MiscDashboard} />,
        isAuthRequired: true
    },
    {
        path: "/:webinarId/acceptedData",
        element: <Page component={acceptedData} />,
        isAuthRequired: true

    },
    {
        path: "/students",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },

    {
        path: "/tutors",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/modules",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/myprograms",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/programs/:program_id/addprogram",
        element: <Page component={AddProgram} />,
        isAuthRequired: true
    },
    {
        path: "/programs/:program_id/editprogram",
        element: <Page component={AddProgram} />,
        isAuthRequired: true
    },
    {
        path: "/admissions",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/payments/received",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/webinars/join",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },

    {
        path: "/payments/manualPayments",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/payments/transactions",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/webinars",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/mycertificates",
        element: <Page component={TP_Certificates} />,
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
        path: "/inviteuser",
        element: <Page component={InviteTutor} />,
        isAuthRequired: true
    },
    ...moduleRoutes,

]

