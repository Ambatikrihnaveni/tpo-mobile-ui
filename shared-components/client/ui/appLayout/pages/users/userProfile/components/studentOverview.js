import React, { useState } from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styled from "@emotion/styled";
import useAuth from '../../../../../hooks/useAuth';

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

const StudentOverview = (props) => {
    ;
    const {  viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);

    const lastQualificationIndex = viewer?.profile?.qualifications?.length - 1;
    const programs = (viewer?.programs) ? (viewer?.programs?.length) : 0 ;

    
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
                            FullName</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">
                            {viewer?.name}</Typography>}
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
                            mb={.5}>Hall Ticket Number</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{viewer?.profile?.hallTicketNumber}</Typography>}
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
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>College Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary"> {viewer?.profile?.qualifications ? viewer?.profile?.qualifications[lastQualificationIndex]?.instituteName : ''}</Typography>}
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
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Father Name</Typography>}
                        secondary={
                            <Typography variant="body1" color="text.primary"> {viewer?.profile?.fatherName}</Typography>}
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
                        secondary={<Typography variant="body1" color="text.primary"> {viewer?.profile?.city}-{viewer?.profile?.country}</Typography>}
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
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Programs</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{programs}</Typography>}

                    />
                </ListItem>
            </List>
        </div>
    )
}

export default StudentOverview