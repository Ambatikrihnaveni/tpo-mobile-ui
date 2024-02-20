import React, { useState } from 'react';
import {

    ListItemText,
    Typography,
    Stack,
} from "@mui/material";

import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import useAuth from '../../../../../hooks/useAuth';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


function MyProgramListHeader() {
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
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap><b>Program</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography style={{ marginLeft: '45px' }} variant={"body1"} noWrap><b>Type</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography style={{ marginLeft: '35px' }} variant={"body1"} noWrap><b>Price</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        mr: 4,
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Program Mode</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography style={{ marginLeft: '30px' }} variant={"body1"} noWrap><b>Author</b></Typography>
                                </Item>



                                {viewer?.role == "Admin" &&
                                    <Item
                                        sx={{

                                            flexBasis: { md: '22%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <Typography style={{ marginLeft: '40px' }} variant={"body1"} noWrap><b>Status</b></Typography>
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
} export default MyProgramListHeader;