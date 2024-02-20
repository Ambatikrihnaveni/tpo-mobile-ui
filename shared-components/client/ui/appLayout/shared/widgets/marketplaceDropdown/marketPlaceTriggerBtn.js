import React from 'react';
import WidgetsIcon from '@mui/icons-material/Widgets';
import JumboIconButton from "@jumbo/components/JumboIconButton";
import useJumboHeaderTheme from "@jumbo/hooks/useJumboHeaderTheme";
import {ThemeProvider} from "@mui/material";


const MarketPlaceTriggerButton = () => {
    const {headerTheme} = useJumboHeaderTheme();
    return (
        <ThemeProvider theme={headerTheme}>
            <JumboIconButton badge={{variant: "dot"}} elevation={25}>
                <WidgetsIcon sx={{fontSize: '1rem'}}/>
            </JumboIconButton>
        </ThemeProvider>
    );
};

export default MarketPlaceTriggerButton;