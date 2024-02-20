import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Stack,
    Grid,
    IconButton,
} from "@mui/material";
import Div from '@jumbo/shared/Div'
import InputBase from "@mui/material/InputBase";
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from "@mui/icons-material/Search";
import CampaignIcon from '@mui/icons-material/Campaign';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Popper from '@mui/material/Popper';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import EmailIcon from '@mui/icons-material/Email';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "@emotion/styled";
import { makeStyles } from "@material-ui/core/styles";
import Span from "@jumbo/shared/Span";
import draftToHtml from 'draftjs-to-html';
import Picker from 'emoji-picker-react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ToastContainer, toast } from 'react-toastify';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';


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



const media = [
    { value: "email", label: "e-mail" },
    { value: 'whatsapp', label: "Whatsapp" }
]

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const useStyles = makeStyles({
    textarea: {
        resize: "both"
    }
});
const { filesBaseUrl } = Meteor.settings.public;

const Tutor = (params) => { 
    const {
        handleCheckboxChange,
        handleSelectAll,
        filteredData,
        setSearchTerm,
        searchTerm,
        selectedNames,
        dummyData,
        calendarEvent
    } = params
    const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [showFullToolbar, setShowFullToolbar] = React.useState(false);

    const classes = useStyles();

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const Announcement = () => {
        if (selectedNames.length > 0) {
            return (
                <IconButton color="primary" aria-label="delete" onClick={openDialog}>
                    <CampaignIcon fontSize='large' />
                </IconButton>

            );
        } else {
            return <div />;
        }
    };
    const handleClose = (event) => {
        if (anchorEl && anchorEl.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const onSend = async () => {
        ;
        let accountIds = []
        for (let i = 0; i < selectedNames.length; i++) {
            accountIds.push(selectedNames[i]._id)
        }
        try {
            await createNotification({
                variables: {
                    input: {
                        message: message,
                        accountIds: accountIds,
                        sendType: sendType,
                        shopId: shopId

                    }
                }
            });
            closeDialog()
            toast.success('Message sent successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            toast.error('Message sent failed', {
                position: "top-right",
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
    const handelOverViewChange = (event) => {
        setMessage(event)
      };
    const onEditorChange = () => {
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        handelOverViewChange(bioContent)
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={selectedNames.length === calendarEvent?.tutorName?.length}
                                onChange={handleSelectAll}
                            />
                        </TableCell>
                        <TableCell sx={{ display: "flex" }}>
                            {/* SearchIcon */}
                            <Stack direction={"row"} spacing={1} sx={{ml:"-40%"}}>

                                <Div sx={{
                                    color: 'inherit',
                                    display: 'flex',
                                    borderRadius: 30,
                                    backgroundColor: theme => theme.jumboComponents.JumboSearch.background,


                                }}>
                                    <Div sx={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <SearchIcon sx={{ ml: 1, mt: 1, mr: 1 }} />
                                    </Div>

                                    <InputBase

                                        placeholder="Search ...."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <IconButton
                                        paddingLeft="20px"
                                        component="label"
                                        onClick={() => {
                                            setSearchTerm("");
                                        }}

                                    >
                                        <CancelIcon />
                                    </IconButton>
                                </Div>

                            </Stack>
                            {/* SearchIcon */}

                            {/* Announcement */}
                            <Stack direction={"row"} spacing={1} alignItems={"center"} sx={{ ml: 3 }}>
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
                                                    <Button variant="contained" disabled={message.length < 10}  onClick={onSend}>Send</Button>

                                                    <Button
                                                        size="small"
                                                        aria-controls={open ? 'split-button-menu' : undefined}
                                                        aria-expanded={open ? 'true' : undefined}
                                                        aria-label="select merge strategy"
                                                        aria-haspopup="menu"
                                                        //onClick={handleToggle}
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
                                                                        <MenuItem onClick={handleEmailClick}>
                                                                            <EmailIcon sx={{ marginRight: 1 }} />
                                                                            E-mail
                                                                        </MenuItem>
                                                                        <MenuItem onClick={handleWhatsAppClick}>
                                                                            <WhatsAppIcon sx={{ marginRight: 1 }} />
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

                            {/* Announcement */}


                            {/* <TextField
                                variant="outlined"
                                size="small"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            🔍
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search..."
                                sx={{ borderRadius: "8px" }}
                            /> */}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={selectedNames.includes(calendarEvent?.tutorName)}
                                onChange={() => handleCheckboxChange(calendarEvent?.tutorName)}
                            />
                        </TableCell>
                        <TableCell align="left">{calendarEvent?.tutorName}</TableCell>
                    </TableRow>
                </TableBody>
                </TableBody>
            </Table>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </TableContainer>
    );
};

export default Tutor;