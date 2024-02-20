import React, { useState } from 'react';
import List from "@mui/material/List";
import { ListItemIcon, Typography, Card ,Tooltip} from "@mui/material";
import styled from "@emotion/styled";
import useAuth from '../../../../../hooks/useAuth';
import SchoolIcon from '@mui/icons-material/School';
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

const StudentEducation = () => {
       ;
    const { viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);

 

    const Education = [
        {
            qualification: 'SSC-90%',
            schoolname: 'ZphS-School',
            location: 'Gundlapalli',
            year: '2013-2014'
        },
        {
            qualification: 'Intermediate-90%',
            schoolname: 'Srivenkateswara Jr College ',
            location: 'Nekarikallu',
            year: '2014-2026'
        },
        {
            qualification: 'B-Tech',
            schoolname: 'Sai Tirumala NVR Engineering College',
            location: 'Narasaraopet',
            year: '2016-2020'
        },
    ];

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
                {viewer?.profile?.qualifications?.map((data, index) => (
                    <Card
                        key={index}
                        elevation={3} 
                        sx={{
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            textAlign: 'center', 
                            width: "200px",
                            marginBottom: '16px', 
                            padding: '16px',
                            //boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)', 
                            boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.4)',
                            margin: '10px',
                        }}
                    >
                        <StyledListItemIcon>
                            <SchoolIcon fontSize={"inherit"} />
                        </StyledListItemIcon>
                        <div>
                            <h4>{data.qualification}</h4>
                          
                            <span style={{ display: 'flex', alignItems: 'center', }}>
                            <SchoolIcon fontSize='small' sx={{color:'#08d1c4'}}/>&nbsp;
                            <Tooltip title={data.instituteName}
                                    placement='top'
                                    arrow
                                    PopperProps={{
                                        style: {
                                            maxWidth: '175px', 
                                            height: 'auto',  
                                        },
                                    }}>
                            <Typography className="custom-tooltip-title" >
                            {data.instituteName.length > 18 ? data.instituteName.slice(0, 18) +  '...' : data.instituteName} 
                           </Typography>
                        </Tooltip>
                             </span>

                            <span style={{ display: 'flex', alignItems: 'center', }}>
                            <LocationOnIcon fontSize='small' sx={{color:'#08d1c4'}}/>&nbsp;
                            <Typography> {data.location}</Typography>

                             </span>

                            <Typography> {data.year_of_passing}</Typography>
                        </div>
                    </Card>
                ))}
            </List>
        </div>
    );
};

export default StudentEducation;