import React, { useState, useEffect } from 'react'
import Div from "@jumbo/shared/Div";
import styled from 'styled-components';
import { Form, Formik, } from "formik";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Button } from '@mui/material'
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Icon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import AiServices from '../../../services/ai-services';
import { Tooltip } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";
import {TextField} from '@material-ui/core';
import { IconButton, } from '@material-ui/core';

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

export default function Summary({ data, handleChangeBio, }) {


  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
        handleChangeBio(bioContent)
        
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
    if (data?.bio?.length > 0) {
      const html = data?.bio;


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
    handleChangeBio(bioContent)
  }


  return (
    <Formik initialValues={{}} onSubmit={() => { }}>
      <Form>
        <Div style={{ margin: {xs:'5px',sm:'10px 70px 70px'}, }}>
          <h2 style={{ width: '100%', color: '#2e475D', fontFamily: '"Domine",Georgia,serif', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem', marginRight: '5px' }}>Briefly tell us about your background
          </h2>
          <Tooltip title={"Generate with AI"} color='primary'>
            <Button variant="contained"
              className={classes.button}
              style={{ fontWeight: 'bolder',float: 'right', marginTop: '30px'  }}
              onClick={handleButtonClick}>
              {buttonText}
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
          <Editor
            editorStyle={{
              width: '100%',
              minHeight: 200,
              overflow: 'auto', maxHeight: '200px',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'lightgray',
            }}
            name="bio" value={data.bio} onChange={onEditorChange}
            editorState={editorState}
            onEditorStateChange={editorState => setEditorState(editorState)}
          />



        </Div >
      </Form>
    </Formik>


  )
}