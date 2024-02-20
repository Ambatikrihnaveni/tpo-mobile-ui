import React, {useCallback, useState} from 'react';
 import MarketPlaceTriggerButton from "./marketPlaceTriggerBtn";
/*import MessagesHeader from "./MessagesList/MessagesHeader";
import SettingHeader from "./MessagesSetting/SettingHeader";
import SettingsList from "./MessagesSetting/SettingsList";
import MessagesList from "./MessagesList";
import SearchMessages from "./SearchMessages"; */
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Button from "@mui/material/Button";
import Div from "@jumbo/shared/Div";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import {CardActions, ThemeProvider} from "@mui/material";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import MarketPlace from './MarketPlace';
import Library from './MarketPlace/library/library';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";

const MarketPlaceDropdown = () => {
    const [showSettings, setShowSettings] = useState(false);
    const {theme} = useJumboTheme();
    const { showDialog, hideDialog } = useJumboDialog();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const toggleSettingWindow = useCallback(() => {
        setShowSettings(showSettings => !showSettings);
    }, [setShowSettings]);

    const onLibraryClick=()=>{
        handleClose()
        showDialog({
            fullScreen: true,
            content: <Library onClose={hideDialog}/>,
            sx: {
                borderRadius:0
              }
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={<MarketPlaceTriggerButton/>}
                disableInsideClick
                anchorEl={anchorEl}
                isOpen={isOpen}
                handleClick={handleClick}
                handleClose={handleClose}
            >
                {
                    showSettings ?
                        <Div sx={{width: 360, maxWidth: '100%'}}>
                            <SettingHeader backClickCallback={toggleSettingWindow}/>
                            <SettingsList/>
                        </Div>
                        :
                        <Div sx={{width: 360, maxWidth: '100%',padding:2}}>

                            
                           
                              <MarketPlace/>
                          
                             <Divider/>
                            <CardActions sx={{justifyContent: 'center'}}>
                                <Button
                                onClick={onLibraryClick}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 'normal',
                                        '&:hover': {bgcolor: 'transparent'}
                                    }}
                                    size={"small"} variant="text" endIcon={<ArrowForwardIcon/>} disableRipple>
                                    View All
                                </Button>
                            </CardActions>

                        </Div>
                }
            </JumboDdPopover>
        </ThemeProvider>
    );
};


export default MarketPlaceDropdown;
