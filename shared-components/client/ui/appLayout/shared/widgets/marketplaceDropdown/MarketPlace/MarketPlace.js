import React from 'react';
import {agents} from './data'
import MarketPlaceData from "./MarketPlaceData";
import {Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import { Style } from '@mui/icons-material';
import ImageList from '@mui/material/ImageList';
import Divider from "@mui/material/Divider";
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId.js";
import Library from './library/library';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";



const MarketPlace = () => {
    const {t} = useTranslation();
    const {shopId} = useCurrentShopId();
    const link= `${shopId}/library`
    const { showDialog, hideDialog } = useJumboDialog();

const onLibraryClick=()=>{
    showDialog({
        fullScreen: true,
        content: <Library onClose={hideDialog} />,
        sx: {
            borderRadius:0
          }
    })
}

    return (
        <React.Fragment>
            <Typography variant={"h5"} sx={{marginBottom:2}}>{t("Library")}</Typography>
            <Divider/>
            <ImageList sx={{ width: 300, height: 150 }} cols={3} rowHeight={20}>
                {
                    agents.map((agent, index) => (
                        <Grid item xs={12} sm={6} lg={2} key={index} onClick={onLibraryClick}>
                            <MarketPlaceData agentDetail={agent}/>
                       </Grid>
                    ))
                }
            </ImageList>
        </React.Fragment>
    );
};
export default MarketPlace;
