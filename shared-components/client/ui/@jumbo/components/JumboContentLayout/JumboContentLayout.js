import React, { useState } from 'react';
import useJumboContentLayout from "@jumbo/hooks/useJumboContentLayout";
import Div from "@jumbo/shared/Div";
import JumboContentLayoutHeader from "./JumboContentLayoutHeader";
import JumboContentLayoutSidebar from "./JumboContentLayoutSidebar";
import JumboContentLayoutMain from "./JumboContentLayoutMain";
import JumboContentLayoutFooter from "./JumboContentLayoutFooter";
import {Box} from "@mui/material";

const JumboContentLayout = ({header, footer, sidebar, children, layoutOptions,sx}) => {
    
    let contentLayout = useJumboContentLayout();
   

    React.useEffect(() => {
        if (layoutOptions)
            contentLayout?.setContentLayout(layoutOptions);
    }, [layoutOptions]);

    return (
        <Div
            sx={{
                display: 'flex',
                flex: 1,
                minWidth: 0,
                minHeight: '100%',
                flexDirection: 'column',
                ...contentLayout?.root?.sx,
            }}
            className="CmtLayout-root"
        >
            {
                header && contentLayout.header?.spreadOut &&
                <JumboContentLayoutHeader>
                    {header}
                </JumboContentLayoutHeader>
            }
            <Box
                component={layoutOptions?.wrapper?.component ?? Div}
                sx={{
                    display: 'flex',
                    flex: 1,
                    minWidth: 0,
                    zIndex: 1,
                    position: 'relative',
                    ...layoutOptions?.wrapper?.sx ?? {}
                }}
                className="CmtLayout-wrapper"
            >
                {
                    sidebar &&
                    <JumboContentLayoutSidebar sx={sx}>
                        {sidebar}
                    </JumboContentLayoutSidebar>
                }
                {
                    <JumboContentLayoutMain>
                        {
                            header && !contentLayout.header?.spreadOut &&
                            <JumboContentLayoutHeader>
                                {header}
                            </JumboContentLayoutHeader>
                        }
                        <Div
                            sx={{
                                display: 'flex',
                                minWidth: 0,
                                flex: 1,
                                flexDirection: 'column',
                                ...contentLayout?.content?.sx
                            }}
                            className="CmtLayout-content"
                        >
                            {children}
                        </Div>
                        {
                            footer && !contentLayout.footer?.spreadOut &&
                            <JumboContentLayoutFooter>
                                {footer}
                            </JumboContentLayoutFooter>
                        }
                    </JumboContentLayoutMain>
                }

            </Box>
            {
                footer && contentLayout.footer?.spreadOut &&
                <JumboContentLayoutFooter>
                    {footer}
                </JumboContentLayoutFooter>
            }
        </Div>
    );
};

export default JumboContentLayout;
