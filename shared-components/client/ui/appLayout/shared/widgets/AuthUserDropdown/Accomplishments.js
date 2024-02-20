import React, { useEffect, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import Button from '@mui/material/Button';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Snackbar, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";
import { Tooltip } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import Div from "@jumbo/shared/Div";
import AiServices from '../../../services/ai-services';



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

const Accomplishments = ({ accomplishments, handleCheck, addAccomplishments, handleCloseAccomplishmentsDialog }) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [isOptionsBoxVisible, setOptionsBoxVisibility] = React.useState(true);
  const classes = useStyles();
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
        addAccomplishments(bioContent)
      } setIsTextFieldVisible(false);
      setIsSubmitting(false)
      setIsSubmitted(false)
    }

  };

  const handleButtonClick = () => {
    setIsTextFieldVisible(true);
  }

  const handleSave = () => {

    setOpenSnackbar(true);

    setTimeout(() => {
      handleCloseAccomplishmentsDialog();
    }, 500);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // Close the Snackbar
    setOpenSnackbar(false);
  };



  useEffect(() => {
    if (accomplishments) {
      const html = accomplishments;

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
    addAccomplishments(bioContent)
  }

  return (
    <div>
      <h2 style={{ width: '100%', color: '#475259', paddingLeft: '30px', paddingTop: '30px', fontFamily: '"Domine",Georgia,serif', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Accomplishments</h2>
      <h4 style={{ color: '#475259', paddingLeft: '30px', }}>Add anything else you want employers to know</h4>


      <Tooltip title={"Generate with AI"} color='primary'>
        <Button variant="contained"
          disabled={isSubmitting == true}
          className={classes.button}
          style={{ fontWeight: 'bolder', float: 'right', marginTop: '10px' }}
          onClick={handleButtonClick}>
          AI
        </Button>
      </Tooltip>

      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          margin: '-43px 0px 0px 0px ',
          zIndex: 2,
          position: 'relative',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginLeft: '10px',
          Width: 19000,

        }}
      >
        {isTextFieldVisible && (
          <>
            <TextField
              fullwidth
              placeholder={"Enter your Prompt"}
              size={"large"}
              sx={{
                flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' }
              }}
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

      <JumboDemoCard style={{ margin: '2px 40px' }} >

        <Editor
          editorStyle={{
            width: '100%',
            minHeight: 180,
            borderWidth: 1,
            overflow: 'auto', maxHeight: '180px',
            borderStyle: 'solid',
            borderColor: 'lightgray',

          }}
          value={accomplishments}
          onChange={onEditorChange}
          editorState={editorState}
          onEditorStateChange={editorState => setEditorState(editorState)}
        />
      </JumboDemoCard>
      <Button variant="contained" style={{ float: 'right', marginTop: '2%' }} onClick={handleSave}>Save</Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{
          backgroundColor: '#4CAF50',
          color: 'white', '& .MuiSvgIcon-root': { color: 'white' },
        }}>
          Save Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Accomplishments;
