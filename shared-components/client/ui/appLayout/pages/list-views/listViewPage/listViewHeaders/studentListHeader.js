import React from 'react';
import {
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    Tooltip,
    Typography,
    Avatar,
    Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import styled from "@emotion/styled";
import JumboDdMenu from "@jumbo/components/JumboDdMenu";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import JumboChipsGroup from "@jumbo/components/JumboChipsGroup";
import useAuth from '../../../../../hooks/useAuth';


const Item = styled(Span)(({theme}) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


function StudentListHeader(){
      ;
      const { viewer } = useAuth()
      return (
    <React.Fragment>
        <JumboListItem
            componentElement={"div"}
        
            sx={{
                cursor: 'pointer',
                borderTop: 1,
                borderColor: 'divider',
                '&:hover': {
                    bgcolor: 'action.hover',
                }
            }}
        >
        
            <ListItemText
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{marginLeft:"90px"}}>
                            <Item
                                sx={{
                                    flexBasis: {xs: '100%', sm: '50%', md: '25%'}
                                }}
                            >
                                <Typography  variant={"body1"} 
                                            noWrap><b>Name</b></Typography>
                    
                            </Item>
                            <Item
                                sx={{
                                    marginLeft:"60px",
                                    flexBasis: {sm: '50%', md: '28%'},
                                    display: {xs: 'none', sm: 'block'},
                                }}
                            >
                                <Typography variant={"body1"} noWrap><b>Email</b></Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: {md: '25%'},
                                    display: {xs: 'none', md: 'block'},
                                    marginLeft: viewer ?.role ==="Tutor" ?"0px":'20px',
                                }}
                            >
                                <Typography variant={"body1"} noWrap sx={{fontWeight:'bold'}}>{ (viewer?.role == "Tutor") ? "Programs Count" : "Phone Number"}</Typography>
                            </Item>

                            <Item
                                sx={{
                                    flexBasis: {md: '25%'},
                                    display: {xs: 'none', md: 'block'},
                                    marginLeft: viewer ?.role ==="Master-Admin" ?"0px":'0px'
                                }}
                            >
                                <Typography variant={"body1"} noWrap sx={{fontWeight:'bold'}}>{ (viewer?.role == "Master-Admin" ) ? "Colleges" : ""}</Typography> 
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: {md: '25%'},
                                    display: {xs: 'none', md: 'block'},
                                    marginLeft: viewer ?.role ==="College-Admin" ?"0px":'0px'
                                }}
                            >
                                <Typography variant={"body1"} noWrap sx={{fontWeight:'bold'}}>{ (viewer?.role == "College-Admin" ) ? "Groups" : ""}</Typography> 
                            </Item>

                           
                        
                        </Stack>
                    </Typography>
                }
            />
               
             
        </JumboListItem>
    </React.Fragment>
);
 }export default StudentListHeader;