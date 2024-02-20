import React from 'react';
import List from "@mui/material/List";
import {ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import styled from "@emotion/styled";
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
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

function ProfileAchievements() {
    
    const {viewer} =useAuth()

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    };

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
                        width: {xs: '100%', sm: '50%', xl: '50%'}
                    }}
                >
                    <StyledListItemIcon>
                        <WorkspacePremiumOutlinedIcon fontSize={"inherit"}/>
                    </StyledListItemIcon>
                    <ListItemText
                        primary={<Typography fontSize={"12px"} variant="h6" color="text.secondary" mb={.5}>
                            Awards & Recognization</Typography>}
                       
                    />
                </ListItem>
            
                
            </List>
            {viewer?.profile?.achievements?.map((course, index) => (
            <Typography variant="body1"   color="text.primary"  title={course} style={{paddingLeft:'80px',}} key={index} >
           
           <MilitaryTechOutlinedIcon fontSize='small' style={{marginBottom:'-6px'}}/> {truncateText(course, 80)}
           
           </Typography>
           ))}
    </div>
  )
}

export default ProfileAchievements