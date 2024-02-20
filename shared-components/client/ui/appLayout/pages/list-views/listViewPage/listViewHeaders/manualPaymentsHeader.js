
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
const { filesBaseUrl } = Meteor.settings.public;

const ManualPaymentsHeader = () => {

const{viewer}= useAuth()

    return (
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
                        <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0, textAlign: 'center' }}>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                ><b>Date</b></Typography>
                            </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap>
                                        <b>Student/Count</b>
                                    </Typography>
                                </Item>

                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >

                                <Typography variant={"h5"} mb={.5} sx={{

                                    textTransform: 'capitalize'
                                }} >
                                    <b>Group</b>
                                </Typography>


                            </Item>
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >
                                    <b>College</b>
                                </Typography>
                            </Item>
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >
                                    <b>Program</b>
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >
                                    <b>Admission</b>
                                </Typography>
                            </Item>
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >
                                    <b>Amount</b>
                                </Typography>
                            </Item>
                            
                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant={"body1"}

                                >
                                    <b>Status</b>
                                </Typography>   

                            </Item>
                        </Stack>
                    </Typography>
                }
            />
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default ManualPaymentsHeader;