import React, { useState } from 'react';
import List from "@mui/material/List";
import {  ListItemIcon, Typography, Card,Tooltip } from "@mui/material"
import styled from "@emotion/styled";
import useAuth from '../../../../../hooks/useAuth';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 26,
    height: 48,
    width: 48,
    borderRadius: '50%',
    minWidth: 42,
    marginRight: 16,
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    border: `solid 1px ${theme.palette.divider}`
}));

const StudentWork = (props) => {
      ;
    const { viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);

    return (
        <div>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                    '@media (max-width: 768px)': {
                        justifyContent: 'center',
                      },
                }}
            >
                {viewer?.profile?.experiences?.map((data, index) => (
                    <Card
                        key={index}
                        elevation={3} 
                        sx={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                           // width: { xs: '100%', sm: 'calc(50% - 8px)', xl: 'calc(33.33% - 16px)' }, 
                            marginBottom: '16px', 
                            padding: '16px',
                            width: "200px",
                            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)',
                            margin: '8px',
                        }}
                    >
                        <StyledListItemIcon>
                            <WorkIcon fontSize={"inherit"} />
                        </StyledListItemIcon>
                        <div>
                            <h4>{data.jobTitle}</h4>
                             
                            <span style={{ display: 'flex', alignItems: 'center', }}>
                             <WorkIcon fontSize='small' sx={{color:'#08d1c4'}}/>&nbsp;
                             <Tooltip title={data.employer}                                    
                                    placement='top'                                     
                                    arrow
                                    PopperProps={{
                                        style: {
                                            maxWidth: '175px', 
                                            height: 'auto',  
                                        },
                                    }}
                            >
                             <Typography> {data?.employer?.length> 18 ? data.employer.slice(0,18) + "..." :data.employer}</Typography>
                             
                             </Tooltip>
                            </span>

                            
                             <span style={{ display: 'flex', alignItems: 'center', }}>
                             <LocationOnIcon fontSize='small' sx={{color:'#08d1c4'}}/>&nbsp;
                             <Typography> {data.company_location}</Typography>

                             </span>

                            <Typography> {data?.start_year}-{data?.end_year}</Typography>
                        </div>
                    </Card>
                ))}
            </List>
        </div>
    );
};

export default StudentWork;