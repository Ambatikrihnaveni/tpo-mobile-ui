import React, { useEffect } from 'react';
import Stack from "@mui/material/Stack";
import { useMutation as notificationMutation } from "@apollo/react-hooks";
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from "react-query";
import { makeStyles } from "@material-ui/core/styles";
import { recordService } from "../../../../../services/record-services";
import useListViewPage from "../../hooks/useListViewPage";
import IconButton from "@mui/material/IconButton";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useSnackbar } from "notistack";
import draftToHtml from 'draftjs-to-html';
import ButtonGroup from '@mui/material/ButtonGroup';
import DialogContentText from '@mui/material/DialogContentText';
import { Tooltip, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CampaignIcon from '@mui/icons-material/Campaign';
import Div from '../../../../../../@jumbo/shared/Div/Div';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormControl from '@mui/material/FormControl';
import { Grid, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Backdrop from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import AssignToProgram from './components/AssignToProgram';
import { Dialog, DialogContent } from '@mui/material';
import { useState } from 'react';
import createNotificationMutation from '../../../../../../graphql/services/notifications/mutations/createNotification';
import Paper from '@mui/material/Paper';
import Grow from '@mui/material/Grow';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useAuth from '../../../../../../hooks/useAuth';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';

let Editor = () => <React.Fragment />;
const limitedToolbarOptions = {
    options: ['inline', 'link', 'image', 'blockType',],
    inline: {
        options: ['bold', 'italic', 'underline'],
    },
    link: {
        options: ['link',],
    },

};

const fullToolbarOptions = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
    },
    blockType: {
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'Blockquote'],
    },

    link: {
        options: ['link', 'unlink'],
    },
};
const useStyles = makeStyles({
    textarea: {
        resize: "both"
    }
});
const BulkActions = ({ recordsType, onClose, showAssignProgramBtn }) => {
    const { selectedRecords, setSelectedRecords, setRecordsListRefresh } = useListViewPage();
    const { showDialog, hideDialog } = useJumboDialog();
    const [message, setMessage] = React.useState('')
    const [selected, setSelected] = React.useState([]);
    const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialog, setIsDialog] = useState(false)
    const { viewer } = useAuth();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const { shopId } = useCurrentShopId();
    const [sendType, setSendType] = React.useState('')
    const [createNotification] = notificationMutation(createNotificationMutation);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [showFullToolbar, setShowFullToolbar] = React.useState(false);

    const showSuccessAlert = () => {

        swal({
            title: "Success",
            text: "Student Assigned Successfully",
            icon: "success",
            button: 'OK',

        })
    };

    const Announcement = () => {
        (viewer.role == "Master-Admin" && recordsType == 'students' || recordsType == 'collegeadmins' || recordsType == 'trainingpartners') &&
            <IconButton onClick={openDialog}>
                <CampaignIcon />
            </IconButton>

    };

    React.useEffect(() => {
        if (message) {
            const html = message;



            const contentBlock = convertFromHTML((html));
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }

        Editor = require('react-draft-wysiwyg').Editor;

    }, []);

    useEffect(() => {
        if (isDialog) {
            showSuccessAlert();
        }
    }, [isDialog]);

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    const handleWhatsAppClick = (e) => {
        setSendType(e.target.value)

    };
    const handelOverViewChange = (event) => {
        
        setMessage(event)
    };

    
    const handleToggle = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prevOpen) => !prevOpen);
    };

   
    const anchor = 'bottom';
    const [state, setState] = React.useState({
        bottom: true,
    });
  

    const assignLabelMutation = useMutation(recordService.assignLabel, {
        onSuccess: () => {
            hideDialog();
            setRecordsListRefresh(true);
            enqueueSnackbar('Labels has been applied successfully.', {
                variant: "success"
            });
        }
    });
    const handleOk = () => {
        setIsDialog(false)
    }
    const [action, setAction] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const deleteRecordInput = {
        Ids: selectedRecords?.map(record => record?.id),
        recordsType,
        role: viewer?.role,
        shopId
    };

    const deleteRecordsMutation = useMutation(recordService.deleteMultiple, {
        onSuccess: () => {
            hideDialog();
            setRecordsListRefresh(true);
            enqueueSnackbar('Records has been deleted successfully.', {
                variant: "success"
            });
        }
    });

    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleClose = (event) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const onEditorChange = () => {
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        handelOverViewChange(bioContent)
    }



    const onSend = async () => {
      try {
          await createNotification({
            variables: {
              input: {
                message: message,
                accountIds: selectedRecords?.map(record => record?.id),
                sendType: sendType,
                shopId:shopId
      
              }
            }
          });
          closeDialog()
          toast.success('Message sent successfully', {
            position:"bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }); 
          setTimeout(()=>{
            setRecordsListRefresh(true);
          },3000)
        
        }catch (error) {
          toast.error('Message sent failed', {
            position:"bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
    }
    const handleBulkDelete = React.useCallback(() => {

        showDialog({
            variant: "confirm",
            title: "Are you sure?",
            content: "You won't be able to recover this records later",
            onYes: () => deleteRecordsMutation.mutate(deleteRecordInput),
            onNo: hideDialog
        })
    }, [selectedRecords, deleteRecordsMutation, hideDialog]);

    const applyLabels = React.useCallback((selectedLabels) => {
        assignLabelMutation.mutate({
            recordIDs: selectedRecords.map(record => record?.id),
            labelIDs: selectedLabels.map(label => label?.id),
        });
    }, [selectedRecords]);

    const backgroundStyle = {
        backgroundColor: '#50C2C9',
        height: '10%',
        Width: { md: '100%', lg: "100%" },
        padding: '20px',
        marginLeft: { md: '10%' },
        textAlign: 'right'
    };



    return (
        <Stack direction={"row"} sx={{ backgroundColor: 'transparent', ml: -2 }}

        >

            <>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Dialog open={dialogOpen} onClose={closeDialog} sx={{ Width: { md: '750px' } }} >

                        <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Announcement</Typography>
                            <IconButton onClick={closeDialog} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                        </Div>



                        <DialogContent sx={{ marginTop: '40x', width: { lg: '500px' }, justifyContent: 'center', padding: '15px' }}>
                            <DialogContentText sx={{ marginLeft: '5px', p: 2 }}>

                                <Button variant='outlined' onClick={() => setShowFullToolbar(!showFullToolbar)} style={{ float: 'right', marginTop: '6px', }}>
                                    {showFullToolbar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </Button>
                                <Editor
                                    editorStyle={{
                                        // maxWidth: '100%',
                                        minHeight: 150,
                                        borderWidth: 1,
                                        overflow: 'auto', maxHeight: '150px',
                                        borderStyle: 'solid',
                                        borderColor: 'lightgray',
                                    }}
                                    value={message} onChange={onEditorChange}
                                    inputProps={{ className: classes.textarea }}
                                    toolbar={showFullToolbar ? fullToolbarOptions : limitedToolbarOptions}
                                    editorState={editorState}
                                    onEditorStateChange={editorState => setEditorState(editorState)}

                                />

                                {emojiPickerOpen && (
                                    <div style={{ maxHeight: '100px', overflow: 'auto' }}>
                                        <Picker
                                            onEmojiClick={(event, emojiObject) => {
                                                console.log(emojiObject);
                                                setEmojiPickerOpen(false);
                                            }}
                                        />
                                    </div>
                                )}


                                &nbsp;&nbsp;



                                <Grid sx={{ textAlign: 'right', alignItems: 'right', p: 2 }}>


                                    <ButtonGroup aria-label="split button">
                                        <Button variant="contained" /*disabled={message.length < 3}*/ onClick={onSend}>Send</Button>

                                        <Button
                                            size="small"
                                            aria-controls={open ? 'split-button-menu' : undefined}
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-label="select merge strategy"
                                            aria-haspopup="menu"
                                            onClick={handleToggle}
                                            variant="outlined"
                                        >
                                            <ArrowDropDownIcon />
                                        </Button>
                                    </ButtonGroup>
                                    <Popper
                                        open={open}
                                        anchorEl={anchorEl}
                                        role={undefined}
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom' ? 'center top' : 'center bottom',
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList id="split-button-menu" autoFocusItem>
                                                            <MenuItem>
                                                                <EmailIcon sx={{ ml: 1 }} />
                                                                E-mail
                                                            </MenuItem>
                                                            <MenuItem onClick={handleWhatsAppClick}>
                                                                <WhatsAppIcon sx={{ ml: 1 }} />
                                                                Whatsapp
                                                            </MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>

                                </Grid>

                            </DialogContentText>

                        </DialogContent>

                    </Dialog>
                    {Announcement()}

                </Stack>

                <Tooltip title={"Delete"}>
                    <IconButton onClick={handleBulkDelete}><DeleteOutlineIcon /></IconButton>
                </Tooltip>

                {(viewer.role == "Master-Admin" && recordsType == 'students' || recordsType == 'collegeadmins' || recordsType == 'trainingpartners') &&
                    <IconButton onClick={openDialog}>
                        <CampaignIcon />
                    </IconButton>

                }

            </>

            {
                    viewer?.role === "College-Admin" ? ((recordsType == "groupList") &&
                        <>
                            <Typography variant={'h4'} sx={{ mr: 1, mt: 1 }}> {selectedRecords?.length}</Typography>
                            <Button variant='contained' sx={{ textTransform: 'none', marginRight: "170px" }} onClick={() => setIsDialogOpen(true)}>Assign To Program</Button>
                        </>) : ""

                }


            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth
                maxWidth="lg"
                BackdropClick="static" // This prevents closing on backdrop click
                aria-labelledby="dialog-title"
                PaperProps={{
                    sx: {
                        maxHeight: 1800,
                        borderRadius: '15px'
                    }
                }}
            >
                <DialogContent>
                    <AssignToProgram selectedRecords={selectedRecords} onClose={handleCloseDialog} setSelectedRecords={setSelectedRecords} style={{ borderRadius: '15px' }} setIsDialog={setIsDialog} handleOk={handleOk} />
                </DialogContent>
            </Dialog>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />


        </Stack>


    );
};

export default BulkActions;
