import React, { useState } from 'react';
import {
    ListItemText,
    Card,
    Typography,
    ButtonGroup,
    CardActions,
    Button,
    Stack,
} from "@mui/material";

import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { useNavigate } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import moment from 'moment';
import JumboGridItem from "@jumbo/components/JumboList/components/JumboGridItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const Item1 = ({ children, sx }) => (
    <Div sx={{ textAlign: 'center', flexBasis: '33.33%', p: theme => theme.spacing(1, 2), ...sx }}>
        {children}
    </Div>
);



const EventNotifications = ({ record, view, i }) => {
    

    const navigate =useNavigate()
    let userShopId = ""
    const eventId= record?.id
   
    const handleClick=()=>{
        navigate(`/${eventId}/eventData`)

    }



    const joinMeet = () => {
        if (record?.url) {
          //window.location.href = record.url;
          window.open(record?.url, '_blank');
        }
      };

    const ActionButton = styled(Button)(({ theme }) => ({
        padding: theme.spacing(1.5, 2),
        borderBottom: 'none',
        borderRadius: 0,
        textTransform: 'none',
        letterSpacing: 0,
        borderColor: theme.palette.divider,
        color: theme.palette.text.secondary,

        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            borderBottom: 'none',
        },
    }));

    const string = record?.name
    const truncateString = (str = '', maxLength = 50) => str.length > maxLength ? `${str.substring(0, maxLength)}…` : str;
    const truncateName = truncateString(string, 40);

    if (view === "grid") {
        return (
            <JumboGridItem xs={12} sm={4} md={4} lg={3}
            >
                <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)' }}>
                    <Div sx={{textAlign:"center",mt:5}}>
                    <Typography variant={"h5"} mb={.75} style={{ fontWeight: 'bold' }}>{record?.title}</Typography>
                    </Div>
                    <Item1>
                        <Typography variant={"body1"} color="text.secondary" fontSize={14}>{moment(record?.date).format("DD-MM-YYYY")}</Typography>
                    </Item1>

                    <Div sx={{ml:"32%",display:"flex",mb:2}}>
                    <Typography variant={"body1"}  fontSize={14}>{record?.startTime}</Typography>
                        <Typography sx={{ml:2,mr:2}}>To</Typography>
                        <Typography variant={"body1"} fontSize={14}>{record?.endTime}</Typography>
                    </Div>

                    <CardActions sx={{ p: 0, mx: '-1px' }}>
                        <ButtonGroup size="large" fullWidth variant="outlined">
                            <ActionButton onClick={joinMeet} disabled={record?.accept!=true}>Join</ActionButton>
                        </ButtonGroup>
                    </CardActions>
                </Card>
            </JumboGridItem>
        );
    }

    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
                itemData={record}
                secondaryAction={

                    <Item sx={{ display: "flex" }}>

                        <Button variant="outlined" onClick={joinMeet} disabled={record?.accept!=true}> Join</Button>

                    </Item>
                }
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
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >

                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0} noWrap onClick={handleClick}>{record?.title}</Typography>


                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >

                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0} noWrap onClick={handleClick}>{moment(record?.date).format("DD-MM-YYYY")}</Typography>


                                </Item>

                                <Item
                                    sx={{
                                        ml: 9,
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap onClick={handleClick}>{record?.startTime}&nbsp; To  {record?.endTime}</Typography>
                                </Item>
                            </Stack>
                        </Typography>
                    }
                />

            </JumboListItem>

        </React.Fragment >
    );
};
/* Todo record, view prop define */
export default EventNotifications;