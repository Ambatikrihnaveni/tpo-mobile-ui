import React from 'react';
import {
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";

import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";
import useAuth from '../../../../../../hooks/useAuth';
import { Button } from '@mui/base';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


function GroupPreviewHeader() {
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
                            <Stack direction={"row"} alignItems={"center"} sx={{ marginLeft: { sm: "30px", xs: 0 } }}>

                                {viewer?.role === "College-Admin" &&
                                    <Item
                                        sx={{
                                            flexBasis: { xs: '100%', sm: '50%', md: '50%' }
                                        }}
                                    >
                                        <Typography variant={'body1'} noWrap> <b>Name</b></Typography>

                                    </Item>
                                }
                                {viewer?.role === "College-Admin" &&
                                    <Item
                                        sx={{
                                            flexBasis: { xs: '100%', sm: '50%', md: '45%' },
                                        }}
                                    >
                                        <Typography variant={'body1'} noWrap> <b>PhoneNumber</b></Typography>

                                    </Item>
                                }
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '45%' },
                                        //  display: { xs: 'none', sm: 'block' },
                                        marginLeft: '5px'

                                    }}
                                >

                                    {viewer?.role == "Student" && <Typography variant={"body1"}
                                        noWrap><b>Admission</b></Typography>}



                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '75%' },
                                        width:"60%"
                                        //  display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    {viewer.role == "College-Admin" && <Typography variant={"body1"}
                                        noWrap><b>Email</b></Typography>}

                                </Item>
                                {
                                    viewer?.role === "Student" ? (<Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '40%' },
                                            display: { xs: 'none', sm: 'block' },
                                            ml:"-30%"
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Date Registered</b></Typography>
                                    </Item>) : (
                                        <Item
                                            sx={{
                                                flexBasis: { sm: '50%', md: '100%' },
                                                display: { xs: 'none', sm: 'block' },
                                                mr:"-37%"
                                            }}
                                        >
                                            <Typography variant={"body1"} noWrap><b>Programs</b></Typography>
                                        </Item>

                                    )
                                }
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '95%' },
                                        display: { xs: 'none', sm: 'block' },
                                        mr:"-37%",
                                        textAlign: 'end'
                                    }}
                                >
                                    {viewer?.role === "College-Admin" && <Typography variant={"body1"} noWrap ><b>Date Registered</b></Typography>}
                                </Item>

                                <Item
                                    sx={{
                                        mr: 1.5,
                                        flexBasis: { sm: '50%', md: '38%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    {viewer?.role === "Student" && <Typography variant={"body1"}><b> Programs</b></Typography>}
                                </Item>



                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '90%' },
                                        display: { xs: 'none', md: 'block' },
                                        mr:"-27%",
                                        textAlign: 'end'
                                    }}
                                >
                                    {viewer?.role === "College-Admin" && <Typography variant={"body1"}  noWrap><b>Invited</b></Typography>}
                                </Item>



                                <Item
                                    sx={{

                                        flexBasis: { sm: '50%', md: '38%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    {viewer?.role === "Student" && <Typography variant={"body1"} noWrap><b>Price</b></Typography>}
                                </Item>

                            </Stack>

                        </Typography>
                    }
                />
                <Item
                    sx={{
                        flexBasis: { sm: '50%', md: '10%' },
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    {viewer?.role === "Student" && <b> Payment Status</b>}
                </Item>
                <Item
                    sx={{
                        flexBasis: { sm: '50%', md: '6%' },
                        display: { xs: 'none', md: 'block' },
                    }}
                >
                    {viewer?.role === "College-Admin" && <b> Verified</b>}
                </Item>
                <Item
                >
                    <b>Actions</b>
                </Item>
            </JumboListItem>
        </React.Fragment>
    );
}
export default GroupPreviewHeader;