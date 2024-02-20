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


function AssignmentListHeader() {
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
                            <Stack direction={"row"} alignItems={"center"}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '35%' },
                                        marginLeft:'10px'

                                    }}
                                > 
                                    <Typography variant={"body1"} noWrap><b>Assignment Name</b></Typography>

                                </Item>
                              
                                <Item
                                    sx={{
                                        marginLeft:'40%',
                                        flexBasis: {sm: '50%', md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Total Marks</b></Typography>
                                </Item>
                                
                                <Item
                                    sx={{
                                        marginRight: "12%",
                                        flexBasis: {sm: '50%', md: '20%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Total Submit</b></Typography>
                                </Item>

                            </Stack>

                        </Typography>
                    }
                />
            </JumboListItem>
        </React.Fragment>
    );
}
export default AssignmentListHeader;