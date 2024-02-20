import React, { lazy } from 'react';
import Page from "@jumbo/shared/Page";
import moduleRoutes from '../../../../plugins/core/Modules'
import AuthPage from "@jumbo/shared/Page/authPage";


const MiscDashboard = lazy(() => import('../pages/dashboards/misc/MiscDashboard'))
const ListViewPage = lazy(() => import('../pages/list-views/listViewPage/ListViewPage'))
const MA_Certificates = lazy(() => import('../../../../plugins/core/certificates/MA_certificates'))
const ShopSettingsRegion = lazy(() => import('../../../../plugins/core/dashboard/client/components/ShopSettingsRegion'))
const Adminprofile = lazy(() => import('../../../../plugins/core/adminprofile/adminProfile'))
const ViewProfile = lazy(() => import('../../../../plugins/core/viewProfile/viewProfile'))
const EditProfile = lazy(() => import('../shared/widgets/AuthUserDropdown/EditProfile'))
const PlacementCreat = lazy(() => import('../../../../client/ui/appLayout/pages/placement_prep/aptitude/components/placementCreat.js'))
const createCompetitive = lazy(() => import('../../../../client/ui/appLayout/pages/competitive_Prep/entranceexam/enterenceExams/components/createCompetitive'))
const acceptedData = lazy(() => import('../pages/list-views/listViewPage/components/RecordsList/webinarAccept/acceptedData.js'))



export default masterAdminRoutes = [

    {
        path: "/dashboard",
        element: <Page component={MiscDashboard} />,
        isAuthRequired: true
    },

    {
        path: "/students",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/modules",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/:webinarId/acceptedData",
        element: <Page component={acceptedData} />,
        isAuthRequired: true

    },
    {
        path: "/programsList",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/collegeadmins",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/trainingpartners",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/payments/received",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/payments/payable",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/payments/transactions",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/announcement",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/webinars",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/aptitude",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/aptitude/createaptitude",
        element: <Page component={PlacementCreat} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/aptitude/:aptitudeId/editaptitude",
        element: <Page component={PlacementCreat} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/technical",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/technical/createtechnical",
        element: <Page component={PlacementCreat} />,
        isAuthRequired: true
    },
    {
        path: "/placementpreep/technical/:aptitudeId/edittechnical",
        element: <Page component={PlacementCreat} />,
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
        path: "/competitivepreep/entranceexam/:entranceexamId/edit",
        element: <Page component={createCompetitive} />,
        isAuthRequired: true
    },
    {
        path: "/competitivepreep/entranceexam/createentrance",
        element: <Page component={createCompetitive} />,
        isAuthRequired: true
    },
    {
        path: "/competitivepreep/modelpapers",
        element: <Page component={ListViewPage} />,
        isAuthRequired: true
    },


    {
        path: "/certificates",
        element: <Page component={MA_Certificates} />,
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
    ...moduleRoutes,

]
