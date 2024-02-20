import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CalendarWrapper from "./calendarWrapper";
import { useTranslation } from "react-i18next";
import StudentsService from '../../../../../../../graphql/services/students/students-service';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const StudentCalendarItem = () => {
    const { t } = useTranslation();

    const navigate = useNavigate()
    const [calendarData, setCalendarData] = React.useState([])


    React.useEffect(async () => {

        const data = await StudentsService.getClassesForCalendar()
        if (data) {
            let lessonsData = []
            for (let x = 0; x < data.length; x++) {
                const lessonsDuration = data[x]?.lessonsDuration

                if (lessonsDuration && lessonsDuration.length > 0) {

                    for (i = 0; i < lessonsDuration.length; i++) {
                        let startDate = new Date(lessonsDuration[i].lessonScheduleDate)
                        let endDate = new Date(startDate.setDate(startDate.getDate() + parseInt(lessonsDuration[i].lessonDuration)))
                        let string1 = data[x]?.batchStartTime;
                        let position1 = string1?.search(':');
                        let startHours = string1?.slice(0, position1);
                        let startMinutes = string1?.slice(position1 + 1, string1?.length);
                        startDate.setHours(startHours);
                        startDate.setMinutes(startMinutes);
                        startDate.setSeconds(0);
                        let string2 = data[x]?.batchEndTime;
                        let position2 = string2?.search(':');
                        let endHours = string2?.slice(0, position2);
                        let endMinutes = string2?.slice(position2 + 1, string2?.length);
                        endDate?.setHours(endHours);
                        endDate?.setMinutes(endMinutes);
                        endDate?.setSeconds(0);
                        lessonsData.push({
                            id:lessonsDuration[i].lesson[0]._id,
                            title: lessonsDuration[i].lesson[0].name,
                            start: startDate,
                            end: endDate,


                        });
                    }
                    setCalendarData(lessonsData)
                }
            }
        }
    }, [])

    const onClickEvent = (event) => {
        
        navigate(`/calendar/${event.id}/event`)
    }

    return (
        <React.Fragment>
            <Typography variant={"h1"} mb={3}>{t()}</Typography>
            <Card>
                <CardContent>
                    <CalendarWrapper>
                        <Calendar
                            localizer={localizer}
                            events={calendarData}
                            selectable
                            defaultView="month"
                            scrollToTime={new Date(1970, 1, 1, 6)}
                            defaultDate={new Date()}
                            onSelectEvent={event => onClickEvent(event)}
                            onSelectSlot={slotInfo =>
                                alert(
                                    `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                                    `\nend: ${slotInfo.end.toLocaleString()}` +
                                    `\naction: ${slotInfo.action}`,
                                )
                            }
                            style={{ height: 600 }}
                        />
                    </CalendarWrapper>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default StudentCalendarItem;
