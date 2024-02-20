import React from 'react';
import {Typography} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import ScheduleItem from "./ScheduleItem";
//import {scheduleData} from "./data";
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import useAuth from '../../../../hooks/useAuth';

const ScheduleList = () => {
    const [schedule, setSchedule] = React.useState([]);
    const { shopId } = useCurrentShopId();
    const {viewer} = useAuth();
    const currentRole = viewer?.role;

    React.useEffect(async () => {
        //Get the Today's Schedule on basis of Role
        if(currentRole == "Admin") {
            const data = await MyDashboardService.getTodaySchedule(shopId);
            if(data) {
                setSchedule(data);
            }
        }else if(currentRole == "Tutor") {
            const data = await MyDashboardService.getTutorTodaySchedule(shopId);
            if(data) {
                setSchedule(data);
            }
        }else if(currentRole == "Student") {
            const data = await MyDashboardService.getStudentTodaySchedule();
            if(data) {
                setSchedule(data);
            }
        }
    },[])
    return (
        <React.Fragment>
            <Typography variant={"h5"} color={"text.secondary"} mb={2}>Today's schedule</Typography>
            <JumboScrollbar
                    autoHide
                    autoHideDuration={200}
                    autoHideTimeout={500}
                    autoHeightMin={30}
                    style={{height: 245}}
                >
                {
                    schedule.map((data, index) => (
                        <ScheduleItem item={data} key={index} role={currentRole}/>
                    ))
                }
            </JumboScrollbar>
        </React.Fragment>
    );
};

export default ScheduleList;
