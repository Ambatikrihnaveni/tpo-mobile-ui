import React from 'react';
import JumboContentLayout from "@jumbo/components/JumboContentLayout";
import { useLocation } from 'react-router';
import RecordsList from "./components/RecordsList/placementRecordsList";
import ListViewPageProvider from "./ListViewPageProvider";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import {Stack, useMediaQuery} from "@mui/material";
import RecordFab from "./components/RecordFab";
import FolderDropdown from "./components/FolderDropdown";
import LabelDropdown from "./components/LabelDropdown";
//import useCurrentShopId from '../../../../hooks/useCurrentShopId';

const ListViewPage = (props) => {
    ;
    const {theme} = useJumboTheme();
    const location = useLocation();
    const url=location.pathname;
   // const {shopId} = useCurrentShopId()
    const shopId = localStorage.getItem('accounts:shopId')
    const segment = url.substring(url.lastIndexOf('/') + 1);
    const pageTitle=segment.charAt(0).toUpperCase() + segment.slice(1)
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    
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
                            <FolderDropdown/>
                            <LabelDropdown/>
                            <RecordFab/>
                        </Stack>
                    )
                }
                <RecordsList recordsType={segment} shopId={shopId}/>
            </JumboContentLayout>
        </ListViewPageProvider>
        
    );
};
export default ListViewPage;
