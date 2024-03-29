import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import RecentActivitiesList from "./RecentActivitiesList";
import {useTranslation} from "react-i18next";
import {Chip} from "@mui/material";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";

const RecentActivities1 = ({scrollHeight}) => {
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            title={t("Recent Activity")}
            action={
                <Chip color={"warning"} size={"small"} label={"...."}/>
            }
            wrapperSx={{p: 0}}
        >
            <JumboScrollbar
                autoHeight
                autoHeightMin={scrollHeight ? scrollHeight : 480}
                autoHide autoHideDuration={200}
                autoHideTimeout={500}
            >
               {/*  <RecentActivitiesList/> */}
            </JumboScrollbar>
        </JumboCardQuick>
    )
        ;
};
/* Todo scrollHeight prop define */
export default RecentActivities1;
