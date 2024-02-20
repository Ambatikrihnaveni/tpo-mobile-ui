import React from 'react';
import {
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const WebinarhostlistHeader = ({ record, view, recordsType }) => {

    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}

            >

                {(recordsType === "webinars") ? (
                    <ListItemText
                        primary={
                            <Typography variant={"body1"} component={"div"}>
                                <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>

                                    <Item
                                        sx={{
                                            marginLeft: "10x",
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Created Date</b></Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            //marginLeft: "42px",
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Topic</b></Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Webinar Date</b></Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            //marginLeft: "42px",
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Time</b></Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Audience</b></Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Accepted Count</b></Typography>
                                    </Item>

                                    <Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap sx={{ ml: 12 }} ><b>Actions</b></Typography>
                                    </Item>


                                </Stack>
                            </Typography>
                        }
                    />
                ) : (null)}


            </JumboListItem>

        </React.Fragment>
    );
};
export default WebinarhostlistHeader;