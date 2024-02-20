import React from 'react';
import {
    ListItemText,
    Typography,
    Stack,
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import AssignmentListItem from './AssignmentListItem'


const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));


export default function AssignmentsList({ calendarEvent }) {

    return (
        <div>
            {(calendarEvent?.assignments?.length > 0) ?
                <div>
                    <JumboListItem
                        componentElement={"div"}
                        secondaryAction={

                           <Typography>
                            Actions
                           </Typography>
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
                                    <Stack direction={"row"} alignItems={"center"} >
                                        <Item
                                            sx={{
                                                //display: 'flex',
                                                flexBasis: { xs: '100%', sm: '50%', md: '50%' },
                                                flexShrink: 0, px: 1,
                                            }}
                                        >

                                            <Typography variant={"h4"} mb={.5} sx={{ fontWeight: 'bold' }} >Assignment Name</Typography>


                                        </Item>
                                        <Item
                                            sx={{
                                                flexBasis: { sm: '50%', md: '20%' },
                                                display: { xs: 'none', sm: 'block' },
                                                textTransform: 'capitalize',
                                                textAlign:'center'
                                            }}
                                        >
                                            <Typography variant={"body1"} noWrap sx={{ fontWeight: 'bold' }}

                                            >Total Marks</Typography>
                                        </Item>

                                        <Item
                                            sx={{
                                                // marginLeft:'5%',
                                                flexBasis: { sm: '50%', md: '20%' },
                                                display: { xs: 'none', sm: 'block' },
                                                textTransform: 'capitalize',
                                                textAlign:'center'
                                            }}
                                        >
                                            <Typography variant={"body1"} noWrapsx={{ fontWeight: 'bold' }}

                                            >Total Submit</Typography>
                                        </Item>





                                    </Stack>
                                </Typography>
                            }
                        />

                    </JumboListItem>
                    <JumboScrollbar
                        autoHeight
                        autoHeightMin={350}
                        autoHide
                        autoHideDuration={200}
                        autoHideTimeout={500}
                    >
                        {calendarEvent?.assignments.map((assignment) => (
                            <AssignmentListItem record={assignment} />
                        ))}
                    </JumboScrollbar>
                </div>
                :<div style={{minHeight:'350px'}}><Typography sx={{ marginTop: '100px',textAlign:'center' }}> No data availble</Typography></div> 

            }
        </div>
    )
}
