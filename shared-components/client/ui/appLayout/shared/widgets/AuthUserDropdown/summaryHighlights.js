import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Summarylist from './Summarylist';
import Divider from "@mui/material/Divider";
import {useTranslation} from "react-i18next";
import {Chip} from "@mui/material";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";

const SummaryHighlights = ({scrollHeight}) => {
    const {t} = useTranslation();
    return (
        <JumboCardQuick
            title={t("Ready-to-use-examples")}
             
            wrapperSx={{p: 0}}
        >                    <Divider style={{ color: 'black' }} />
            <JumboScrollbar
                autoHeight
                autoHeightMin={scrollHeight ? scrollHeight : 480}
                autoHide autoHideDuration={200}
                autoHideTimeout={500}
            >
                <Summarylist/>
            </JumboScrollbar>
        </JumboCardQuick>
    )
        ;
};
/* Todo scrollHeight prop define */
export default SummaryHighlights;
