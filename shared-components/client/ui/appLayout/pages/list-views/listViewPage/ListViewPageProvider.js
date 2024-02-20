import React from 'react';
import ListViewPageContext from "./ListViewPageContext";
import {RECORD_APP_ACTIONS} from "./utils/constants";

const init = (appState) => appState;

const recordsAppReducer = (state, action) => {
    switch (action.type) {
        case RECORD_APP_ACTIONS.SET_SELECTED_ITEMS:
            return {
                ...state,
                selectedRecords: action?.payload
            };
        case RECORD_APP_ACTIONS.SET_RECORDS_LIST_REFRESH:
            return {
                ...state,
                refreshRecordsList: action.payload,
            };
        case RECORD_APP_ACTIONS.SET_LABELS_LIST_REFRESH:
            return {
                ...state,
                refreshLabelsList: action.payload,
            };
        default:
            return state;
    }
};

const ListViewPageProvider = ({children}) => {
    const [recordsApp, setListViewPage] = React.useReducer(recordsAppReducer, {
        selectedRecords: [],
        refreshRecordsList: false,
        refreshLabelsList: false,
    }, init);

    const setSelectedRecords = React.useCallback((records) => {
        setListViewPage({type: RECORD_APP_ACTIONS.SET_SELECTED_ITEMS, payload: records});
    }, [setListViewPage]);

    const setRecordsListRefresh = React.useCallback((refresh) => {
        setListViewPage({type: RECORD_APP_ACTIONS.SET_RECORDS_LIST_REFRESH, payload: refresh})
    }, [setListViewPage]);

    const setLabelsListRefresh = React.useCallback((refresh) => {
        setListViewPage({type: RECORD_APP_ACTIONS.SET_LABELS_LIST_REFRESH, payload: refresh})
    }, [setListViewPage]);

    const contextValue = React.useMemo(() => ({
        ...recordsApp,
        setSelectedRecords: setSelectedRecords,
        setRecordsListRefresh: setRecordsListRefresh,
        setLabelsListRefresh: setLabelsListRefresh,
    }), [recordsApp]);
    return (
        <ListViewPageContext.Provider value={contextValue}>
            {children}
        </ListViewPageContext.Provider>
    );
};

export default ListViewPageProvider;
