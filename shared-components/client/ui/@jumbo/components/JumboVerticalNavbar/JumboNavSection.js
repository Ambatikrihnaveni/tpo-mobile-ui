import React from 'react';
import ListSubheader from "@mui/material/ListSubheader";
import JumboNavIdentifier from "@jumbo/components/JumboVerticalNavbar/JumboNavIdentifier";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import {SIDEBAR_VIEWS} from "@jumbo/utils/constants/layout";
import {useTranslation} from "react-i18next";

const JumboNavSection = ({item, translate,toggle}) => {

    const {sidebarOptions} = useJumboLayoutSidebar();
    
    const {t} = useTranslation();

    const isMiniAndClosed = React.useMemo(() => {
        return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
    }, [sidebarOptions.view, sidebarOptions.open]);

    const label = React.useMemo(() => {
        return translate ? t(item.label) : item.label;
    }, [item, translate, t]);

    if (!item || !item.label) return null;

    const subMenus = (item && item.children && item.children.length > 0) ? item.children : null;

    return (
        <>

            {
                subMenus &&
                subMenus.map((child, index) => {
                    return (<JumboNavIdentifier item={child} key={index} toggle={toggle}/>)
                })
            }
        </>
    )
};

//todo: put an equal deep check for the props
export default React.memo(JumboNavSection);
