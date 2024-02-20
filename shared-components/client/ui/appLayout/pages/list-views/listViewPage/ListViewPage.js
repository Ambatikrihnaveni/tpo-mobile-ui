import React from 'react';
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import { useLocation } from 'react-router';
import RecordsList from "./components/RecordsList";
import ListViewPageProvider from "./ListViewPageProvider";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import {Stack, useMediaQuery} from "@mui/material";
import {useParams} from "react-router-dom";
import Div from '@jumbo/shared/Div/Div';
import useCurrentShopId from '../../../../hooks/useCurrentShopId';
import NotificationDetail from './components/RecordsList/components/notificationDetail';
import JumboSearch from "@jumbo/components/JumboSearch";


const ListViewPage = (props) => {
    const {theme} = useJumboTheme();
    const location = useLocation();
    const url=location.pathname;
    const {shopId} = useCurrentShopId()
   //  const shopId = localStorage.getItem('accounts:shopId')
    const segment = url.substring(url.lastIndexOf('/') + 1);
    const pageTitle=segment.charAt(0).toUpperCase() + segment.slice(1)
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const {notificationId} = useParams()
    const [searchKeywords, setSearchKeywords] = React.useState("");

    const handleOnChange = React.useCallback((keywords) => {
        setSearchKeywords(keywords)
    }, [searchKeywords]);

    const handleOnCancel = React.useCallback((keywords) => {

        setSearchKeywords('')
    }, [searchKeywords]);

    const layoutOptions = React.useMemo(() => ({
        sidebar: {
            sx: {
                [theme.breakpoints.up('lg')]: {
                    position: 'sticky',
                    zIndex: 5,
                    top: 96,
                    minHeight: 'auto',
                },
                [theme.breakpoints.down('lg')]: {
                    display: 'none',
                },
            }
        },
        wrapper: {
            sx: {
                alignItems: 'flex-start',
            }
        },
    }), [theme]);
    return (
        <ListViewPageProvider>
            <JumboContentLayout
           
                layoutOptions={layoutOptions}
            >
                {
                    lg && (
                        <Stack spacing={2} direction={"row"} sx={{mb: 3, mt: -2}}>
                          
                            <Div sx={{display:{xs:'block',sm:'none'}}}>
                            <JumboSearch
                                onChange={handleOnChange}
                                onCancel={handleOnCancel}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    textAlign: 'right'

                                }}
                                // value={queryOptions.queryParams.keywords}
                                value={searchKeywords}

                            />
                            </Div>
                        </Stack>
                    )
                }
               {notificationId? <NotificationDetail notificationId={notificationId} recordType={segment}/> : 
               <RecordsList
                recordsType={segment} 
                shopId={shopId} 
                searchKeywords={searchKeywords}
                handleOnChange={handleOnChange}
                handleOnCancel={handleOnCancel}
                />} 
            </JumboContentLayout>
        </ListViewPageProvider>
        
    );
};
export default ListViewPage;
