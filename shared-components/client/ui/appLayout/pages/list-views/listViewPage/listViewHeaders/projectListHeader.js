import React ,{useState}from 'react';
import {
    
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";

import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


function ProjectListHeader(){

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
               // onClick={() => { onRowClick(record) }}
                primary={
                    <Typography variant={"body1"} component={"div"}>
                        <Stack direction={"row"} alignItems={"center"} sx={{marginLeft:"60px"}}>
                            <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                }}
                            >
                                <Typography variant={"body1"} noWrap> <b>Batch</b> </Typography>
                    
                            </Item>

                           {/*  <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                }}
                            >
                                <Typography variant={"body1"} noWrap> <b>Program</b> </Typography>
                    
                            </Item> */}
    
                        
                            <Item
                                sx={{
                                    ml:40,
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', lg: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap> <b>Progress</b> </Typography>
                            </Item>
                             
                          
                        
                        </Stack>
                    </Typography>
                }
            />
                 <Item
                  sx={{marginRight:"300px",display: { xs: 'none', md: 'block' }}}
              >
                 <b>Status</b> 
              </Item>
              <Item
                  sx={{marginRight:"80px",display: { xs: 'none', md: 'block' }}}
              >
                 <b>Tutors</b> 
              </Item>
              <Item
              >
                 <b>Actions</b> 
              </Item>
        </JumboListItem>
    </React.Fragment>
);
}export default ProjectListHeader; 