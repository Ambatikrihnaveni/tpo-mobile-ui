import React, { useState } from 'react';
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

const TariningPartnerJoinHeader = () => {

   

  
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
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                              
                            <Item
                                    sx={{
                                        marginLeft: "10x",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Title</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Date</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Time</b></Typography>
                                </Item>

                            
                                <Item>
                                <Typography variant={"body1"} noWrap sx={{ml:12}}><b>Actions</b></Typography>
                                </Item>
                            </Stack>
                        </Typography>
                    }
                />
               
            </JumboListItem>
            
        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default TariningPartnerJoinHeader;