import React from 'react';
import {Avatar, LinearProgress, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import {menuItems, projects} from "./data";
import ListItemButton from "@mui/material/ListItemButton";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";

const ProjectItem = (props) => {
        ;
         
    const pick = props?.projects?.name.charAt(0).toUpperCase();
    return (
        <React.Fragment>
{/*             <Typography variant={'body1'} fontSize={12} color={'text.secondary'}>{props?.projects?.name}</Typography>
 */}             <ListItemButton
                component={"li"}
                sx={{
                     p: theme => theme.spacing(1, 3),
                     borderBottom: 1,
                     borderBottomColor: 'divider',

                     '&:last-child': {
                         borderBottomColor: 'transparent'
                     }
                    }}
                >
                <ListItemAvatar>
                    <Avatar> {pick} </Avatar>
                </ListItemAvatar>
                <ListItemText
                    sx={{width: '50%'}}
                    primary={<Typography  mb={.5}>{props?.projects?.name && props?.projects?.name.charAt(0).toUpperCase() + props?.projects?.name.slice(1)}</Typography>}
                    secondary={<Typography variant={'body1'} fontSize={12} color={'text.secondary'}>{props?.projects?.createdAt}</Typography>}
                />
                <ListItemText sx={{width: '40%', px: 2}}>
                    <LinearProgress variant="determinate" color={"success"} value={props?.projects?.progress}/>
                </ListItemText>
                <ListItemText>
                    <JumboDdMenu menuItems={menuItems}/>
                </ListItemText>
            </ListItemButton> 
        </React.Fragment>
    );
};
/* Todo project props */
export default ProjectItem;
