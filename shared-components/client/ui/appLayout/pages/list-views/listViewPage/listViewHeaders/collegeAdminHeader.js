import React from 'react';
import {
   
    ListItemText,
    Typography,
    Stack
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));
const CollegeAdminHeader = ({ record, view }) => {
     
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
                                    display: 'flex',
                                    flexBasis: { xs: '100%', sm: '50%', md: '28%' },
                                    flexShrink: 0, px: 1,
                                }}
                            >
                               
                                <div>
                                    <Typography variant={"h5"}  sx={{ textTransform: 'capitalize' }}><b>College Name</b></Typography>
                                   
                                </div>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                 <Typography variant={"h5"} color={"text.primary"}>
                                        <b>Reg Date</b>
                                    </Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                 <Typography variant={"h5"} color={"text.primary"}>
                                 <b>Location</b>
                                    </Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                 <Typography variant={"h5"} color={"text.primary"}>
                                 <b>Contact</b>       
                                  </Typography>
                            </Item>
                            <Item
                                sx={{
                                    marginLeft: '-5%',
                                    flexBasis: { sm: '50%', md: '28%' },
                                    display: { xs: 'none', sm: 'block' },
                                    textTransform: 'capitalize'
                                }}
                            >
                                 <Typography variant={"h5"} color={"text.primary"}>
                                 <b>Students</b>       
                                  </Typography>
                            </Item>
                        </Stack>
                    </Typography>
                }
            />

        </JumboListItem>
    );
};
export default CollegeAdminHeader;