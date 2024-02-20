import React from 'react';
import {

    ListItemText,
    Typography,
    Stack,


} from "@mui/material";

import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


function StudentClassHeader() {
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
                            <Stack direction={"row"} alignItems={"center"} sx={{ marginLeft: "10px" }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' },
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                     sx={{marginLeft:'20px'}}
                                        noWrap><b>Batch Name</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        marginLeft: "41px",
                                        flexBasis: { sm: '50%', md: '30%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Assigned Program</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '30%' },
                                        display: { xs: 'none', md: 'block' },
                                       // marginLeft: "5px",

                                    }}
                                >
                                    <Typography style={{marginLeft:'10px'}} variant={"body1"}  noWrap><b>Tutor</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '28%' },
                                        display: { xs: 'none', md: 'block' },

                                    }}
                                >
                                    <Typography style={{marginLeft:'-150px'}} variant={"body1"} noWrap><b>Progress</b></Typography>
                                </Item>

                            </Stack>

                        </Typography>
                    }
                />

                <Item sx={{                                         
                    display: { xs: 'none', sm: 'block' }
                     
                     }}>
                    <Typography style={{marginLeft:'-150px'}} variant={"body1"} noWrap><b>Status</b></Typography>
                </Item>
                <Item

                >
                    <b>Actions</b>
                </Item>
            </JumboListItem>
        </React.Fragment>
    );
}
export default StudentClassHeader;