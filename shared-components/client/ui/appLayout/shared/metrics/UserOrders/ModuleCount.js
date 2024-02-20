import React from 'react';
import Div from "@jumbo/shared/Div";
import {Avatar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {Card, CardActions, CardContent} from "@mui/material";
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import useAuth from '../../../../hooks/useAuth';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';



const ModuleCount = () => {
    
    const {viewer} = useAuth()
    const {shopId} = useCurrentShopId()
    const [projects, setProjects] = React.useState([])
    const [module,setModule] = React.useState([]);
    const [dbModules,setDbModules] = React.useState([]);
    const [classes,setClasses] = React.useState([]);
    const [programs,setPrograms] = React.useState([]);

    
  
    React.useEffect(async () => {
        if(viewer?.role=="Admin" ){
        
            const  modulesData = await MyDashboardService.dashBoardModules(shopId)
            if(modulesData){
            setDbModules(modulesData)
        }
    }
        if(viewer?.role=="College-Admin"){
        if (shopId) {
          const records = await MyProgramService.getRecords(shopId,{page:0,limit:8});
         
          let projects = [];
      
          for (let i = 0; i < records?.all.length; i++) {
            if (records?.all[i].type === "projects") {
              projects.push(records?.all[i]);
            }
          }
          setProjects(projects);
        }
    }
    if(viewer?.role=="Tutor"){
        
            const  moduleData = await MyDashboardService.getTutorModules(shopId)
            if(moduleData){
            setModule(moduleData)
            }  
        
    }
    if(viewer?.role=="Master-Admin"){
        
        const  data = await MyDashboardService.defaultProgramsQuery()
        if(data){
            setPrograms(data)
        }  
    
}
    if(viewer?.role=="Student"){
        
        const  classData = await MyDashboardService.getStudentClasses(shopId)
        if(classData){
        setClasses(classData)
        }  
    
}
      }, [shopId]);

    const {t} = useTranslation();
    return (
        <Card sx={{height: 115, backgroundImage: 'linear-gradient(135deg, #FBC79A, #D73E68)'}}>
        <CardActions disableSpacing sx={{p: 0, alignItems: 'stretch', height: '100%'}}>
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
                >{viewer?.role=="Student" ?
                <CastForEducationOutlinedIcon sx={{fontSize: 45}}/> :
                viewer?.role=="Master-Admin" ?
                <Diversity3OutlinedIcon sx={{fontSize: 45}}/> :
                    <MenuBookOutlinedIcon sx={{fontSize: 45}}/>}
                </Div>
            </Div>
            <CardContent sx={{p: 2.5, flex: 1, alignSelf: 'center'}}>
            {viewer?.role=="Tutor" ? 
                <Typography variant={"h4"} color={"common.white"}>{module?.tutorProducts?.length > 0 ? module?.tutorProducts?.length : 0}</Typography> :
            viewer?.role=="Student" ?  
                <Typography variant={"h4"} color={"common.white"}>{classes?.length > 0 ? classes?.length : 0}</Typography> :
                viewer?.role=="College-Admin" ? 
                <Typography variant={"h4"} color={"common.white"}>{projects?.length > 0 ? projects?.length : 0}</Typography>:
                viewer?.role=="Master-Admin" ?
                <Typography variant={"h4"} color={"common.white"}>{programs?.defaultPrograms?.length > 0 ? programs?.defaultPrograms?.length : 0}</Typography>:
                <Typography variant={"h4"} color={"common.white"}>{dbModules?.length > 0 ? dbModules?.length : 0}</Typography>}
                {viewer?.role=="Student" ? 
                <Typography variant={"h5"} color={"common.white"} mb={0}>Classes</Typography> :
                viewer?.role=="College-Admin" ? 
                <Typography variant={"h5"} color={"common.white"} mb={0}>Projects</Typography> :
                viewer?.role=="Master-Admin" ?
                <Typography variant={"h5"} color={"common.white"} mb={0}>Programs</Typography> :
                <Typography variant={"h5"} color={"common.white"} mb={0}>Modules</Typography>}
            </CardContent>
        </CardActions>
    </Card>
    );
};

export default ModuleCount;
