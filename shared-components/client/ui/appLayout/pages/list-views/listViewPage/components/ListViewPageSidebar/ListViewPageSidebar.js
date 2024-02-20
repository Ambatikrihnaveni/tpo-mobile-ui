import React from 'react';
import Avatar from "@mui/material/Avatar";
import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FoldersList from "../FoldersList";
import {useJumboDialog} from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import useListViewPage from "../../hooks/useListViewPage";
import {getAssetPath} from "../../../../../utils/appHelpers";

const ListViewPageSidebar = () => {
    const {showDialog, hideDialog} = useJumboDialog();
    const {setRecordsListRefresh} = useListViewPage();

    const handleRecordAdd = React.useCallback(() => {
        hideDialog();
        setRecordsListRefresh(true);
    }, [hideDialog, setRecordsListRefresh]);

    const showAddRecordDialog = React.useCallback(() => {
        showDialog({
            title: "Add new record",
            content: {/* <RecordForm onSave={handleRecordAdd} /> */}
        });
    }, [handleRecordAdd, showDialog]);

    return (
        <React.Fragment>
            <Div
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Avatar sx={{width: 60, height: 60, mr: 2}} alt="Cory Smith" src={getAssetPath(`${ASSET_AVATARS}/avatar6.jpg`, "60x60")}/>
                <Div sx={{flex: '1 1 auto'}}>
                    <Typography variant={"h5"} mb={.35}>Cory Smith</Typography>
                    <Typography variant={"body1"} color={"text.secondary"}>@royal.cory</Typography>
                </Div>
            </Div>
            <Button
                fullWidth
                disableElevation
                variant={"contained"}
                startIcon={<PersonAddIcon/>}
                sx={{
                    mb: 2,
                    '& .MuiSvgIcon-root': {
                        fontSize: '1.5rem'
                    }
                }}
                onClick={showAddRecordDialog}
            >Add record</Button>
            <FoldersList/>
        </React.Fragment>
    );
};
export default React.memo(ListViewPageSidebar);
