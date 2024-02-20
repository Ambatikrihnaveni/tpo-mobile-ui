
import React, { useRef } from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Button from '@mui/material/Button';
import Div from "@jumbo/shared/Div";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import { LocalizationProvider } from "@mui/x-date-pickers";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CancelIcon from '@mui/icons-material/Cancel';
import { useMutation } from "@apollo/react-hooks";
import { ToastContainer, toast } from 'react-toastify';
import SunEditor from 'suneditor-react';
import createWebinarMutation from '../../../../../../graphql/services/webinarservices/mutations/createWebinar';
import {
  Stack,
  Grid,
  TextField,
  Card
} from "@mui/material";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '../../../../../../hooks/useAuth';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import editWebinar from '../../../../../../graphql/services/webinarservices/mutations/editWebinar';
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


function WebinarItem({ onClose, record, setRecordsListRefresh }) {
  const [selected, setSelected] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [webinarDate, setWebinarDate] = React.useState('');
  const [webinarStartTime, setWebinarStartTime] = React.useState('');
  const [webinarEndTime, setWebinarEndTime] = React.useState('');
  const classes = useStyles();
  const { viewer } = useAuth();
  const role = viewer?.role;
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');
  const [sendType, setSendType] = React.useState('')
  const [whatsapp, setWhatsapp] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState({});
  const [editorState, setEditorState] = React.useState('');
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [showFullToolbar, setShowFullToolbar] = React.useState(false);

  const [createWebinar] = useMutation(createWebinarMutation);
  const [editWebinarMutation] = useMutation(editWebinar);


  const options = [
    { value: 'All', label: 'Send to the entire list' },
    { value: 'Admin', label: 'Training Partner' },
    { value: 'College-Admin', label: 'College Admin' },
    { value: 'Tutor', label: 'Tutor' },
    { value: 'Student', label: 'Student' },
  ];
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
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedImage = () => {
    setSelectedImage(null);
  };


  const editor = useRef();

  const handleWhatsAppClick = (e) => {
    ;
    setSendType(e.target.value)

  };

  const handleWebinarDateChange = (event) => {
    const newDate = event.target.value;

    setWebinarDate(newDate);
  };

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  const editorHandleChange = value => {

    setEditorState(value);
  };

  const handleWebinarStartTimeChange = (event) => {
    setWebinarStartTime(event.target.value);
  };
  const handleWebinarEndTimeChange = (event) => {
    setWebinarEndTime(event.target.value);
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

  React.useEffect(() => {
    if (record) {
      setTitle(record.title)
      const html = record?.description;
      const contentBlock = convertFromHTML((html));
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setEditorState(bioContent)

      }
      setWebinarStartTime(record.startTime)
      setWebinarEndTime(record.endTime)
      setWebinarDate(record?.date)
      setLink(record?.url)
      setSelectedValues(record?.audiences)


    }
  }, [record])


  const onSend = async () => {
    if (record) {
      try {
        await editWebinarMutation({
          variables: {
            input: {
              id: record?.id,
              title: title,
              description: editorState,
              url: link,
              startTime: webinarStartTime,
              endTime: webinarEndTime,
              date: webinarDate,
              audiences: selectedValues
            }
          }
        });
        closeDialog()
        toast.success('Webinar Updated successfully', {
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
      } catch (error) {
        toast.error('Webinar creation  failed', {
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
    } else {
      try {
        await createWebinar({
          variables: {
            input: {
              title: title,
              description: editorState,
              url: link,
              startTime: webinarStartTime,
              endTime: webinarEndTime,
              date: webinarDate,
              audiences: selectedValues
            }
          }
        });
        closeDialog()
        toast.success('Webinar created successfully', {
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
        setRecordsListRefresh(true);

      } catch (error) {
        toast.error('Webinar creation  failed', {
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
  }


  return (
    <Card>
      <Div sx={{ padding: '10px 10px' }}>
        <IconButton
          sx={{ float: "right" }}
          edge="start"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>

        <Div>
          <Typography sx={{ fontWeight: 'bold', fontSize: "25px", mb: 3 }}>Webinar</Typography>

          <Div>
            <Typography sx={{ mb: 1 }}><b>Topic</b></Typography>
            <TextField
              fullWidth
              size='small'
              value={title}
              labe="title"
              disabled={record}
              onChange={(e) => { setTitle(e.target.value && e.target.value[0].toUpperCase() + e.target.value.slice(1)) }}
              sx={{ mb: 4 }}
            />
          </Div>

          <Div sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="contained" component="label">
                <b>Upload Image</b>
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                  disabled={record}
                />
              </Button>
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                />
                {/* <PhotoCamera /> */}
              </IconButton>
            </Stack>
            {selectedImage && (
              <div>
                <p>Selected Image:</p>
                <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
                <IconButton
                  color="secondary"
                  aria-label="clear selected image"
                  onClick={clearSelectedImage}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            )}
          </Div>

          <Typography sx={{ mb: 1 }}><b>Description</b></Typography>
          <SunEditor
            //autoFocus={true}
            getSunEditorInstance={getSunEditorInstance}
            setContents={editorState}
            setDefaultStyle="min-height:220px"
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
            onChange={editorHandleChange}
            disabled={record} />
          <Grid sx={{ textAlign: 'right', alignItems: 'right', p: 2 }}>
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

          <Div>
            <Typography sx={{ mb: 1 }}><b>Url Link </b></Typography>
            <TextField
              fullWidth
              size='small'
              value={link}
              labe="link"
              onChange={(e) => { setLink(e.target.value) }}
              sx={{ mb: 4 }}
            />
          </Div>

          <Div sx={{ display: 'flex', }}>

            <Grid sx={{ width: "30%" }}>
              <Typography sx={{ padding: '3px 3px' }}> <b>Date</b></Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={3} size='small'>
                  <TextField
                    id="date"
                    label="Webinar Date"
                    type="date"
                    value={webinarDate}
                    disabled={record}
                    onChange={handleWebinarDateChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>&nbsp;&nbsp;
            <Grid sx={{ width: "30%" }}>
              <Typography sx={{ padding: '3px 3px' }}> <b>Start Time</b></Typography>
              <TextField
                id="time"
                label=" Start Time"
                type="time"
                fullWidth
                value={webinarStartTime}
                disabled={record}
                onChange={handleWebinarStartTimeChange}
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}

              />

            </Grid>
            &nbsp;&nbsp;<Typography sx={{ mt: 6, ml: 2 }}>To</Typography>&nbsp;
            <Grid sx={{ width: "30%", mt: 3.7, ml: 2 }}>
              <TextField
                id="time"
                label="End Time"
                type="time"
                fullWidth
                value={webinarEndTime}
                onChange={handleWebinarEndTimeChange}
                defaultValue="00:00"
                disabled={record}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}

              />

            </Grid>

          </Div>

          <Div sx={{ ml: 1, mt: 2 }}>
            <Typography sx={{ mr: 2 }}><b>Audience</b></Typography>

            <FormControl sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {options.map((option) => {
                  if (role === 'Admin') {
                    if (['Tutor', 'Student', 'All'].includes(option.value)) {
                      return (
                        <Grid item xs={12} md={6} key={option.value}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedValues.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                                disabled={option.value !== 'All' && selectedValues.includes('All') && record}
                              />
                            }
                            label={option.label}
                          />
                        </Grid>
                      );
                    }
                  } else if (role === 'Master-Admin') {
                    if (['College-Admin', 'Student', 'Admin', 'All'].includes(option.value)) {
                      return (
                        <Grid item xs={12} md={6} key={option.value}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedValues.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                                disabled={option.value !== 'All' && selectedValues.includes('All') && record}
                              />

                            }
                            label={option.label}
                          />
                        </Grid>
                      );
                    }
                  }

                  // return null; // Skip rendering for other options
                })}
              </Grid>
            </FormControl>

          </Div>

          <ButtonGroup aria-label="split button" sx={{ float: "right", mb: 5, mt: 5 }}>
            <Button
              variant="contained"
              disabled={!title || !webinarDate || !webinarStartTime || !webinarEndTime || selectedValues.length === 0}
              onClick={onSend}
            >
              {record ? 'Update' : 'Send'}
            </Button>
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
      </Div>
    </Card>
  );
}
export default WebinarItem