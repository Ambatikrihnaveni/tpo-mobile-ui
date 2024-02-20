import React from 'react';
import {
   
    ListItemText,
    Typography, 
    Stack,
   

} from "@mui/material";

import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";
import useAuth from '../../../../../hooks/useAuth';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

  
  function ModuleListHeader(){
    const {viewer} = useAuth()
return (
    <React.Fragment>
        <JumboListItem
           
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
                        <Stack direction={"row"} alignItems={"center"} sx={{ marginLeft:"80px"}}>
                            <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '38%' }
                                }}
                            >
                                <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                    noWrap><b>Title</b></Typography>
                        
                            </Item>
                            <Item
                                sx={{
                                    marginRight:viewer.role === "Tutor"?"30px" :'10px',
                                    flexBasis: { sm: '50%', md: '40%' },
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                <Typography style={{marginLeft:'-45px'}} variant={"body1"} noWrap><b>Lessons</b></Typography>
                            </Item>
                             <Item
                                sx={{
                                    marginRight:viewer.role === "Tutor"? "85px" :'50px',
                                    flexBasis: {md: '36%'},
                                    display: {xs: 'none', md: 'block'}
                                }}
                            >
                                <Typography style={{marginLeft:'-55px'}} variant={"body1"} noWrap><b>Author</b></Typography>
                            </Item> 
                             <Item
                                sx={{
                                    marginRight:viewer.role === "Tutor"?"120px" :'50px',
                                    flexBasis: {md: '41%'},
                                    display: {xs: 'none', md: 'block'}
                                }}
                            >
                         <Typography style={{marginLeft:'-25px'}} variant={"body1"} noWrap><b>Created At</b></Typography>
                            </Item>
                            {viewer?.role=="Admin" &&
                            <Item
                                sx={{
                                    marginRight:"50px",
                                    flexBasis: {md: '25%'},
                                    display: {xs: 'none', md: 'block'}
                                }}
                            >
                                <Typography variant={"body1"} noWrap><b>Tutor</b></Typography>
                            </Item> 
                }
                        </Stack>
                        
                    </Typography>
                }
            />
            <Item
              
              >
                 <b>Actions</b> 
              </Item>
        </JumboListItem>
    </React.Fragment>
);
}
export default ModuleListHeader;