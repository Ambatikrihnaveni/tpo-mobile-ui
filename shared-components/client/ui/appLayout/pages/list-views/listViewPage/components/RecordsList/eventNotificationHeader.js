import React from 'react';
import {
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import useAuth from '../../../../../../hooks/useAuth';


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


function EventNotificationsHeader() {
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
                            <Stack direction={"row"} alignItems={"center"}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' },
                                       //marginLeft:"30px"
                                    }}

                                >
                                    <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                        noWrap><b>Topic</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:"6%"
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Date</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:"7%"
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Time</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                        ml:"-8%"
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b></b></Typography>
                                </Item>
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
} export default EventNotificationsHeader;