import React, { useEffect, useState, useRef } from 'react'
import { Card, AppBar, Box, Button, Typography, TextField, Toolbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import 'react-quill/dist/quill.snow.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import useTopic from '../../../hooks/useTopic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DailogChatBtn from '../../../../../../client/ui/components/ChatWidget/DailogChatBtn';
import ChatWidget from '../../../../../../client/ui/components/ChatWidget';
import { makeStyles } from '@mui/styles';
import AiServices from '../../../../../../client/ui/appLayout/services/ai-services';
import { Tooltip } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";


const useStyles = makeStyles({
  button: {
    background: 'linear-gradient(270deg, #3fa1a9, #79f1a4)', // Replace these colors as desired
    color: 'white', // White text color suits this background
    '& .MuiIcon-root': {
      color: 'white', // White icon color to match the text
    },
  },
});


export default function ModuleTopicForm({ onClose, lessonId, topicId, Id }) {

  const {
    topic,
    shopId,
    onUpdateTopic
  } = useTopic({ lessonId, topicId, Id })
  const [title, setTitle] = React.useState("")
  const [editorState, setEditorState] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [error, setError] = React.useState("")
  const [isDataEntered, setIsDataEntered] = React.useState(false);
  const classes = useStyles();
  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
  const [prompt, setPrompt] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editor = useRef();

  // The sunEditor parameter will be set to the core suneditor instance when this function is called
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  const handlePromptChange = (event) => {
    setPrompt(event.target.value)
  }

  const onSubmit = async () => {
    setIsSubmitting(true)
    const { data } = await AiServices.generateBio(prompt)

    if (data) {
      const html = `<p>${data}</p>`
      setEditorState(html)
      setIsTextFieldVisible(false);
      setIsSubmitting(false)
      setIsSubmitted(false)
    }

  };
  const handleButtonClick = () => {

    setIsTextFieldVisible(true);
  }


  useEffect(() => {
    setIsDataEntered(title?.trim() !== "" || editorState == "");
  }, [title, editorState]);


  useEffect(() => {

    if (topic) {

      setTitle(topic.topic_name);
      if (topic?.topic_content) {
        const html = topic?.topic_content;
        setEditorState(html)

      }
    }

  }, [topic])

  const editorHandleChange = value => {

    setEditorState(value);
  };

  const onPublish = async () => {
    if (title?.trim() === "" && editorState == "") {
      setError("Please enter title and topic content");
      return;
    } else if (title?.trim() === "") {
      setError("Please enter title");
      return;
    } else if (editorState === "") {
      setError("Please enter topic title & topic content");
      return;
    }

    // If validation passes, proceed with form submission
    setError(""); // Clear error message if validation is successful

    // const topicContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const data = {
      name: title,
      image: selectedImage,
      lessonId: lessonId,
      content: editorState,
      topicId: topicId,
      Id: Id,
    };

    try {
      await onUpdateTopic({ topic: data });
      onClose();
      toast.success("Updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      // Handle error if needed
    }
  };
  return (
    <Div >
      <AppBar sx={{ position: 'fixed' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ textAlign: "center", flex: 1, color: "inherit" }} variant="h3" component="div">
            Topic
          </Typography>
          <Button autoFocus color="inherit" onClick={() => onPublish()}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <Div sx={{ marginTop: "80px", mb: 4 }}>

        <Card sx={{ maxWidth: "1100px", margin: "auto", p: 3 }}>
          <Div sx={{ mb: 4 }}>

            <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '18px' }}>Topic title </Typography>
            <TextField
              fullWidth
              size='small'
              value={title}
              required
              labe="Module title"
              onChange={(e) => {
                setTitle(e.target.value)
                setError("");
              }}

            />
            {error && <Div sx={{ color: "red" }} >{error}</Div>}
          </Div>
          <Div>

            <DailogChatBtn />
            <ChatWidget />

          </Div>
          <Div sx={{ mb: 3 }}>
            <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>Topic Content</Typography>
            <Div sx={{ display: 'flex' }}>
              <Div>
                <Tooltip title={"Generate with AI"} color='primary'>
                  <Button variant="contained"
                    className={classes.button}
                    style={{ fontWeight: 'bolder', marginTop: '20px' }}
                    onClick={handleButtonClick}>
                    AI
                  </Button>
                </Tooltip>
              </Div>
              <Div
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 1000,
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
                      fullwidth
                      placeholder={"Enter your Prompt"}
                      size={"large"}
                      sx={{ flex: 1, "& fieldset": { border: 'none', borderBottom: '1px solid black' }, marginTop: '-30px' }}
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
            </Div>
            <Box sx={{ mt: 2, border: 1, borderColor: 'grey.500', p: 1, borderRadius: '15px', height: '420px', }}>

              <SunEditor
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
                    "preview",]
                  ]
                }}
                onChange={editorHandleChange} />

            </Box>
          </Div>
        </Card>

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
  )
}
