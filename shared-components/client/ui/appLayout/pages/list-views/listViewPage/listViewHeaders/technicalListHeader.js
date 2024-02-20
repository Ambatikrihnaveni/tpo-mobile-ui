import React, { useState } from 'react';
import {

    ListItemText,
    Typography,
    Stack,
    
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import { Meteor } from "meteor/meteor";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));



const { filesBaseUrl } = Meteor.settings.public;
const TechnicalListHeader = ({ record, view, i }) => {
   
    return (
        <React.Fragment>
            <JumboListItem
                componentElement={"div"}
              
               
            >

            
                <ListItemText

                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }}>
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '22%' }
                                    }}
                                >
                                    <Typography variant={"h5"} fontSize={16} lineHeight={1.25} mb={0}
                                        noWrap><b>Title</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:6
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap sx={{ml:2}}> <b>Lessons</b> </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:5
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> <b>Quizes</b> </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:2
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> <b>Learn</b> </Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '15%' },
                                        display: { xs: 'none', sm: 'block' },
                                        ml:2
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> <b>Practice</b> </Typography>
                                </Item>

                            </Stack>
                        </Typography>
                    }
                />

            </JumboListItem>
        </React.Fragment>
    );
};
/* Todo record, view prop define */
export default TechnicalListHeader;
