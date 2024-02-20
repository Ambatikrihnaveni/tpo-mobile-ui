import React, { useState } from 'react';
import List from "@mui/material/List";
import {  ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styled from "@emotion/styled";
import useAuth from "/imports/client/ui/hooks/useAuth";
import MyDashboardService from '../../../../../graphql/services/dashboard/dashboard-services';
import StudentsService from '../../../../../graphql/services/students/students-service';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
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

const ProfileOverview = (props) => {
       
    const shopId = window.localStorage.getItem('accounts:shopId');
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    const tutors = props?.tutors ? props?.tutors?.length : 0;
    const [programs, setPrograms] = React.useState([]);
    const [students, setStudents] = React.useState([]);

    
    React.useEffect(async()=>{
        if(viewer?.role=="College-Admin" ){
        
            const programData= await MyDashboardService.getPrograms(shopId)
            if(programData){
                setPrograms(programData)
            }
            const studentData= await StudentsService.getStudents(shopId)
            if(studentData){
                setStudents(studentData)
            }
        }
      
   

   
    },[shopId]);

    const string = userdata.primaryEmailAddress
    const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 25);
    return (
        <div>
            <List
                disablePadding
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: theme => theme.spacing(0, -2),
                }}
            >
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <BusinessIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Institute Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">
                            {userdata.adminUIShops[0]?.name}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '30%' }
                    }}
                >
                    <StyledListItemIcon>
                        <Diversity3Icon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary"
                            mb={.5}>No.Of Programs</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{programs.length > 0 ? programs.length : 0}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <PersonIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>No.Of Students</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{students?.students?.length > 0 ? students?.students?.length : 0}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <BusinessIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>College Type</Typography>}
                        secondary={    
                            <ul style={{ paddingLeft: '0', marginLeft: '15px',color:'#525050' }}>
                {viewer?.profile?.collegeSpecializations?.map((collegeSpecializations, innerIndex) => (
                  <li key={innerIndex}>
                    {`${collegeSpecializations}`}
                  </li>
                ))}
              </ul>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '30%' }
                    }}
                >
                    <StyledListItemIcon>
                        <LocationOnOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Address</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{userdata.profile?.city && userdata.profile?.country && (
                            <>
                                {userdata.profile.city}, {userdata.profile.country}
                            </>
                        )}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <EmailOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Email</Typography>}
                        secondary={
                            <Tooltip key={i} title={userdata.primaryEmailAddress} placement='top'>
                        <Typography variant="body1" color="text.primary">{truncateName}
                        </Typography>
                        </Tooltip>
                        }
                    />
                </ListItem>
            </List>
        </div>
    )
}

export default ProfileOverview