import React from 'react';
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Div from "@jumbo/shared/Div";
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import useAuth from '../../../../hooks/useAuth';
import StudentGroup from '../../../../graphql/services/admissions/studentGroup-service';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import { TrainingPartnerServies } from '../../../../graphql/services/trainingpartners/trainingpartnerservices';

const ProgramsCount = () => {
    const { viewer } = useAuth()
    const shopId = window.localStorage.getItem('accounts:shopId');
    const [group, setGroup] = React.useState([])
    const [classes, setClasses] = React.useState([]);
    const [program, setPrograms] = React.useState([]);
    const [institutes, setInstitutes] = React.useState([]);


  
    React.useEffect(async()=>{
        if(viewer?.role=="Admin" ){
        
            const programData= await MyDashboardService.programs(shopId)
            if(programData){
                setPrograms(programData)
            }
        }
        if(viewer?.role=="College-Admin"){
        const groupData =  await StudentGroup.getBatches(shopId, {page:0, limit:8})
        if(groupData){
            setGroup(groupData)
        }
    }
    if(viewer?.role=="Master-Admin"){
        const data =  await TrainingPartnerServies.getTrainingPartnersRecord(shopId, {page:0, limit:8})
        if(data){
            setInstitutes(data)
        }
    }
    if(viewer?.role=="Student"){
        const programData =  await MyDashboardService.getStudentPrograms()
        if(programData){
            setPrograms(programData)
        }
    }

    if(viewer?.role=="Tutor"){
        const data = await MyDashboardService.getTutorClass({
            tutorId: viewer?._id,
            shopId
        });
        if(data){
        setClasses(data?.getTutorBatches)
        }  
    }
    },[shopId])

    return (
        <Card sx={{ height: 115, backgroundImage: 'linear-gradient(135deg, #FBC79A, #D73E68)' }}>
            <CardActions disableSpacing sx={{ p: 0, alignItems: 'stretch', height: '100%' }}>
                <Div
                    sx={{
                        display: 'flex',
                        width: 126,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        backgroundColor: 'common.white',
                        borderRadius: '50%',
                        outline: 'solid 10px rgba(255, 255, 255, 0.2)',
                        margin: '0 10px 0 -60px'
                    }}
                >
                    <Div
                        sx={{
                            display: 'flex',
                            minWidth: 56,
                            height: 56,
                            mr: '6px',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >{viewer?.role == "Tutor" ?
                        <CastForEducationOutlinedIcon sx={{ fontSize: 45 }} /> :
                        <Diversity3OutlinedIcon sx={{ fontSize: 45 }} />}
                    </Div>
                </Div>
                {viewer?.role=="Tutor" ? 
                <CardContent sx={{p: 2.5, flex: 1, alignSelf: 'center'}}>
                 <Typography variant={"h4"} color={"common.white"}>{classes?.length >0? classes?.length:0 }</Typography>
                 <Typography variant={"h5"} color={"common.white"} mb={0}>Classes</Typography>
             </CardContent> : 
             viewer?.role=="College-Admin" ?  
             <CardContent sx={{p: 2.5, flex: 1, alignSelf: 'center'}}>
              <Typography variant={"h4"} color={"common.white"}>{group?.groups?.length > 0 ? group?.groups?.length : 0 }</Typography>
              <Typography variant={"h5"} color={"common.white"} mb={0}>Groups</Typography>
          </CardContent> :
          viewer?.role == "Master-Admin" ?
          <CardContent sx={{p: 2.5, flex: 1, alignSelf: 'center'}}>
              <Typography variant={"h4"} color={"common.white"}>{institutes?.trainingpartners?.length > 0 ? institutes?.trainingpartners?.length : 0 }</Typography>
              <Typography variant={"h5"} color={"common.white"} mb={0}>Institutes</Typography>
          </CardContent>:
                <CardContent sx={{p: 2.5, flex: 1, alignSelf: 'center'}}>
                  
                    <Typography variant={"h4"} color={"common.white"}>{program?.length > 0 ? program?.length : 0}</Typography> 
                    <Typography variant={"h5"} color={"common.white"} mb={0}>Programs</Typography>
                </CardContent>}
            </CardActions>
        </Card>
    );
};

export default ProgramsCount;
