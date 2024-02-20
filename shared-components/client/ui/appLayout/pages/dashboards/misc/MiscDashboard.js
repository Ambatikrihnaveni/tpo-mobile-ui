import React, { useState } from 'react';
import { Grid } from "@mui/material";
import DashboardWebinars from './dashboardWebinars';
import SalesOverview from "../../../shared/metrics/SalesOverview";
import TutorCount from '../../../shared/widgets/Documents1/TutorCount';
import ProgramsCount from '../../../shared/widgets/Ideas1/ProgramsCount';
import ModuleCount from '../../../shared/metrics/UserOrders/ModuleCount';
import StudentsCount from '../../../shared/widgets/UserSummary/StudentsCount';
import ScheduleCard from "../../../shared/widgets/ScheduleCard";
import SalesStatistics from "../../../shared/metrics/SalesStatistics";
import MarketingCampaign from "../../../shared/widgets/Dashboard Programs";
import useAuth from '../../../../hooks/useAuth';
import DashboardTPProgramAssigned from '../../../shared/widgets/dashbordTPProgramAssigned/dashbordTPProgramAssigned';
import DashboardTutorClass from '../../../shared/widgets/dashbordTutorClass/dashbordTutorClass';
import DashboardTutors from '../../../shared/widgets/LatestAlerts/dashboardTutors';
import DashbordEnerolledPrograms from '../../../shared/widgets/dashbordStudentEnerolledPrograms /dashbordStudentEnerolledPrograms ';
import DashboardTutorModules from '../../../shared/widgets/DashboardTutorModules';
import StudentDbPaymentHistory from '../../../shared/widgets/dashboard paymenthistory/studentDBpaymenthistory';
import InternshipCount from '../../../shared/widgets/internship/internshipCount';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import MasterADPaymentHistory from '../../../shared/metrics/SalesStatistics/masterADpaymenthistory';
import MasterAdOngoingPrograms from '../../../shared/metrics/SalesStatistics/mdOngoingPrograms';
import DashbordMasterAPrograms from '../../../shared/widgets/dashbordMAPrograms/dashbordMasterAPrograms';
import MAColleges from '../../../shared/widgets/MA Colleges';
import TrainingPartner from '../../../shared/widgets/MA Training Partners/trainingpartner';

const MiscDashboard = () => {

    const { viewer } = useAuth()
    const [receivedPayments, setReceivedPayments] = useState([])
    const [upcomingPayments, setupComingPayments] = useState([])
    const accountId = viewer?._id
    const role = viewer?.role
    React.useEffect(async () => {

        if (viewer?.role == "Admin" || viewer?.role == "Master-Admin") {
            const upcoming = await MyDashboardService.getUpcomingPayments(accountId, role)
            if (upcoming) {
                const upcomingData = []
                for (let i = 0; i < upcoming.length; i++) {
                    if (upcoming[i].isPayment === true && upcoming[i].transferredPaymentsStatus === "Pending") {
                        upcomingData.push({ price: upcoming[i].price, date: upcoming[i].date })
                    }
                }
                setupComingPayments(upcomingData)
            }
            const received = await MyDashboardService.getReceivedPayments(accountId, role)
            if (received) {
                const receivedData = []
                for (let i = 0; i < received.length; i++) {
                    if (received[i].isPayment === true && received[i].transferredPaymentsStatus === "Settled") {
                        receivedData.push({ price: received[i].price, date: received[i].date })
                    }
                }
                setReceivedPayments(receivedData)
            }
        }

    }, [])

    return (
        <Grid container spacing={3.75}>
            {(viewer?.role == "Master-Admin") &&
                <>
                    <Grid item xs={12} lg={6}>
                        <SalesOverview upcomingPayments={upcomingPayments} receivedPayments={receivedPayments} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12} sm={6} lg={12}>
                                <TutorCount />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={12}>
                                <ModuleCount />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12} sm={6} lg={12}>
                                <ProgramsCount />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={12}>
                                <StudentsCount />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        {/*                 <LatestAlerts/>
 */}                <DashbordMasterAPrograms />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3.5}>
                        <MAColleges />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3.5}>
                        <TrainingPartner />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <MasterAdOngoingPrograms scrollHeight={428} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <MasterADPaymentHistory />
                    </Grid>
                </>
            }
            {(viewer?.role == "Admin") &&
                <>
                    <Grid item xs={12}>
                        <DashboardWebinars />

                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <SalesOverview upcomingPayments={upcomingPayments} receivedPayments={receivedPayments} />
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12} sm={6} lg={12}>
                                <TutorCount />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={12}>
                                <ProgramsCount />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12} sm={6} lg={12}>
                                <ModuleCount />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={12}>
                                <StudentsCount />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        {/*                 <LatestAlerts/>
 */}                <DashboardTutors />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        <DashboardTPProgramAssigned />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ScheduleCard />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <MarketingCampaign scrollHeight={428} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <SalesStatistics upcomingPayments={upcomingPayments} receivedPayments={receivedPayments} />
                    </Grid>
                </>
            }
            {(viewer?.role == "Tutor") &&
                <>
                    <Grid item xs={12}>
                        <DashboardWebinars />

                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12} sm={12}>
                                <Grid container spacing={2.75}>
                                    <Grid item xs={12} sm={3}>
                                        <TutorCount />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ModuleCount />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <StudentsCount />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <ProgramsCount />
                                    </Grid>
                                </Grid>

                            </Grid>

                            <Grid item xs={12} sm={6} lg={7}>
                                <DashboardTutorClass />
                            </Grid>

                            <Grid item xs={12} md={6} lg={5}>
                                <DashboardTutorModules />
                            </Grid>


                        </Grid>

                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <ScheduleCard />
                    </Grid>
                </>
            }
            {(viewer?.role == "College-Admin") &&
                <>
                    <Grid item xs={12} >
                        <DashboardWebinars />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12} sm={12}>
                                <Grid container spacing={3.75}>
                                    <Grid item xs={12} sm={2}>
                                        <ProgramsCount />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <TutorCount />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <InternshipCount />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <StudentsCount />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <ModuleCount />
                                    </Grid>
                                </Grid>
                            </Grid>



                        </Grid>

                    </Grid>

                    <Grid item xs={12} lg={12}>
                        <Grid container spacing={3.5}>
                            <Grid item xs={12} md={6} lg={8}>
                                <StudentDbPaymentHistory />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <DashbordEnerolledPrograms />
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            }
            {(viewer?.role == "Student") &&
                <>
                    <Grid item xs={12} sm={12} >
                        <DashboardWebinars />
                    </Grid>
                    <Grid item xs={12} lg={9}>
                        <Grid container spacing={3.75}>
                            <Grid item xs={12}>
                                <Grid container spacing={3.7}>
                                    <Grid item xs={12} sm={4} >
                                        <ProgramsCount />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <TutorCount />
                                    </Grid>
                                    <Grid item xs={12} sm={4} >
                                        <ModuleCount />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} md={6} lg={7}>
                                <StudentDbPaymentHistory />
                            </Grid>
                            <Grid item xs={12} md={6} lg={5}>
                                <DashbordEnerolledPrograms />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <ScheduleCard />
                    </Grid>
                </>
            }

        </Grid>
    );
};

export default MiscDashboard;
