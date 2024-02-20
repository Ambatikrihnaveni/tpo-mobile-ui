import React, { useState } from 'react';
import List from "@mui/material/List";
import {  ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import styled from "@emotion/styled";
import useAuth from "/imports/client/ui/hooks/useAuth";

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

const ManagementDetails = (props) => {
       
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    const students = props?.students ? props?.students?.length : 0;
    const tutors = props?.tutors ? props?.tutors?.length : 0;
    const programs = props?.program?.all?.length ? props?.program?.all?.length : 0

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
                        width: { xs: '100%', sm: '100%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <PersonIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Name</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">
                            {viewer?.profile?.collegeAdminName}</Typography>}
                    />
                </ListItem>
              
                <ListItem
                    sx={{
                        width: { xs: '100%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <EmailOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Email</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{viewer?.profile?.collegeAdminEmail}</Typography>}

                    />
                </ListItem>

                <ListItem
                    sx={{
                        width: { xs: '100%', xl: '100%' }
                    }}
                >
                    <StyledListItemIcon>
                        <Diversity3Icon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>Designation</Typography>}
                        secondary={<Typography variant="body1" color="text.primary">{viewer?.profile?.collegeAdmindesignation}</Typography>}

                    />
                </ListItem>
            </List>
        </div>
    )
}

export default ManagementDetails