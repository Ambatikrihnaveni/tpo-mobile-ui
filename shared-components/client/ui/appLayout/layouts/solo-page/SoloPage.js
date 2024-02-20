import React from "react";
import useJumboLayout from "@jumbo/hooks/useJumboLayout";
import layoutConfig from "./layoutConfig";
import Div from "../../../@jumbo/shared/Div";

const SoloPage = ({children}) => {
    const {setJumboLayoutOptions} = useJumboLayout();

    React.useEffect(() => {
        setJumboLayoutOptions(layoutConfig);
    }, []);

    return (
        <Div>
            {children}
        </Div>
    );
};

export default SoloPage;
