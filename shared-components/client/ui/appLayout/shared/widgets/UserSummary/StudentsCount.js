import React from 'react';
import { useTranslation } from "react-i18next";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import PersonIcon from '@mui/icons-material/Person';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import useAuth from '../../../../hooks/useAuth';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';



const StudentsCount = () => {
    const { viewer } = useAuth()
    const { shopId } = useCurrentShopId()
    const [courses, setCourses] = React.useState([])
    const [students, setStudents] = React.useState([]);
    const [MaStudents, setMaStudents] = React.useState([]);


    React.useEffect(async () => {

        if (viewer?.role == "Admin") {

            const studentData = await MyDashboardService.instituteStudents(shopId)
            if (studentData) {
                setStudents(studentData)
            }
        }
        if (viewer?.role == "Master-Admin") {

            const studentData = await MyDashboardService.getAllStudents()
            if (studentData) {
                setMaStudents(studentData)
            }
        }
        if (viewer?.role == "College-Admin") {
            if (shopId) {
                const records = await MyProgramService.getRecords(shopId, { page: 0, limit: 8 });
                let courses = [];

                for (let i = 0; i < records?.all.length; i++) {
                    if (records?.all[i].type === "courses") {
                        courses.push(records?.all[i]);
                    }
                }
                setCourses(courses);
            }
        }
        if (viewer?.role == "Tutor") {
            const studentsData = await MyDashboardService.tutorStudents(shopId)
            if (studentsData) {
                setStudents(studentsData)
            }
        }
    }, [shopId]);

    const { t } = useTranslation();
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
                    }}>
                        {viewer?.role == "College-Admin" ?
                            <Diversity3OutlinedIcon sx={{ fontSize: 45 }} /> :
                            <PersonIcon sx={{ fontSize: 45 }} />}
                    </Div>

                </Div>
                <CardContent sx={{ p: 2.5, flex: 1, alignSelf: 'center' }}>
                    {viewer?.role == "Tutor" ?
                        <Typography variant={"h4"} color={"common.white"}>{students?.length > 0 ? students?.length : 0}</Typography> :
                        viewer?.role == "College-Admin" ?
                            <Typography variant={"h4"} color={"common.white"}>{courses?.length > 0 ? courses?.length : 0}</Typography> :
                            viewer?.role == "Master-Admin" ?
                                <Typography variant={"h4"} color={"common.white"}>{MaStudents?.length > 0 ? MaStudents?.length : 0}</Typography> :
                                <Typography variant={"h4"} color={"common.white"}>{students?.length > 0 ? students?.length : 0}</Typography>
                    }
                    {viewer?.role == "College-Admin" ?
                        <Typography variant={"h5"} color={"common.white"} mb={0}>Courses</Typography> :
                        <Typography variant={"h5"} color={"common.white"} mb={0}>Students</Typography>}
                </CardContent>
            </CardActions>
        </Card>
    );
};

export default StudentsCount;
