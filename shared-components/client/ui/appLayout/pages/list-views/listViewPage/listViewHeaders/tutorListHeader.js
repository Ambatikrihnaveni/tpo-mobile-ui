import React from 'react';
import {

    ListItemText,
    Typography,
    Stack,

} from "@mui/material";

import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

function TutorListHeader() {
    return (
        <React.Fragment>
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
                            <Stack direction={"row"} alignItems={"center"} sx={{ marginLeft: "50px" }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        sx={{ marginLeft: '25px' }}
                                        noWrap> <b> Name</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '28%' },
                                        display: { xs: 'none', sm: 'block' },
                                        marginLeft: "110px"
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> <b>Email</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                        marginRight: "50px"
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Phone Number</b></Typography>
                                </Item>

                                <Item
                                    sx={{
                                        marginRight: "9px",
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Course</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' },
                                        marginRight: "45px"
                                    }}
                                >
                                    <b> Status</b>
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
} export default TutorListHeader;