import React from 'react';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import LatestPosts from "../LatestPosts";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import Button from '@reactioncommerce/catalyst/Button';
import { Link } from 'react-router-dom';
import ModuleList from './modulelist';
import MyDashboardService from '../../../../graphql/services/dashboard/dashboard-services';
import { Divider } from '@mui/material';

const Modules = ({ scrollHeight }) => {
    const { t } = useTranslation();
    const { shopId } = useCurrentShopId();

    const [tutorModules, setTutorModules] = React.useState([])

    React.useEffect(async () => {
        const data = await MyDashboardService.getTutorModules(shopId);
        if (data) {
            setTutorModules(data?.tutorProducts)
        }

    }, [])


    return (
        <JumboCardQuick
            title={
                <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{t('Modules')}</span>
            }
           /*  action={
                <React.Fragment>
                    <FilterListIcon />
                </React.Fragment>
            } */
            wrapperSx={{ p: 0, marginTop: '17px' }}

        >
            <JumboScrollbar
                autoHeight
                autoHide
                autoHideDuration={200}
                autoHideTimeout={500}
                autoHeightMin={scrollHeight ? scrollHeight : 445}
            >
                <ModuleList tutorModules={tutorModules} />
            </JumboScrollbar>
            <Divider />
            <Link to={"/modules"}>
                <Button style={{ color: '#f27474', fontSize: '15px' }}>More</Button>
            </Link>
        </JumboCardQuick>
    );
};
/* Todo scrollHeight prop define :- */
LatestPosts.propTypes = {
    scrollHeight: PropTypes.number
};
export default Modules;
