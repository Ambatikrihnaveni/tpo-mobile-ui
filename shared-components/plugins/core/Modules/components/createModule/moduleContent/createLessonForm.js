import React, { useEffect, useState } from 'react'
import { Card, Box, Button, Typography, TextField, IconButton, AppBar, Grid, Toolbar } from '@mui/material'
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import useLesson from '../../../hooks/useLesson'
import draftToHtml from 'draftjs-to-html';
import DailogChatBtn from '../../../../../../client/ui/components/ChatWidget/DailogChatBtn';
import ChatWidget from '../../../../../../client/ui/components/ChatWidget';
import { makeStyles } from '@mui/styles';
import AiServices from '../../../../../../client/ui/appLayout/services/ai-services';
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


function CreateLessonForm({ onClose, lessonId, Id }) {

    const {
        onUpdateLesson,
        lesson,
        shopId
    } = useLesson({ lessonId, Id });

    const [title, setTitle] = React.useState("")
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [error, setError] = React.useState("");
    const classes = useStyles();
    const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
    const [prompt, setPrompt] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const onChangeImage = (e) => {

        let img = e.target.files[0]
        setSelectedImage(URL.createObjectURL(img))
    }
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

        if (lesson) {
            setTitle(lesson.name)
            setSelectedImage(lesson.fea_img)
            if (lesson?.lesson_content) {
                const html = lesson.lesson_content;
                const contentBlock = convertFromHTML(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock);
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState)
                }
            }

        }
        Editor = require('react-draft-wysiwyg').Editor;
    }, [lesson])

    const onPublish = async () => {

        if (title?.trim() === "" && editorState.getCurrentContent().getPlainText()?.trim() === "") {
            setError("Please enter title and topic content");
            return;
        } else if (title?.trim() === "") {
            setError("Please enter title");
            return;
        } else if (editorState.getCurrentContent().getPlainText()?.trim() === "") {
            setError("Please enter  title &  content");
            return;
        }

        // If validation passes, proceed with form submission
        setError(""); // Clear error message if validation is successful

        //const lesson_content = editorState.getCurrentContent().getPlainText('\u0001');
        const lesson_content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const data = { name: title, fea_img: selectedImage, content: lesson_content }

        try {
            await onUpdateLesson({
                lesson: data
            })
            onClose()
            toast.success('updated successfully', {
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
            console.error('Error:', error);

        }
    }
    return (
        <Div>
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
                        Lesson
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() => onPublish()}>
                        save
                    </Button>
                </Toolbar>
            </AppBar>
            <Div sx={{ marginTop: "80px", mb: 4 }}>
                {/* <JumboScrollbar> */}
                <Grid>
                    <Card sx={{ maxWidth: "1100px", margin: "auto", p: 3 }}>
                        <Div sx={{ mb: 4 }}>


                            <Typography sx={{ mb: 1, fontWeight: 'bold', fontSize: '17px' }}>Lesson title </Typography>
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
                        <Div sx={{ mb: 4 }}>
                            <Typography style={{ fontWeight: 'bold', fontSize: '17px' }}>Lesson Description</Typography>
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
                            <Box sx={{ mt: 2, border: 1, borderColor: 'grey.500', p: 1, borderRadius: '15px', height: '350px', overflow: "scroll" }}>
                                {/*  <YooptaEditor value="hello" onChange={onChange} /> */}

                                <Editor
                                    editorStyle={{
                                        width: '100%',
                                        minHeight: 100,
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        borderColor: 'lightgray',
                                    }}
                                    editorState={editorState}
                                    onEditorStateChange={editorState => { setEditorState(editorState); setError("") }}

                                />
                            </Box>
                        </Div>
                        <Div>

                            <DailogChatBtn />
                            <ChatWidget />

                        </Div>
                    </Card>
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
        </Div>
    )
}
export default CreateLessonForm;