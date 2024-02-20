import React from 'react';
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import TutorIcon from "mdi-material-ui/AccountTie";
import Div from "@jumbo/shared/Div";
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined';
import useAuth from '../../../../hooks/useAuth';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import StudentsService from '../../../../graphql/services/students/students-service';
import { CollegeAdmin } from '../../../../graphql/services/college-admin/collegeAdmin-services';


const TutorCount = () => {
    const { viewer } = useAuth()
    const { shopId } = useCurrentShopId()
    const [tutors, setTutors] = React.useState([]);
    const [group, setGroup] = React.useState([]);
    const [student, setStudent] = React.useState([]);
    const [colleges, setColleges] = React.useState([]);




    React.useEffect(async () => {
        if (viewer?.role == "Admin") {
            const data = await MyDashboardService.dashbordTutors(shopId)
            if (data) {
                setTutors(data)
            }
        }
        if (viewer?.role == "Student") {

            const data = await MyDashboardService.getStudentGroups(shopId)
            if (data) {
                setGroup(data)
            }
        }
        if (viewer?.role == "Master-Admin") {

            const data = await CollegeAdmin.getCollegeAdminRecords(shopId, { page: 0, limit: 0 })
            if (data) {
                setColleges(data)
            }
        }
        if (viewer?.role == "College-Admin") {

            const data = await StudentsService.getStudents(shopId)
            if (data) {
                setStudent(data)
            }
        }
    }, [shopId])
    return (
        <Card sx={{ height: 115, backgroundImage: 'linear-gradient(135deg, #38B8F2, #843CF6)' }}>
            <CardActions disableSpacing sx={{ p: 0, alignItems: 'stretch', height: '100%' }}>
                <Div sx={{
                    display: 'flex',
                    width: 126,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'common.white',
                    borderRadius: '50%',
                    outline: 'solid 10px rgba(255, 255, 255, 0.2)',
                    margin: '0 10px 0 -60px'
                }}>
                    <Div sx={{
                        display: 'flex',
                        minWidth: 56,
                        height: 56,
                        mr: '6px',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>{viewer?.role == "Tutor" ? <DvrOutlinedIcon sx={{ fontSize: 45 }} /> :
                        viewer?.role == "Student" ? <Diversity2OutlinedIcon sx={{ fontSize: 45 }} /> :
                            <TutorIcon sx={{ fontSize: 45 }} />}
                    </Div>

                </Div>
                {viewer?.role == "Tutor" ?
                    <CardContent sx={{ p: 2.5, flex: 1, alignSelf: 'center' }}>
                        <Typography variant={"h4"} color={"common.white"}>{viewer?.shopId?.length}</Typography>
                        <Typography variant={"h5"} color={"common.white"} mb={0}>Institutes</Typography>
                    </CardContent> : viewer?.role == "Student" ?
                        <CardContent sx={{ p: 2.5, flex: 1, alignSelf: 'center' }}>
                            <Typography variant={"h4"} color={"common.white"}>{group?.length > 0 ? group?.length : 0}</Typography>
                            <Typography variant={"h5"} color={"common.white"} mb={0}>Groups</Typography>
                        </CardContent> :
                        viewer?.role == "College-Admin" ?
                            <CardContent sx={{ p: 2.5, flex: 1, alignSelf: 'center' }}>
                                <Typography variant={"h4"} color={"common.white"}>{student?.students?.length > 0 ? student?.students?.length : 0}</Typography>
                                <Typography variant={"h5"} color={"common.white"} mb={0}>Students</Typography>
                            </CardContent> :
                            viewer?.role == "Master-Admin" ?
                                <CardContent sx={{ p: 2.5, flex: 1, alignSelf: 'center' }}>

                                    <Typography variant={"h4"} color={"common.white"}>{colleges?.collegeadmins?.length > 0 ? colleges?.collegeadmins?.length : 0}</Typography>

                                    <Typography variant={"h5"} color={"common.white"} mb={0}>Colleges</Typography>
                                </CardContent> :
                                <CardContent sx={{ p: 2.5, flex: 1, alignSelf: 'center' }}>

                                    <Typography variant={"h4"} color={"common.white"}>{tutors?.length > 0 ? tutors?.length : 0}</Typography>

                                    <Typography variant={"h5"} color={"common.white"} mb={0}>Tutors</Typography>
                                </CardContent>}
            </CardActions>
        </Card>
    );
};

export default TutorCount;
