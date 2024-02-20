import React, { useState } from 'react'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Div from "@jumbo/shared/Div";
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { ThemeProvider, Typography } from "@mui/material";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import InviteStudent from '../InviteStudent';
import ExistingStudents from './ExistingStudents';
import { Tooltip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Dialog, DialogContent } from '@mui/material';

export default function InviteEnrollButton(props) {
    
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
    const { shopId, groupId , onClose,setRecordsListRefresh} = props
    const [showSettings, setShowSettings] = useState(false);
    const { theme } = useJumboTheme();
    const navigate = useNavigate();
    const { showDialog, hideDialog } = useJumboDialog();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const toggleSettingWindow = React.useCallback(() => {
        setShowSettings(showSettings => !showSettings);
    }, [setShowSettings]);

    const handleStudent = () => {
        setIsDialogOpen(false)
    }
    const handleInvite = () => {
        showDialog({
            /* fullScreen: true, */
            content: <InviteStudent shopId={shopId} onClose={hideDialog} groupId={groupId} style={{ borderRadius: '15px' }} setIsDialogOpen={setIsDialogOpen} setRecordsListRefresh={setRecordsListRefresh} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "800px",
                        height: "600px",
                        maxWidth: "1000px",
                        borderRadius: '15px',
                        marginLeft: '10px'
                        // Set your width here
                    },
                },
            },
        })
    }

    const handleExisting = () => {
        showDialog({
            /* fullScreen: true, */
            content: <ExistingStudents shopId={shopId} onClose={hideDialog} style={{ borderRadius: '15px' }} setIsDialogOpen={setIsDialogOpen} groupId={groupId} setRecordsListRefresh={setRecordsListRefresh}/>,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "800px",
                        height: "600px",
                        maxWidth: "1000px",
                        borderRadius: '15px',
                        marginLeft: '10px'
                        // Set your width here
                    },
                },
            },
        })
    }

    return (
        <ThemeProvider theme={theme}>
            <JumboDdPopover
                triggerButton={
                    <Tooltip title="Invite Student or Add Existing Students">
                        <Button variant="contained" sx={{ textTransform: 'none' }}><AddIcon /></Button>
                    </Tooltip>
                }
                disableInsideClick
                anchorEl={anchorEl}
                isOpen={isOpen}
                handleClick={handleClick}
                handleClose={handleClose}
            >

                <Div sx={{ width: 260, maxWidth: '100%', padding: 2 }}>
                    <Button sx={{ mb: 1, textTransform: 'none', fontSize: "18px" }} onClick={handleInvite} >Invite Student </Button>
                    <Button sx={{ mb: 1, textTransform: 'none', fontSize: "18px" }}  onClick={handleExisting} shopId={shopId} groupId={groupId}>Add existing Students</Button>
                </Div>
                <Dialog open={isDialogOpen}
                    PaperProps={{
                        sx: {
                            minHeight: 300,
                            minWidth: 400,
                            borderRadius: '15px'
                        }
                    }}>
                    <DialogContent>
                        <Div style={{ marginLeft: '50px', marginTop: '40px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <CheckCircleOutlineIcon style={{ width: '50px', height: '50px', color: 'green', marginLeft: '80px' }} />
                                <Typography style={{ fontSize: '1.2rem' }}> Students successfully Invited</Typography>
                            </div>
                            <Button variant='contained' style={{ marginLeft: '80px' }} onClick={handleStudent}>OK</Button>
                        </Div>
                    </DialogContent>
                </Dialog>
            </JumboDdPopover>
        </ThemeProvider >
    )
}
