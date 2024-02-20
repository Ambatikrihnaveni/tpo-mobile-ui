import React from 'react';
import List from "@mui/material/List";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DvrOutlinedIcon from '@mui/icons-material/DvrOutlined';
import styled from "@emotion/styled";
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
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


function ProfileCourses(record) {
    
const {viewer} = useAuth()
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
                        <DvrOutlinedIcon fontSize={"inherit"} />
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Courses Offered</Typography>
                        }
                    />
                </ListItem>


            </List>
            {record?.viewer.profile?.coursesOffered?.map((course, index) => (
                <Typography variant="body1" itemData={record} color="text.primary" style={{ paddingLeft: '85px'}} key={index}>

                    <CastForEducationOutlinedIcon fontSize='small' style={{ marginBottom: '-4px', marginRight: '3px' }} /> {course}

                </Typography>
            ))}
        </div>
    )
}

export default ProfileCourses