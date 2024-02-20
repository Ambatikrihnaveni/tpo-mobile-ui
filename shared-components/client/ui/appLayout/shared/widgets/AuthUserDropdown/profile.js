import React, { useState, useEffect } from 'react'
import ProfileMediaGallery from './profileMediaGallery';
import { TextField, Typography, Button, Grid } from "@mui/material";
import useAuth from "/imports/client/ui/hooks/useAuth";
import Div from "@jumbo/shared/Div";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { IconButton, } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import AiServices from '../../../services/ai-services';
import { Tooltip } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";

let Editor = () => <React.Fragment />;
const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(270deg, #3fa1a9, #79f1a4)', // Replace these colors as desired
    color: 'white', // White text color suits this background
    '& .MuiIcon-root': {
      color: 'white', // White icon color to match the text
    },
  },
});

function Profile(params) {

  const { name, email, number, website, bio, addName, addEmail, addNumber, addBio, addWebsite } = params
  const { isViewerLoading, viewer, data } = useAuth();
  const [user, setUser] = React.useState(viewer);
  const uploadedImage = React.useRef(null);

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [isOptionsBoxVisible, setOptionsBoxVisibility] = React.useState(true);
  const classes = useStyles();
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
        addBio(bioContent)
      }
      setIsTextFieldVisible(false);
      setIsSubmitting(false)
      setIsSubmitted(false)
    }

  };
  const handleButtonClick = () => {

    setIsTextFieldVisible(true);
  }
  useEffect(() => {
    if (bio) {
      const html = bio;
      const contentBlock = convertFromHTML((html));
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
      }
    }

    Editor = require('react-draft-wysiwyg').Editor;

  }, [bio]);
  const onEditorChange = () => {
    const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    addBio(bioContent)
  }




  React.useEffect(() => {
    if (viewer) {
      setUser(viewer);
    }
  }, [viewer]);


  return (
    <div sx={{ p: { xs: 2, md: 5 } }}>
      <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', paddingLeft: '50px' }}>Complete your Institute details first.</h2>
  
      <Div sx={{ textalign: 'center', mb: 3 }}>
        <ProfileMediaGallery
          editable={true}
          media={user?.userMedia}
          userId={user?._id}
        />
      </Div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth size="small" value={name}
            onChange={addName} variant="outlined" label="Institute Name" sx={{ mt: 2 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth size="small" value={website}
            onChange={addWebsite} variant="outlined" label="Website" sx={{ mt: 2 }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth size="small" type={email} value={email}
            onChange={addEmail} variant="outlined" label="Email" disabled='true' sx={{ mt: 2 }} />

        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth type="number" value={number}
            onChange={addNumber} size="small" variant="outlined"
            label="Phone Number"
            sx={{
              '& input[type=number]': {
                '-moz-appearance': 'textfield'
              },
              '& input[type=number]::-webkit-outer-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              },
              '& input[type=number]::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0
              },
              mt: 2
            }}
          />

        </Grid>
      </Grid>
   
      <Typography sx={{ padding: '20px 3px 3px 3px' }}>Bio</Typography>
      <Tooltip title={"Generate with AI"} color='primary'>
        <Button variant="contained"
          disabled={isSubmitting == true}
          className={classes.button}
          style={{ fontWeight: 'bolder', float: 'right', marginTop: '30px' }}
          onClick={handleButtonClick}>
          AI
        </Button>
      </Tooltip>

      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          Width: 19000,
          margin: '-43px 0px 0px 0px ',
          zIndex: 2,
          position: 'relative',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginLeft: '10px'
        }}
      >
        {isTextFieldVisible && (
          <>
            <TextField
              fullWidth
              placeholder={"Enter your Prompt"}
              size={"large"}
              sx={{
                flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' }
              }}
              disabled={isSubmitted}
              onChange={handlePromptChange}
            />
            <Button disabled={isSubmitted || prompt.trim() === ''} sx={{ ml: 2 }} onClick={onSubmit}>
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
      <div>
        <Editor
          editorStyle={{
            width: '100%',
            minHeight: 200,
            borderWidth: 1,
            overflow: 'auto', maxHeight: '200px',
            borderStyle: 'solid',
            borderColor: 'lightgray',
          }}
          value={bio}
          onChange={onEditorChange}
          editorState={editorState}
          onEditorStateChange={editorState => setEditorState(editorState)}

        //toolbarHidden={isOptionsBoxVisible}

        />
      </div>
    </div >
  )
}

export default Profile