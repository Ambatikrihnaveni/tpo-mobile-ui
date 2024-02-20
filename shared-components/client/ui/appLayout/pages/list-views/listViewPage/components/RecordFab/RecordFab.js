import React from "react";
import {IconButton, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {Label} from "@mui/icons-material";
import RecordForm from "../RecordForm";
import useListViewPage from "../../hooks/useListViewPage";
import {useJumboDialog} from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import LabelForm from "../LabelForm";

const RecordFab = () => {

    const {hideDialog, showDialog} = useJumboDialog();
    const {setRecordsListRefresh, setLabelsListRefresh} = useListViewPage();

    const refreshListAndCloseDialog = () => {
        setRecordsListRefresh(true);
        setLabelsListRefresh(true);
        hideDialog();
    };

    const showAddLabelDialog = React.useCallback(() => {
        showDialog({
            title: "Add New Label",
            content: <LabelForm onSave={refreshListAndCloseDialog}/>
        })
    }, []);

    const handleRecordAdd = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);

    const showAddRecordDialog = React.useCallback(() => {
        showDialog({
            title: "Add New record",
            content: <RecordForm onSave={handleRecordAdd}/>
        });
    }, [handleRecordAdd, showDialog]);

    return (
        <SpeedDial
            ariaLabel={"record-fab"}
            icon={<SpeedDialIcon/>}
            sx={{
                position: "fixed",
                right: 30,
                bottom: 30
            }}
        >
            <SpeedDialAction
                icon={
                    <IconButton onClick={showAddRecordDialog}>
                        <PersonAddIcon/>
                    </IconButton>
                }
                tooltipTitle={"Add record"}
            />
            <SpeedDialAction
                icon={
                    <IconButton onClick={showAddLabelDialog}>
                        <Label/>
                    </IconButton>
                }
                tooltipTitle={"Add Label"}
            />
        </SpeedDial>
    );
};
export default RecordFab;
