import React from 'react';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ScheduleList from "./ScheduleList";
import Stack from "@mui/material/Stack";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboContent from "@jumbo/components/JumboContent";
import useAuth from '../../../../hooks/useAuth';

const ScheduleCard = () => {
    // Get the current date
    const {viewer} = useAuth()
    const currentDate = new Date();

    // Extract day, month, and year from the current date
    const day = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
        <JumboCardQuick noWrapper>
            <JumboContent
                bgColor={["#843CF6", "#38B8F2"]}
               
                sx={{height: (viewer?.role == "Tutor") ? 295 : 265, color: "common.white"}}
            >
                <Stack alignItems={"center"} mt={-2}>
                    <Avatar
                        sx={{
                            bgcolor: 'common.white',
                            height: 90,
                            width: 90,
                            fontSize: 28,
                            color: '#2e475D',
                            marginTop:'55px',
                            boxShadow: 2,
                            mb: 2
                        }}
                    >{currentDate.getDate()}</Avatar>
                    <Typography variant={"h4"} color={"common.white"}>{day}</Typography>
                    <Typography variant={"body1"} mb={1}>{month} {year}</Typography>
                </Stack>
            </JumboContent>
            <JumboContent sx={{p: 3,minHeight: (viewer?.role == "Admin") ? 320 : (viewer?.role == "Master-Admin") ? 320 : 450,}}>
                <ScheduleList/>
            </JumboContent>
        </JumboCardQuick>
    );
};

export default ScheduleCard;