import React from "react";
import { Grid, TextField, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@material-ui/core';
import { IconButton, } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { BeatLoader } from "react-spinners";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import Div from "@jumbo/shared/Div";


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

export default function CompitetiveEligibility(params) {
  
  const [isTextFieldVisible, setIsTextFieldVisible] = React.useState(false);

  const classes = useStyles();
  const {
    eligibility,
    syllabus,
    onEditorsChange,
    onEditorssChange,
    onSubmiting,
    onSubmit,
    setEditorState,
    isSubmitted,
    handlePromptsChange,
    isSubmitting,
    prompts,
    promptss,
    newEditorState,
    setNewEditorState,
    isSubmiting,
    isSubmited,
    TextFieldVisible,
    setTextFieldVisible,
    eligibilEditorState,
    setEligibilEditorState,
    handlePromptssChange,
    isSubmit

  } = params
  const handleButtonClick = () => {
    setIsTextFieldVisible(true);
  };

  const handleButtonsClick = () => {
    setTextFieldVisible(true);
  };

  React.useEffect(() => {
    ;
    if (eligibility) {
      const trimmedHtml = eligibility
      const contentBlock = convertFromHTML(trimmedHtml);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setEligibilEditorState(editorState);
      }
    }

    Editor = require('react-draft-wysiwyg').Editor;

  }, [eligibility]);

  React.useEffect(() => {

    if (syllabus) {
      const trimmedHtml = syllabus
      const contentBlock = convertFromHTML(trimmedHtml);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editorState = EditorState.createWithContent(contentState);
        setNewEditorState(editorState);
      }
    }
    Editor = require('react-draft-wysiwyg').Editor;

  }, [syllabus]);

  const handleEditorEligibilityChange = (eligibilEditorState) => {
    ;
    const content = eligibilEditorState?.getCurrentContent();
    const rawText = content.getPlainText();
    onEditorsChange(rawText); // Pass the raw text to the onEditorChange function
    setEditorState(eligibilEditorState);
  }

  const handleSyllabusChange = (newEditorState) => {
    const content = newEditorState.getCurrentContent();
    const rawText = content.getPlainText();
    onEditorssChange(rawText); // Pass the raw text to the onEditorChange function
    setEditorState(newEditorState);
  }

  return (
    <Grid>
      <Typography sx={{ mb: 2 }}><b>Eligibility</b></Typography>
      <Typography>Academic and Profissional Qualification</Typography>
      <Tooltip title={"Generate with AI"} color='primary'>
        <Button variant="contained"
          disabled={isSubmitting == true}
          className={classes.button}
          style={{ fontWeight: 'bolder', float: 'right', marginTop: '20px', marginLeft: '10px' }}
          onClick={handleButtonClick}>
          AI
        </Button>
      </Tooltip>

      <Div
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: 1000,
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
              sx={{ flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' } }}
              disabled={isSubmitted}
              onChange={handlePromptssChange}
            />
            <Button disabled={isSubmitted || !promptss.trim() === ''} sx={{ ml: 2 }} onClick={onSubmiting}>
              {isSubmiting ? (
                <BeatLoader color="black" size={8} />
              ) : (
                <IconButton edge="end" color="inherit" aria-label="send" onClick={onSubmiting} disabled={isSubmitted}>
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
            overflow: 'auto',
            maxHeight: '200px',
            borderStyle: 'solid',
            borderColor: 'lightgray',
          }}
          value={eligibility}
          onChange={handleEditorEligibilityChange}
          editorState={eligibilEditorState}
          onEditorStateChange={newState => setEligibilEditorState(newState)}

        />
      </div>

      <Div sx={{ mt: 5 }}>

        <Typography sx={{ mb: 2 }}><b>Syllabus</b></Typography>
        <Typography>Add Exam Syllabus </Typography>
        <Tooltip title={"Generate with AI"} color='primary'>
          <Button variant="contained"
            disabled={isSubmiting == true}
            className={classes.button}
            style={{ fontWeight: 'bolder', float: 'right', marginTop: '20px', marginLeft: '10px' }}
            onClick={handleButtonsClick}>
            AI
          </Button>
        </Tooltip>

        <Div
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: 1000,
            margin: '-43px 0px 0px 0px ',
            zIndex: 2,
            position: 'relative',
            justifyContent: 'space-between',
            marginTop: '20px',
            marginLeft: '10px'
          }}
        >
          {TextFieldVisible && (
            <>
              <TextField
                fullWidth
                placeholder={"Enter your Prompt"}
                size={"large"}
                sx={{ flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' } }}
                disabled={isSubmited}
                onChange={handlePromptsChange}
              />
              <Button disabled={isSubmited || !prompts?.trim() === ''} sx={{ ml: 2 }} onClick={onSubmit}>
                {isSubmit ? (
                  <BeatLoader color="black" size={8} />
                ) : (
                  <IconButton edge="end" color="inherit" aria-label="send" onClick={onSubmit} disabled={isSubmited}>
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
              overflow: 'auto',
              maxHeight: '200px',
              borderStyle: 'solid',
              borderColor: 'lightgray',
            }}
            value={syllabus}
            onChange={handleSyllabusChange}
            editorState={newEditorState}
            onEditorStateChange={newEditorState => setNewEditorState(newEditorState)}

          />
        </div>

      </Div>
    </Grid>

  )
}