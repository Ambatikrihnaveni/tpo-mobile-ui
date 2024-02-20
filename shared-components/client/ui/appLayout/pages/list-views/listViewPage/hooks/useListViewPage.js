import React from "react";
import ListViewPageContext from "../ListViewPageContext";

const useListViewPage = () => {
    return React.useContext(ListViewPageContext);
};

export default useListViewPage;