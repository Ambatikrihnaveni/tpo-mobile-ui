import React from 'react';
import {

    ListItemText,
    ListItemIcon,
    ListItemAvatar,

    Tooltip,
    Typography,
    Avatar,
    Stack,
    Select,
    MenuItem,

} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

function AdmissionListHeader() {
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
                    // onClick={showtutorDetail}
                    primary={
                        <Typography variant={"body1"} component={"div"}>
                            <Stack direction={"row"} alignItems={"center"} sx={{textAlign:'center'}} >
                                <Item
                                    sx={{
                                        flexBasis: { xs: '100%', sm: '50%', md: '28%' }
                                    }}
                                >
                                    <Typography variant={"body1"} sx={{marginLeft:'-70px'}} mb={0} noWrap> <b> Name</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { sm: '50%', md: '20%' },
                                        display: { xs: 'none', sm: 'block' },
                                        
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap> <b>Program</b></Typography>
                                </Item>
                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Progress</b></Typography>
                                </Item>

                                <Item
                                    sx={{
                                        flexBasis: { md: '25%' },
                                        display: { xs: 'none', md: 'block' },
                                    }}
                                >
                                    <Typography variant={"body1"} noWrap><b>Status</b></Typography>

                                </Item>
                                <Item
                                    sx={{
                                        marginRight:"50px",
                                        flexBasis: { md: '22%' },
                                        display: { xs: 'none', md: 'block' },
                                    }}
                                >
                                    <b> Admissions</b>
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
} export default AdmissionListHeader;