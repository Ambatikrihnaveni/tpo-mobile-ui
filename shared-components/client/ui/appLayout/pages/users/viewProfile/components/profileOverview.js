import React, {useState} from 'react';
import List from "@mui/material/List";
import {ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styled from "@emotion/styled";
import useAuth from '../../../../../hooks/useAuth';

const StyledListItemIcon = styled(ListItemIcon)(({theme}) => ({
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
     

    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    const students = (props?.viewer?.students) ? props?.viewer?.students: 0;
    const tutors = (props?.tutors) ? props?.tutors?.length : 0;
    const programs = (props?.viewer?.programs)? props?.viewer?.programs?.length : 0 
    ;

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
                    {props?.viewer?.adminUIShops[0]?.name}</Typography>}
            />
        </ListItem>
        <ListItem
            sx={{
                width: { xs: '100%', sm: '50%', xl: '33.33%' }
            }}
        >
            <StyledListItemIcon>
                <Diversity3Icon fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary"
                    mb={.5}>No.Of Programs</Typography>}
                secondary={<Typography variant="body1" color="text.primary">{programs}</Typography>}
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
                secondary={<Typography variant="body1" color="text.primary">{students}</Typography>}
            />
        </ListItem>
        <ListItem
            sx={{
                width: { xs: '100%', sm: '50%', xl: '33.33%' }
            }}
        >
            <StyledListItemIcon>
                <PermIdentityIcon fontSize={"inherit"} />
            </StyledListItemIcon>
            <ListItemText
                primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>No.Of Tutors</Typography>}
                secondary={
                    <Typography variant="body1" color="text.primary">{tutors}</Typography>}
            />
        </ListItem>
        <ListItem
            sx={{
                width: { xs: '100%', sm: '50%', xl: '33.33%' }
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
                secondary={<Typography variant="body1" color="text.primary">{userdata?.primaryEmailAddress}</Typography>}
            />
        </ListItem>
    </List>
</div>
  )
}

export default ProfileOverview