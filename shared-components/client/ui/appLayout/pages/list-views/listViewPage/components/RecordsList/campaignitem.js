
import React, { useRef } from 'react'
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Div from "@jumbo/shared/Div";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ToastContainer, toast } from 'react-toastify';
import {
  IconButton,
  Grid,
  Card
} from "@mui/material";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SunEditor from 'suneditor-react';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import createNotificationMutation from '../../../../../../graphql/services/notifications/mutations/createNotification';
import { useMutation } from '@apollo/react-hooks';

const useStyles = makeStyles((theme) => ({
  /*  textarea: {
     resize: "both"
   }, */
  root: {
    '& .MuiSvgIcon-root': {
      // width: 14,
      //height: 14,
      borderRadius: '40%', // Make the checkbox icon circular
      backgroundColor: theme.palette.background.default, // Use the background color to simulate a radio button
    },
    '&.Mui-checked .MuiSvgIcon-root': {
      backgroundColor: theme.palette.primary.main, // Change the background color when checked
    },
  },
}));


function CampaignItems({ onClose, setRecordsListRefresh }) {
  const { shopId } = useCurrentShopId();
  const [selected, setSelected] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [message, setMessage] = React.useState('')
  const classes = useStyles();
  const [sendType, setSendType] = React.useState('')
  const [whatsapp, setWhatsapp] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState({});
  const [title, setTitle] = React.useState('');
  const [editorState, setEditorState] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [ createNotification ] = useMutation(createNotificationMutation)

  const options = [
    { value: 'All', label: 'Send to the entire list' },
    { value: 'Students', label: 'Send to Students' },
    { value: 'Admins', label: 'Send to Training Partners' },
    { value: 'College-Admins', label: 'Send to Colleges' }


  ];

  const editor = useRef();


  const handleWhatsAppClick = (e) => {
    ;
    setSendType(e.target.value)

  };

  const handleEmailClick = (e) => {
    ;
    setSendType(e.target.value)

  };
  const handelOverViewChange = (event) => {
    setMessage(event)
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };


  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return;
    }
    setOpen(false);
  };


  const onSend = async () => {
    try {
      await createNotification({
        variables: {
          input: {
             title:title,
            message: editorState,
            sendTo: selectedValues,
            sendType: sendType,
            shopId: shopId
          }
        }
      });
      toast.success('Announcement sent successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setRecordsListRefresh(true)
      setTimeout(() => {
        onClose()
      }, "3000");
    } catch (error) {
      toast.error('Announcement sent faild', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        onClose()
      }, "3000");
    }
  }


  const toggleCheckbox = (values, value) => {
    if (values.includes(value)) {
      return values.filter((v) => v !== value);
    } else {
      return [...values, value];
    }
  };
  

 
const handleCheckboxChange = (value) => {
  if (value === 'All') {
    setSelectedValues((prevSelectedValues) => (prevSelectedValues.includes('All') ? [] : ['All']));
  } else {
    setSelectedValues((prevSelectedValues) => {
      return prevSelectedValues.includes('All') ? ['All'] : toggleCheckbox(prevSelectedValues, value);
    });
  }
};

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  const editorHandleChange = value => {

    setEditorState(value);
  };


  return (
    <Card>
      <Div sx={{ padding: '10px 10px' }}>

        <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px" }}>
          <Typography sx={{ fontWeight: 'bold', mr: 2 ,fontSize:'20px'}}>Announcement</Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Div>

        <Div>
            <Typography sx={{ mb: 1 }}><b>Title</b></Typography>
            <TextField
              fullWidth
              size='small'
              value={title}
              labe="title"
              onChange={(e) => { setTitle(e.target.value)}}
              sx={{ mb: 2 }}
            />
          </Div>

        <Typography sx={{ marginBottom: '10px' }}><b>Message</b></Typography>

        <SunEditor
          sx={{ mt: 2 }}
          //autoFocus={true}
          getSunEditorInstance={getSunEditorInstance}
          setContents={editorState}
          setDefaultStyle="min-height:300px"
          setOptions={{
            buttonList: [[
              "undo",
              "redo",
              "font",
              "fontSize",
              "formatBlock",
              "paragraphStyle",
              "blockquote",
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
              "fontColor",
              "hiliteColor",
              "textStyle",
              "removeFormat",
              "outdent",
              "indent",
              "align",
              "horizontalRule",
              "list",
              "lineHeight",
              "table",
              "link",
              "image",
              "video",
              "audio",
              "fullScreen",
              "showBlocks",
              "codeView",
              "preview",
              "print",]
            ]
          }}
          onChange={editorHandleChange} />


        <Div sx={{ ml: 1 }}>
          <Typography sx={{ mr: 2 ,mt:2}}><b>Audience</b></Typography>
          <FormControl sx={{ mt: 2,margin:'10px' }}>
            <Grid container spacing={2}>
            {options.map((option) => (
              <Grid item  xs={12} md={6}>
              <FormControlLabel
                key={option.value}
                control={
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                    }}
                  >
                    <Checkbox
                      style={{
                        position: 'absolute',
                        opacity: 0, // Make the default checkbox invisible
                        pointerEvents: 'none', // Disable pointer events on the default checkbox
                        ml:2
                      }}
                      type="checkbox"
                      checked={selectedValues.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                    />
                    <div
                      style={{
                        width: '16px', // Adjust the size as needed
                        height: '16px',
                        borderRadius: '50%', // Make it circular
                        border: '2px solid #50C2C9', // Change the border color as needed
                        backgroundColor: selectedValues.includes(option.value) ? '#50C2C9' : 'transparent', // Change the background color when checked
                        marginRight: '5px', // Adjust spacing as needed
                        padding: '4px',
                      }}
                    />
                  </div>
                }
                label={option.label}
              />
              </Grid>
            ))}
            </Grid>
          </FormControl>

        </Div>
        <Grid sx={{ textAlign: 'right', alignItems: 'right', p: 2 }}>


          <ButtonGroup aria-label="split button">
            <Button variant="contained" disabled={!editorState || !title || selectedValues.length === 0} onClick={onSend}>Send</Button>

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
        
      </Div>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </Card>
  );
}
export default CampaignItems