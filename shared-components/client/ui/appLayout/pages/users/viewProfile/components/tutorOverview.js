import React, { useState } from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import styled from "@emotion/styled";

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

const TutorOverview = (props) => {
    const [user, setUser] = useState(props?.viewer);
    const userdata = { ...props?.viewer }
    const students = (props?.viewer?.students) ? props?.viewer?.students : 0;
    const tutors = (props?.tutors) ? props?.tutors?.length : 0;


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
                        <LocalLibraryOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Full Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">
                            {userdata?.name}</Typography>}
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
                        secondary={<Typography variant="body1" color="text.primary">{userdata.profile.city}, {userdata.profile.country}</Typography>}
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
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Students Tutored</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{students}</Typography>}
                    />
                </ListItem>
                <ListItem
                    sx={{
                        width: { xs: '100%', sm: '50%', xl: '33.33%' }
                    }}
                >
                    <StyledListItemIcon>
                        <DvrOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Courses</Typography>}
                        secondary={
                            <Typography variant="body1" color="text.primary">5</Typography>}
                    />
                </ListItem>

            </List>
        </div>
    )
}

export default TutorOverview