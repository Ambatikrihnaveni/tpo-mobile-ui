import React from 'react';
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Div from "@jumbo/shared/Div";
import useAuth from '../../../../hooks/useAuth';
import MyProgramService from '../../../../graphql/services/programs/myProgram-services';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';



const InternshipCount = () => {
    const {viewer} = useAuth()
    const { shopId } = useCurrentShopId()
    const [internships, setInternships] = React.useState([])

    
    React.useEffect(async () => {
        if(viewer?.role=="College-Admin"){
        if (shopId) {
          const records = await MyProgramService.getRecords(shopId,{page:0,limit:8});
          let internships = [];
          
      
          for (let i = 0; i < records?.all.length; i++) {
            if (records?.all[i].type === "internships") {
              internships.push(records?.all[i]);
            } 
          }
          setInternships(internships);
          
        }
    }
      }, []);

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
                    >
                        <Diversity3OutlinedIcon sx={{fontSize: 45}}/>
                    </Div>
                </Div>
                
                <CardContent sx={{p: 2.5, flex: 1, alignSelf: 'center'}}>
                { <Typography variant={"h4"} color={"common.white"}>{internships?.length > 0 ? internships?.length : 0 }</Typography>}
                 <Typography variant={"h5"} color={"common.white"} mb={0}>Internships</Typography>
             </CardContent> :
               
            </CardActions>
        </Card>
    );
};

export default InternshipCount;
