import React from 'react';
import { TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab";
import { Typography } from "@mui/material";

const ScheduleItem = ({ item, role }) => {
    
    return (
        <TimelineItem
            sx={{
                '&::before': {
                    display: 'none'
                }
            }}
        >
            <TimelineSeparator>
                <TimelineDot sx={{
                    m: theme => theme.spacing(.5, 0),
                    bgcolor: item.color,
                    width: 20,
                    height: 20,
                    boxShadow: '0 0 0 4px #fff,inset 0 2px 0 rgba(0,0,0,.08),0 3px 0 4px rgba(0,0,0,.05)',
                }}>
                    {item.icon}
                </TimelineDot>
            </TimelineSeparator>
            <TimelineContent
                sx={{
                    p: theme => theme.spacing(.5, 0),
                    ml: 2.5,
                }}
            >
                <div>
                    <Typography variant="h6" color="text.primary" fontSize={16} lineHeight={1.5} marginLeft={-1} fontWeight={"bold"}>
                        {
                            (role == "Admin") ? `${item.name} - ` : (role == "Tutor") ? `${(item?.lessonsDuration)? (item?.lessonsDuration[0]?.lesson[0]?.name):''} - ` : (role == "Student") ? `${item?.program?.name} - ` : ""
                        }
                    </Typography>
                    <Typography variant="h6" color="text.primary" fontSize={16} lineHeight={1.5} marginLeft={-1} fontFamily={"italic"}>
                        {
                            (role == "Admin") ? `${item.program.name}` : (role == "Tutor") ? `${item?.name}` : (role == "Student") ? `${(item?.lessonsDuration)? item?.lessonsDuration[0]?.lesson[0]?.name:''}` : ""
                        }
                    </Typography>
                </div>
                {
                    (item?.batchStartTime && item?.batchEndTime) &&
                    <Typography variant={"body1"} color={"#d01212"} fontSize={16} marginLeft={-1}
                        mb={2}>{`${item.batchStartTime} - ${item.batchEndTime}`}</Typography>
                }
            </TimelineContent>
        </TimelineItem>
    )
};

/* Todo item prop define */
export default ScheduleItem;
