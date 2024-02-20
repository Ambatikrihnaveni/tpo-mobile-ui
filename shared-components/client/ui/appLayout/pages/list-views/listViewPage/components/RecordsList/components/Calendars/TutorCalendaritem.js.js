import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CalendarWrapper from '../../../../../../calendars/CalendarWrapper';
import { useTranslation } from "react-i18next";
import Admissions from '../../../../../../../../graphql/services/admissions/admission-service';
import useCurrentShopId from '../../../../../../../../hooks/useCurrentShopId';
import useAuth from '../../../../../../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

export default function TutorCalendaritem() {
    const { shopId } = useCurrentShopId();
    const {viewer} = useAuth();
    const userId = viewer?._id;
    const navigate = useNavigate()
    const [events, setEvents] = React.useState([]);


    React.useEffect(async()=> {
        
        const data = await Admissions.getTutorBatches(shopId,{userId});
        console.log(data);

        let calendarData = [];
        if(data?.classes?.length > 0) {
            for(let i = 0; i < data?.classes?.length; i++) {
                if(data?.classes[i].lessonsDuration?.length > 0) {
                    for(let j = 0; j < data?.classes[i].lessonsDuration.length; j++) {
                        let lessonInfo = {};
                        lessonInfo.title = data?.classes[i].lessonsDuration[j].lesson[0].name;
                        lessonInfo.id = data?.classes[i].lessonsDuration[j].lesson[0]._id;
                        lessonInfo.batchId = data?.classes[i].id
                        let startDate = new Date(data?.classes[i].lessonsDuration[j].lessonScheduleDate);

                        let startDateYear = startDate.getFullYear().toString();
                        let startDateMonth = (startDate.getMonth() + 1).toString();
                        let startDateDay = startDate.getDate().toString();

                        let lessonDurationTime = parseInt(data?.classes[i].lessonsDuration[j].lessonDuration);
                        let endDateDay = (startDate.getDate() + (lessonDurationTime - 1)).toString();

                        if(startDateDay?.length == 1) {
                            startDateDay = '0' + startDateDay;
                        }
                        if(endDateDay?.length == 1) {
                            endDateDay = '0' + endDateDay;
                        }

                        let startTime = data?.classes[i].batchStartTime;
                        let endTime = data?.classes[i].batchEndTime;
                        let startDateFormat = `${startDateYear}-${startDateMonth}-${startDateDay}T${startTime}:00+05:30`;
                        let endDateFormat = `${startDateYear}-${startDateMonth}-${endDateDay}T${endTime}:00+05:30`;
                        
                        lessonInfo.start = new Date(startDateFormat);
                        lessonInfo.end = new Date(endDateFormat);

                        calendarData.push(lessonInfo);
                    }
                }
            }
        };
        console.log(calendarData);
        setEvents(calendarData);
    },[])

    const { t } = useTranslation();


    const onClickEvent = (event) => {
        
        navigate(`/calendar/${event.batchId}/${event.id}/event`)
    }

    return (
        <React.Fragment>
            <Card>
                <CardContent>
                    <CalendarWrapper>
                        <Calendar
                            localizer={localizer}
                            events={events}
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

