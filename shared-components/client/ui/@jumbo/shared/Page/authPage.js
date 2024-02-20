import React from 'react';
import useJumboApp from "@jumbo/hooks/useJumboApp";
import {config2} from "../../../appLayout/config/main";

const AuthPage = ({component, layout, ...restProps}) => {
    const {activeLayout, setActiveLayout} = useJumboApp();

    React.useEffect(() => {
        
            setActiveLayout(layout);
      
    }, [layout]);

    const PageComponent = component;

    return (
        <PageComponent {...restProps} />
    );
};

AuthPage.defaultProps = {
    layout: config2.authLayout
};

export default AuthPage;