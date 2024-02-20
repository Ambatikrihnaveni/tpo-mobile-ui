import React from 'react';
import Div from "@jumbo/shared/Div";
import useJumboContentLayout from "@jumbo/hooks/useJumboContentLayout";

const JumboContentLayoutSidebar = ({children,sx}) => {
    
    const contentLayout = useJumboContentLayout();
    return (
        <Div
            sx= {{
                display: 'flex',
                minWidth: 0,
                flexDirection: 'column',
               width: sx? sx.width :200,
                mr: 2,
                flexShrink: 0,
                minHeight: '100%',
                transitionDuration: '1s',
                 display:{xs:'none',sm:'block'},
              //  borderRight:"1px solid #DEE2E6",
                ...contentLayout?.sidebar?.sx
            }}
            className="CmtLayout-sidebar"
        >
            {children}
        </Div>
    );
};

export default JumboContentLayoutSidebar;