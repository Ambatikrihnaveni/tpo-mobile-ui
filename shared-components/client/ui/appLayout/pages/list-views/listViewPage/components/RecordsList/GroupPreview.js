import React from 'react';
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import Div from '../../../../../../@jumbo/shared/Div';
import UploadCSV from './components/UploadCSV';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
const GroupPreview = ({ setImportedEmails, importedEmails, groupId }) => {
    const { showDialog, hideDialog } = useJumboDialog();

    

    const addNewclick = React.useCallback(async () => {
        
        showDialog({
            /* fullScreen: true, */
            content: <UploadCSV onClose={hideDialog} sx={{ borderRadius: '15px' }} importedEmails={importedEmails} setImportedEmails={setImportedEmails} groupId={groupId} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "900px",
                        maxWidth: "900px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '500px',
                        maxHeight: '500px'
                        // Set your width here
                    },
                },
            },
        })
    }, [showDialog])



    // navigate(`${params.shopId}/inviteuser`)

    return (
        <Div>
            <Tooltip title="Upload CSV">

                <Button variant='outlined' sx={{ maxHeight: '40px', maxWidth: '160px', fontWeight: 'bold' }} color="primary" onClick={addNewclick}><FileUploadOutlinedIcon /></Button>

            </Tooltip>
        </Div>

    );
};

export default GroupPreview;
