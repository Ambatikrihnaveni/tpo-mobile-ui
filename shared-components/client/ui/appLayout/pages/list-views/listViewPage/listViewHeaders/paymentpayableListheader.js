
import React, { useState } from 'react';
import {
    ListItemText,
    Typography,
    Stack,

} from "@mui/material";
import Span from "@jumbo/shared/Span";
import styled from "@emotion/styled";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const { filesBaseUrl } = Meteor.settings.public;

const PaymentPayableListHeader = () => {


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
                                <Typography variant={"body1"} noWrap

                                >  <b>Training Partner</b></Typography>
                            </Item>
                            <Item
                                sx={{
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <Typography variant={"body1"} noWrap

                                >  <b>College/Student</b></Typography>
                            </Item>


                            <Item
                                sx={{
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >

                                <Typography variant={"h5"} mb={.5} sx={{

                                    textTransform: 'capitalize'
                                }} >
                                    <b>Program Name</b>
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
                                    <b>No.of Students</b>
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    textAlign: 'center',
                                    flexBasis: { md: '25%' },

                                }}

                            >
                                <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' }, }}>
                                    <b>Price</b>
                                </Typography>
                            </Item>

                            <Item
                                sx={{
                                    flexBasis: { md: '22%' },
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                <Typography variant="body1" sx={{ display: { xs: 'none', md: 'block' }, }}>
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
export default PaymentPayableListHeader;