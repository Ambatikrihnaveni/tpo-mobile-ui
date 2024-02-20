import React from 'react';
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


function FreeQuizzesHeader() {
    const { viewer } = useAuth()
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
                            <Stack direction={"row"} alignItems={"center"}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"body1"}
                                        noWrap><b>Module Name</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                    }}
                                >
                                    <Typography variant={"body1"}
                                        noWrap><b>Lesson Name</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '45%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Quizzes</b></Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '50%' },
                                        display: { xs: 'none', md: 'block' }
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Quizz Score</b></Typography>
                                </Item>

                            </Stack>
                        </Typography>
                    }
                />


            </JumboListItem>
        </React.Fragment>
    );
}
export default FreeQuizzesHeader;