import { Box, Typography, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Div from '../../../../client/ui/@jumbo/shared/Div/Div';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButton, } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import { Tooltip } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";
import AiServices from '../../../../client/ui/appLayout/services/ai-services';


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

const ProgramDescription = ({ datas, handleChange, program, recordType }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isOptionsBoxVisible, setOptionsBoxVisibility] = React.useState(true);
  const classes = useStyles();
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [prompt, setPrompt] = useState('')
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
        handleChange(bioContent)
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
    if (program) {
      const html = program?.program_content;
      if (html) {
        const contentBlock = convertFromHTML((html));
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock);
          const editorState = EditorState.createWithContent(contentState);
          setEditorState(editorState)
        }
      }

    }

    Editor = require('react-draft-wysiwyg').Editor;

  }, [program]);
  const onEditorChange = () => {
    const bioContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    handleChange(bioContent)
  }


  return (
    <Div style={{ display: 'flex', flexDirection: 'column', }}>
      <Box>

        <Typography style={{ color: 'rgb(0, 0, 0)', fontWeight: '700', fontStyle: 'normal', fontSize: '30px', padding: '1px 5px', marginTop: recordType ? "" : '-9%' }}>Description</Typography>
        <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '5px', marginTop: '10px', }}>Provide a brief description or details about the program *(min 10 char)
        </Typography>
        <IconButton
          onClick={() => setOptionsBoxVisibility(!isOptionsBoxVisible)}
          color="primary"
          style={{ float: 'right' }}
          sx={{ marginBottom: 1, }}
        >
          {isOptionsBoxVisible ? <Button variant='outlined'><ExpandMoreIcon /></Button> : <Button variant='outlined'><ExpandLessIcon /></Button>}
        </IconButton>
        <Tooltip title={"Generate with AI"} color='primary'>
          <Button variant="contained"
            disabled={isSubmitting == true}
            className={classes.button}
            style={{ fontWeight: 'bolder', float: 'right', marginTop: '13px' }}
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
              minHeight: 170,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
              overflow: 'auto', maxHeight: '170px',
              placeholder: 'Write Your Program description here'
            }}
            value={datas}
            onChange={onEditorChange}
            editorState={editorState}
            onEditorStateChange={editorState => setEditorState(editorState)}
            toolbarHidden={isOptionsBoxVisible}
          />
        </div>
      </Box>
    </Div>
  )
}

export default ProgramDescription;
