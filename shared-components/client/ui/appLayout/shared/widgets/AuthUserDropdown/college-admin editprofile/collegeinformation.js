import { Card, Button, Grid, TextField, Typography, Select, MenuItem, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Div from "@jumbo/shared/Div";
import swal from 'sweetalert';
import { Form, Formik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Stack from '@mui/material/Stack';
import useAuth from '../../../../../hooks/useAuth';
import { makeStyles } from "@material-ui/core/styles";
import ProfileMediaGallery from '../profileMediaGallery';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState, useEffect } from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, } from '@material-ui/core';
import { Tooltip } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";
import AiServices from "../../../../services/ai-services";


let Editor = () => <React.Fragment />;


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  name: yup.string("enter your name").required('Batch Name is required'),

});


const useStyles = makeStyles({
  textarea: {
    resize: "both"
  },
  button: {
    background: 'linear-gradient(270deg, #3fa1a9, #79f1a4)', // Replace these colors as desired
    color: 'white', // White text color suits this background
    '& .MuiIcon-root': {
      color: 'white', // White icon color to match the text
    },
  },
});



export default function CollegeInformation(params) {

  const { name, email, number, website, bio, addName, addEmail, addNumber, addWebsite } = params
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [buttonText, setButtonText] = useState('AI');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }
  const onSubmit = async () => {
    setIsSubmitting(true)
    const { data } = await AiServices.generateBio(prompt)
    if (data) {
      const html = `<p>${data}</p>`
      const contentBlock = convertFromHTML((html));
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
        const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        params.handelOverViewChange(bioContent)
      } setIsTextFieldVisible(false);
      setIsSubmitting(false)
    }
  };
  const handleButtonClick = () => {
    setIsTextFieldVisible(true);
  }

  const { isViewerLoading, viewer, data } = useAuth();
  const [user, setUser] = React.useState(viewer);
  const uploadedImage = React.useRef(null);
  React.useEffect(() => {
    if (viewer) {
      setUser(viewer);
    }
  }, [viewer]);

  const classes = useStyles();


  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isOptionsBoxVisible, setOptionsBoxVisibility] = React.useState(true);


  useEffect(() => {
    if (params.overview) {
      const html = params.overview;



      const contentBlock = convertFromHTML((html));
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
      }
    }

    Editor = require('react-draft-wysiwyg').Editor;

  }, []);
  const onEditorChange = () => {
    const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    params.handelOverViewChange(bioContent)
  }

  const handleImageUpload = React.useCallback((e) => {
    const [file] = e.target.files;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }, []);
  React.useEffect(() => {
    if (viewer) {
      setUser(viewer);
    }
  }, [viewer]);


  return (
    <Formik
      validateOnChange={true}


      validationSchema={validationSchema}
      //   onSubmit={onInvit}
      enableReinitialize

    >{({ }) => (
      <Form>
        <Div sx={{ p: { xs: 2, md: 5 } }}>
          <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Provide details about your college.</h2>
        
          <Div sx={{ textAlign: 'center', mb: 3 }}>
            <ProfileMediaGallery
              editable={true}
              media={user?.userMedia}
              userId={user?._id}
            />
          </Div>
          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
            <Grid item xs={12} sm={6} >
              <Typography sx={{ padding: '3px 3px' }}><b> College Name*</b></Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="name"
                size="small"
                disabled
                value={params.name}
                onChange={(e) => {
                  params.handleNameChange(e);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <Typography sx={{ padding: '3px 3px' }}><b> College Email*</b></Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="email"
                disabled
                size="small"
                value={params.email}
                onChange={(e) => {
                  params.handelEmailChange(e);
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '2px' }}>
            <Grid item xs={12} sm={6} >
              <Typography sx={{ padding: '3px 3px' }}><b>Phone Number*</b></Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                type='number'
                variant="outlined"
                name="phone"
                size="small"
                value={params.phone}
                onChange={(e) => {
                  params.handelPhoneChange(e);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <Typography sx={{ padding: '3px 3px' }}><b> Website</b></Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                name="website"
                size="small"
                label="Enter website"
                value={params.website}
                onChange={(e) => {
                  params.handelWebsiteChange(e);
                }}
              />
            </Grid>

          
          </Grid>


          <Typography sx={{ padding: '20px 3px 3px 3px' }}><b>OverView</b></Typography>

          <Tooltip title={"Generate with AI"} color='primary'>
            <Button variant="contained"
              disabled={isSubmitting == true}
              className={classes.button}
              style={{ fontWeight: 'bolder', float: 'right', marginTop: '10px' }}
              onClick={handleButtonClick}>
              AI
            </Button>
          </Tooltip>

          <div style={{ display: "flex" }}>

            <Div
              sx={{
                display: "flex",
                alignItems: "center",
                margin: '-43px 0px 0px 0px ',
                zIndex: 2,
                position: 'relative',
                justifyContent: 'space-between',
                width: 19000,
                marginTop: "20px",
                marginLeft: '10px',
              }}
            >
              {isTextFieldVisible && (
                <>
                  <TextField
                    fullwidth
                    variant="standard"
                    label="Enter your Prompt"
                    size={"large"}
                    sx={{ flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' } }}
                    disabled={isSubmitted}
                    onChange={handlePromptChange}
                  />
                  <Button disabled={isSubmitted} sx={{ ml: 2 }} onClick={onSubmit}>
                    {isSubmitting ? (
                      <BeatLoader color="black" size={8} />
                    ) : (
                      <IconButton edge="end" color="inherit" aria-label="send" onClick={onSubmit} disabled={isSubmitted}>
                        <SendIcon style={{ color: 'gray' }} />
                      </IconButton>
                    )}
                  </Button>
                </>
              )}
            </Div>

          </div>
          <Editor
            editorStyle={{
              width: '100%',
              minHeight: 200,
              overflow: 'auto', maxHeight: '200px',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
            }}
            value={params.overview} onChange={onEditorChange}
            editorState={editorState}
            onEditorStateChange={editorState => setEditorState(editorState)}

          // toolbarHidden={isOptionsBoxVisible}

          />
        </Div>

      </Form>

    )}
    </Formik>

  )
}
