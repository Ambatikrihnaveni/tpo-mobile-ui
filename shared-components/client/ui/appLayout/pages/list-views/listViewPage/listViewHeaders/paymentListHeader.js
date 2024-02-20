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

const PaymentListHeader = ({ recordsType }) => {

    const { viewer } = useAuth()


    return (
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
                        {(viewer?.role === "College-Admin") ? (
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

                                    <Typography variant={"h5"} mb={.5} sx={{

                                        textTransform: 'capitalize',
                                        marginLeft: '10px'
                                    }} > <b> Program</b></Typography>


                                </Item>


                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Group</b>
                                    </Typography>
                                </Item>


                                <Item
                                    sx={{
                                        ml:6,
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Admission</b>
                                    </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        ml:3,
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"}

                                    ><b>No.of Students</b>
                                    </Typography>
                                </Item>


                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"}

                                    >
                                        <b>Amount</b>
                                    </Typography>
                                </Item>


                            </Stack>
                        ) : (null)}
                        {(viewer?.role === "Master-Admin") ? (
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

                                    <Typography variant={"h5"} mb={.5} sx={{

                                        textTransform: 'capitalize',
                                        marginLeft: '20px'
                                    }} > <b> Training Partner</b></Typography>
                                </Item>
                                
                                <Item
                                    sx={{
                                        flexBasis: { sm: '100%', md: '55%' },
                                        display: { xs: 'none', sm: 'block' },
                                    }}
                                >

                                    <Typography variant={"h5"} mb={.5} sx={{

                                        textTransform: 'capitalize',
                                       // marginLeft: '10px'
                                    }} > <b> Program</b></Typography>


                                </Item>


                                <Item
                                    sx={{
                                        textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Group</b>
                                    </Typography>
                                </Item>


                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Admission</b>
                                    </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:5
                                    }}
                                >
                                    <Typography variant={"body1"}

                                    ><b>No.of Students</b>
                                    </Typography>
                                </Item>


                                <Item
                                    sx={{
                                        //textAlign: 'center',
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                        marginLeft:10

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    >
                                        <b>Amount</b>
                                    </Typography>
                                </Item>
                                <Item
                                    sx={{
                                        //textAlign: 'center',
                                        marginLeft: '10px',
                                        flexBasis: { md: '20%' },
                                        //display: { xs: 'none', md: 'block' }
                                        display: viewer?.role === "Admin" && recordsType == "payments" ? "none" : 'block'

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b> Status</b>
                                    </Typography>
                                </Item>

                            </Stack>
                        ) : (null)}


                        {(viewer?.role === "Student") ? (
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
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' },
                                        flexShrink: 0, px: 1,
                                    }}
                                >

                                    <Typography variant={"h5"} mb={.5} sx={{

                                        textTransform: 'capitalize',
                                        marginRight:'90px'
                                    }} > <b> Program</b></Typography>


                                </Item>


                                <Item
                                    sx={{
                                        // textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Group</b>
                                    </Typography>
                                </Item>


                                <Item
                                    sx={{
                                        // textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                        marginRight:'160px'

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Admission</b>
                                    </Typography>
                                </Item>



                                <Item
                                    sx={{
                                        //textAlign: 'center',
                                        marginRight: '120px',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    >
                                        <b>Amount</b>
                                    </Typography>
                                </Item>


                            </Stack>
                        ) : (null)}

                        {(viewer?.role === "Admin") ? (
                            <Stack direction={"row"} sx={{ minWidth: 0, textAlign: 'center' }}>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        marginLeft:{xs:7,md:0}
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap

                                    ><b>Date</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '70%', sm: '50%', md: '17%' },
                                        flexShrink: 0, px: 1,
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >

                                    <Typography variant={"h5"} mb={.5} sx={{

                                        textTransform: 'capitalize',
                                        marginLeft: '60px'
                                    }} > <b> Program</b></Typography>


                                </Item>

                                <Item
                                    sx={{
                                        textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b>Group</b>
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

                                    > <b>Admission</b>
                                    </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        //textAlign: 'center',
                                        textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"}

                                    ><b>No.of Students</b>
                                    </Typography>
                                </Item>


                                <Item
                                    sx={{
                                        //textAlign: 'center',
                                        marginRight: recordsType == "received" ? '1px' : '120px',
                                        marginLeft: recordsType == "received" ? '40px' : '0px',
                                        textAlign: 'center',
                                    flexBasis: { md: '20%' },
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
                                        //textAlign: 'center',
                                        flexBasis: { md: '25%' },
                                        //display: { xs: 'none', md: 'block' }
                                        display: viewer?.role === "Admin" && recordsType == "payments" ? "none" : 'block'

                                    }}
                                >
                                    <Typography variant={"body1"}

                                    > <b> Status</b>
                                    </Typography>
                                </Item>



                            </Stack>
                        ) : (null)}






                    </Typography>
                }
            />

            <Item

            >
                <b>Actions</b>
            </Item>
        </JumboListItem>
    );
};
/* Todo record, view prop define */
export default PaymentListHeader;