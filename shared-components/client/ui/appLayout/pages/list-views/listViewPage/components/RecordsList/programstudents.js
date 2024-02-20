import * as React from 'react';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import { useMutation } from "@apollo/react-hooks";
import JumboListItem from "@jumbo/components/JumboList/components/JumboListItem";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import CampaignIcon from '@mui/icons-material/Campaign';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Div from "@jumbo/shared/Div";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from "@mui/material/InputBase"
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Picker from 'emoji-picker-react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import createNotificationMutation from '../../../../../../graphql/services/notifications/mutations/createNotification';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  ListItemText,
  Stack,
  List,
  ListItemAvatar,
  ListItemIcon,
  IconButton,
  Grid,
} from "@mui/material";

let Editor = () => <React.Fragment/>;



const data = [

  {
    id: 1,
    name: 'vinay',
    path: 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSyuHCGDUN6vGolF8KZPl-7PQN81qzk-bdCgukv8X8d-D45ii94Uxz3JfprlT9kW7bBO3qA2wt1wHyw-Eg'
  },
  {
    id: 2,
    name: 'mosha',
    path: 'https://assets.telegraphindia.com/telegraph/2023/May/1685319810_virat.gif'
  },
  {
    id: 3,
    name: 'koti',
    path: 'https://c.ndtvimg.com/2023-08/udvef5t8_virat-kohli-806_625x300_18_August_23.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605'
  },
  {
    id: 4,
    name: 'ramesh',
    path: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2022/2/18/w900X450/Virat_Kohli_AP.jpg?w=400&dpr=2.6',
  },
  {
    id: 5,
    name: 'mastan',
    path: 'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },
  {
    id: 6,
    name: 'virat',
    path: 'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },

  {
    id: 7,
    name: 'ramesh',
    path: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2022/2/18/w900X450/Virat_Kohli_AP.jpg?w=400&dpr=2.6',
  },
  {
    id: 8,
    name: 'mastan',
    path: 'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },
  {
    id: 9,
    name: 'virat',
    path: 'https://crictoday.com/wp-content/uploads/2023/05/virat-1-1-1024x576-1.jpg'
  },

];


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
const limitedToolbarOptions = {
  options: ['inline','link','image','blockType',],
  inline: {
    options: ['bold', 'italic', 'underline'],
  },
  link: {
    options: ['link',],
  },
  
};

const fullToolbarOptions = {
  options: ['inline', 'blockType','fontSize','list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove','history'],
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

function ProgramStudents({ scrollHeight, record }) {
  
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [filteredTasks, setFilteredTasks] = React.useState(record?.students);
  const [selected, setSelected] = React.useState([]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [message, setMessage] = React.useState('')
  const classes = useStyles();
  const [sendType, setSendType] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedFiles, setSelectedFiles] = React.useState({});

  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);
  const [filteredStudents, setFilteredStudents] = React.useState(record?.students);
  const [searchKeywords, setSearchKeywords] = React.useState("");
  const [createNotification] = useMutation(createNotificationMutation);
  const [editorState, setEditorState] =React.useState(EditorState.createEmpty());
  const [showFullToolbar, setShowFullToolbar] = React.useState(false);



  React.useEffect(() => {
    const filtered = record?.students?.filter(student =>
      student?.name?.toLowerCase().includes(searchKeywords.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchKeywords, record]);
  


  const handleTagFaceClick = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };


  const handleEmailClick = (e) => {
    setSendType(e.target.value)
  };

  const handleWhatsAppClick = (e) => {
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


  const viewProfile = (id) => {
    navigate(`/${id}/viewprofile`)
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
  const onEditorChange=()=>{
    const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    handelOverViewChange(bioContent)
  }


  React.useEffect(() => {
    if (activeCategory && activeCategory !== "all")
      setFilteredTasks(record?.students?.filter(task => task.category === activeCategory));
    else
      setFilteredTasks(record?.students);

  }, [activeCategory]);

  const handleChange = (e) => {
    setActiveCategory(e.target.value);
  };


  const handleSelectAllClick = (event) => {

    if (event.target.checked) {
      const newSelected = record?.students?.map((n) => n);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, data) => {
    ;
    const selectedIndex = selected.indexOf(data);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, data);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const Announcement = () => {
    if (selected.length > 0) {
      return (
        <IconButton color="primary" aria-label="delete" onClick={openDialog}>
          <CampaignIcon fontSize='large' />
        </IconButton>

      );
    } else {
      return <div />;
    }
  };

  const handleFileSelect = (event, data) => {
    
    const file = event.target.files[0];
    setSelectedFiles((prevSelectedFiles) => ({
      ...prevSelectedFiles,
      [data.id]: file,
    }));
  };

  const onSend = async () => { 
    setEditorState(EditorState.createEmpty());
    setMessage('');

    let accountIds = []
    for (let i = 0; i < selected.length; i++) {
      accountIds.push(selected[i]._id)
    }

    try {
      await createNotification({
        variables: {
          input: {
            message: message,
            accountIds: accountIds,
            sendType: sendType
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
      toast.error('Message sent faild', {
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

  return (
    <JumboCardQuick
      title={
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <ListItemIcon sx={{ minWidth: 40, mt: 0 }}>
            <Checkbox edge="start"
              onChange={handleSelectAllClick}
            />
          </ListItemIcon>

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
              inputProps={{ 'aria-label': 'search' }}
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
            />
            <IconButton
              paddingLeft="20px"
              component="label"
              onClick={() => {
                setSearchKeywords("");
              }}

            >
              <CancelIcon />
            </IconButton>
          </Div>
        </Stack>
      }
      action={



        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Dialog open={dialogOpen} onClose={closeDialog} sx={{ Width: { md: '750px' } }} >

            <Div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Announcement</Typography>
              <IconButton onClick={closeDialog} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Div>



            <DialogContent sx={{ marginTop: '40x', width: {lg:'500px'}, justifyContent: 'center', padding: '15px' }}>
              <DialogContentText sx={{ marginLeft: '5px', p: 2 }}>

                 {/*  <Div sx={{ display: 'flex', marginTop: '50px' }}>
                    <Grid Item>
                      <IconButton
                        aria-label="attach-file"
                        component="label"

                      >
                        <AttachFileIcon />
                        <input
                          type="file"
                          hidden
                          onChange={(event) => handleFileSelect(event, admin)}
                        />
                      </IconButton>
                    </Grid>

                    <Grid Item>
                      <IconButton
                        aria-label="tag-face"
                        onClick={handleTagFaceClick}
                      >
                        <TagFacesIcon />
                      </IconButton>
                    </Grid>
                    &nbsp;&nbsp;
                  </Div> */}

                   {/*  <TextField
                      // fullWidth
                      sx={{ width: '100%' }}
                      //label="OverView"
                      multiline
                      placeholder='Hello ! Students'
                      variant="outlined"
                      rows={4}
                      autoComplete="off"
                      inputProps={{ className: classes.textarea }}
                      size="small"
                      value={message}
                      // onChange={(e)=> handleInputChange(e)}
                      onChange={(e) => {
                        handelOverViewChange(e);
                      }}
                    /> */}
                    <Button variant='outlined' onClick={() => setShowFullToolbar(!showFullToolbar)} style={{float:'right',marginTop:'6px',}}>
                      {showFullToolbar ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </Button>
                        <Editor
                editorStyle={{
                    //maxWidth: '100%',
                    minHeight: 150,
                    overflow: 'auto', maxHeight: '150px',
                    borderWidth: 1,
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


                 
                <Grid sx={{textAlign:'right', alignItems: 'right',p:2 }}>


                  <ButtonGroup aria-label="split button">
                    <Button variant="contained" disabled={message.length < 10} onClick={onSend}>Send</Button>
                   
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

              </DialogContentText>

            </DialogContent>

          </Dialog>
          {Announcement()}

          {/* <Select value={activeCategory} onChange={handleChange} size={"small"}>
                   <MenuItem value={"all"}>Select</MenuItem>
            {
                media.map((category, index) => (
                    <MenuItem key={index} value={category.value}>
                        {category.label}
                    </MenuItem>
                ))
            }
            </Select> 
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>*/}


        </Stack>

      }
      headerSx={{
        borderBottom: 1,
        borderBottomColor: 'divider'
      }}
      wrapperSx={{ p: 0 }}
    >
      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 392}
        autoHide
        autoHideDuration={200}
        autoHideTimeout={500}
      >
        <List >
          {
            filteredStudents?.map((student, index) => (
              <JumboListItem
                componentElement={"div"}
                itemData={student}
                sx={{
                  cursor: 'pointer',
                  borderTop: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >

                <ListItemIcon sx={{ minWidth: 40, mt: 0 }}>
                  <Checkbox edge="start" checked={selected.indexOf(student) !== -1} tabIndex={-1} onChange={(event) => handleClick(event, student)} />
                </ListItemIcon>

                <ListItemAvatar >
                  <Avatar src={""} alt={student.name} />
                </ListItemAvatar>
                <ListItemText
                  // onClick={showtutorDetail}
                  primary={
                    <Typography variant={"body1"} component={"div"}>
                      <Stack direction={"row"} alignItems={"center"} sx={{ minWidth: 0 }} onClick={() => viewProfile(student._id)}>
                        <Item
                          sx={{
                            flexBasis: { xs: '100%', sm: '50%', md: '25%' }
                          }}
                        >
                          <Typography variant={"h5"} fontSize={14} lineHeight={1.25} mb={0}
                            noWrap> {student?.name && student?.name.charAt(0).toUpperCase() + student?.name.slice(1)}                                        </Typography>
                          {/*                                     <Typography
                                        variant={"body1"}
                                        noWrap
                                        color={'text.secondary'}
                                        sx={{
                                            display: { sm: 'none' }
                                        }}
                                    >
                                        {record.email}
                                    </Typography> */}
                        </Item>

                      </Stack>
                    </Typography>
                  }
                />

              </JumboListItem>
            ))
          }
        </List>
      </JumboScrollbar>
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
    </JumboCardQuick>
  );
}
export default ProgramStudents