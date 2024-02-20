import React from 'react'
import {
    
    ListItemText,
    ListItemIcon,
    Typography,
    Stack,
  
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
export default function PlacementListHeader() {
    return (
        <div>
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
                    <ListItemIcon sx={{ minWidth: 40 }}>

                    </ListItemIcon>

                    <ListItemText
                        primary={
                            <Typography variant={"body1"} component={"div"}>
                                <Stack direction={"row"} alignItems={"center"} sx={{ marginRight:"75px"}}>
                                <Item
                                        sx={{
                                            flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                        }}
                                    >
                                        <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                            noWrap> <b> CandidateName</b> </Typography>
                                       
                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                                        }}
                                    >
                                        <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                                            noWrap> <b>  Job Title</b> </Typography>
                                        <Typography
                                            variant={"body1"}
                                            noWrap
                                            color={'text.secondary'}
                                            sx={{
                                                display: { sm: 'none' }
                                            }}
                                        >
                                           <b>Company</b> 
                                        </Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { sm: '50%', md: '28%' },
                                            display: { xs: 'none', sm: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap> <b>Location</b></Typography>
                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { md: '25%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Platform</b></Typography>
                                    </Item>

                                    <Item
                                        sx={{
                                            flexBasis: { md: '22%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Score</b></Typography>

                                    </Item>
                                    <Item
                                        sx={{
                                            flexBasis: { md: '22%' },
                                            display: { xs: 'none', md: 'block' }
                                        }}
                                    >
                                        <Typography variant={"body1"} noWrap><b>Matched Date</b></Typography>

                                    </Item>
                                </Stack>
                            </Typography>
                        }
                    />
                    <Item
                       sx={{marginRight:"110px"}}
                    >
                        <b>Status</b>

                    </Item>

                    

                    <Item  sx={{marginRight:"15px"}}>

                      <b>Actions</b>
                    </Item>

                </JumboListItem>
            </React.Fragment>
        </div>
    )
}
