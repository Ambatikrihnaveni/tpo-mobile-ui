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


function StudentGroupHeader() {
    const { viewer } = useAuth()
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
                            <Stack direction={"row"} alignItems={"center"} sx={{ marginLeft: "70px" }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' },
                                        marginRight: '20px'
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap

                                    ><b>Group Name</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        marginRight: "20px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {viewer?.role === "College-Admin" && <Typography style={{marginLeft:'60px'}} variant={"body1"} noWrap><b>Created Date</b></Typography>}
                                    {viewer?.role === "Student" && <Typography variant={"body1"} sx={{ml:10}} noWrap><b>Invite Date </b></Typography>}
                                </Item>
                                <Item
                                    sx={{
                                        marginLeft: "20px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {viewer?.role === "Student" && <Typography style={{marginLeft:'70px'}} variant={"body1"} noWrap><b>College Name</b></Typography>}
                                    {viewer?.role === "College-Admin" && <Typography variant={"body1"} noWrap><b>Students Registered</b></Typography>}
                                </Item>
                                <Item
                                    sx={{
                                        marginRight: "20px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {viewer.role === "Student" && <Typography sx={{ml:13}} variant={"body1"} noWrap><b>Assigned Program</b></Typography>}
                                    {viewer.role === "College-Admin" && <Typography variant={"body1"} noWrap><b>Program</b></Typography>}
                                </Item>
                                <Item
                                    sx={{
                                        marginRight: "20px",
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    {viewer.role === "College-Admin" && <Typography variant={"body1"} noWrap><b>Invite Link</b></Typography>}
                                </Item>

                                <Item
                                    sx={{

                                        flexBasis: { sm: '50%', md: '20%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                 </Item>

                            </Stack>

                        </Typography>
                    }
                />

                <Item>
                    {viewer?.role === "Student" && ""}
                    {viewer?.role === "College-Admin" && <Typography variant={"body1"} noWrap><b>Actions</b></Typography>}
                </Item>


            </JumboListItem>
        </React.Fragment>
    );
}
export default StudentGroupHeader;