import React from "react";
import {
    Grid,
    Button,
    Typography,
} from "@mui/material";
import { Avatar, AvatarGroup,Tooltip } from "@mui/material";
import StudentPageTab from "./components/lesson";
import useAuth from "../../../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import AssignmentService from "../../../../graphql/services/assignment-services/assignmentServices";

export default function Lesson() {
    const [calendarEvent,setCalendarEvent]= React.useState({})
    const { viewer } = useAuth();
    const account_id = viewer?._id
    const {eventId:lessonId} = useParams();

    React.useEffect(async()=>{
        const data = await AssignmentService.getStudentCalendarEvent(account_id,lessonId)
        setCalendarEvent(data)
        },[])

    return (
        <Grid>
            <Grid>
                <Typography sx={{ fontSize: 28, fontWeight: "bold",mb: 2, mt: 2,ml:"2%" }}>{calendarEvent?.name}</Typography>
            </Grid>

            <Grid sx={{ display: "flex" }}>

                <Grid sx={{ml:"2%"}}>
                    <Typography sx={{ fontSize: 15,}}><b>Status</b></Typography>
                    <Button  variant="contained" sx={{mt:1.5,mb:3}} >Completed</Button>
                </Grid>

                <Grid sx={{ml:"15%"}}>
                    <Typography sx={{ fontSize: 15,}}><b>Assigned Tutor</b></Typography>
                    <AvatarGroup max={3} sx={{ mr:3,mt:1.5,mb:3}}>

                        <Tooltip>
                            <Avatar />
                        </Tooltip>

                    </AvatarGroup>
                </Grid>

                <Grid sx={{ml:"18%"}}>
                    <Typography sx={{ fontSize: 15}}><b>Date</b></Typography>
                    <Typography sx={{mt:1.5,mb:3}}>Aug 22</Typography>
                </Grid>
            </Grid>

            <Grid>
                <StudentPageTab  calendarEvent={calendarEvent}/>
            </Grid>
        </Grid>
    );
}
