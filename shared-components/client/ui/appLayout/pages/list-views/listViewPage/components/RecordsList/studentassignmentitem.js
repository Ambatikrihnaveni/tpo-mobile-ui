import React from 'react'
import {
    Card,
    Divider,
    Typography,
    Button,
    Box,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router';
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import useCurrentShopId from '../../../../../../hooks/useCurrentShopId';
import { useParams } from 'react-router-dom';
import ModulesService from '../../../../../../graphql/services/modules/modules-service';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import useAuth from '../../../../../../hooks/useAuth';
import useListViewPage from '../../hooks/useListViewPage';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const studentAssignment = gql`
mutation submitAssignment($input:SubmitAssignmentInput!){
    submitAssignment(input:$input)
}`
import { useMediaQuery, useTheme } from '@mui/material';



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

const limitedToolbarOptions = {
    options: ['inline', 'link', 'image', 'blockType'],
    inline: {
        options: ['bold', 'italic', 'underline'],
    },
    link: {
        options: ['link'],
    },
};

const fullToolbarOptions = {
    options: [
        'inline',
        'blockType',
        'fontSize',
        'list',
        'textAlign',
        'colorPicker',
        'link',
        'embedded',
        'emoji',
        'image',
        'remove',
        'history',
    ],
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




export default function StudentAssignmentItem() {
    const [descriptionText, setDescriptionText] = React.useState('')
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const routeParams = useParams()
    const lessonId = routeParams?.lessonId
    const productId = routeParams?.productId
    const navigate = useNavigate();
    const { shopId } = useCurrentShopId()
    const [lessonName, setLessonName] = React.useState('')
    const [assignments, setAssignments] = React.useState([])
    const [assignmentLength, setAssignmentLength] = React.useState()
    const [assignmentAttempt] = useMutation(studentAssignment, { ignoreResults: true })
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [assignmentDescription, setAssignmentDescription] = React.useState("")
    const [showFullToolbar, setShowFullToolbar] = React.useState(false);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question index
    const { viewer } = useAuth()
    const { setRecordsListRefresh } = useListViewPage()

    const location = useLocation();
    const url = location.pathname;
    //  const shopId = localStorage.getItem('accounts:shopId')


    React.useEffect(async () => {
        const lessonData = await ModulesService.getLesson(productId, shopId, lessonId)
        const lesson = lessonData?.data?.data?.lesson
        if (lesson) {
            setLessonName(lesson?.name)
            setAssignments(lesson?.assignments)
            setAssignmentLength(lesson?.assignments?.length)
        }

    }, [lessonId])
    const [answers, setAnswers] = useState(new Array(assignmentLength).fill(''));
    const isLastQuestion = currentQuestionIndex === assignmentLength - 1;

    const calculateProgressPercentage = () => {
        // Your progress calculation logic here based on the currentQuestionIndex
        return ((currentQuestionIndex + 1) / assignmentLength) * 100;
    };

    const handleSaveAndNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const newAnswers = [...answers];
            newAnswers[currentQuestionIndex] = editorState.getCurrentContent().getPlainText();
            setAnswers(newAnswers);

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setEditorState(EditorState.createEmpty());
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setEditorState(EditorState.createWithText(answers[currentQuestionIndex - 1]));
        }
    };

    const handleSubmit = async () => {
        
        const assignmentId = assignments[currentQuestionIndex]._id
        const studentId = viewer?._id
        const answer = descriptionText
        try {
            const { data } = await assignmentAttempt({
                variables: {
                    input: {
                        studentId,
                        assignmentId,
                        answer,
                    },
                },
            });
            if (isLastQuestion) {

                var index = url?.search('todaysclass');
                if (index !== -1) {
                  return  navigate("/todaysclass");
                } else  {
                 return   navigate(-1)
                }

            } else {
                if (currentQuestionIndex < assignments.length - 1) {
                    const newAnswers = [...answers];
                    newAnswers[currentQuestionIndex] = editorState.getCurrentContent().getPlainText();
                    setAnswers(newAnswers);
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setEditorState(EditorState.createEmpty());
                }
            }

        } catch (error) {
            // Handle error if the mutation fails
            console.error("Error saving data:", error);
        }
    }

    React.useEffect(() => {

        if (descriptionText?.length > 0) {

            const html = descriptionText;
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
        setDescriptionText(bioContent)
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
    };
    const isEditorEmpty = editorState.getCurrentContent().getPlainText().trim() === '';

    const handleCancelClick = () => {
        navigate(`/todaysclass`)
    }

    const handelDescription = (event) => {
        setAssignmentDescription(event.target.value)
    }


    return (
        <Div>
            <Card sx={{ width: '100%', padding: '20px 20px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>

                            <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                                {lessonName}
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ flexGrow: 0, color: 'white', ml: 4 }}>
                                Your Progress:  {currentQuestionIndex + 1} /{assignmentLength} ({Math.round(calculateProgressPercentage())}%)                            </Typography>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ ml: 2 }}
                                onClick={handleCancelClick}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </Box>

                <Typography sx={{ marginTop: '30px', fontSize: '20px' }}> <b>{assignments[currentQuestionIndex]?.assignment_title}</b></Typography>
                <Div sx={{ marginTop: '25px' }}>
                    <Divider sx={{ height: '1px', backgroundColor: "#555457" }} />

                    {isMobile ? (
                        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                            <Grid item xs={12} sx={{ padding: '10px 0' }}>
                                <Div sx={{ display: "flex", flexDirection: 'row' }}>
                                    <Typography sx={{ marginBottom: '10px' }}>Duration : <b>{assignments[currentQuestionIndex]?.time_limit}{assignments[currentQuestionIndex]?.time_limit_type}</b></Typography>
                                    <Typography sx={{ marginLeft: '12%', marginBottom: 0 }}>Deadline :<b>N/A</b></Typography>
                                </Div>
                            </Grid>
                            <Grid item xs={12} sx={{ padding: '10px 0' }}>
                                <Div sx={{ display: "flex", flexDirection: 'row' }}>
                                    <Typography sx={{ marginBottom: '10px' }}>Total Marks :<b>{assignments[currentQuestionIndex]?.total_points}</b></Typography>
                                    <Typography sx={{ marginLeft: '19%', marginBottom: 0 }}>Pass Marks :<b> {assignments[currentQuestionIndex]?.min_pass_points}</b></Typography>
                                </Div>
                            </Grid>
                        </Grid>

                    ) : (
                        <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                            <Grid item xs={10} sx={{ padding: '10px 10px' }}>
                                <Div sx={{ display: "flex" }}>
                                    <Typography sx={{ marginBottom: '10px' }}>Duration : <b>{assignments[currentQuestionIndex]?.time_limit}{assignments[currentQuestionIndex]?.time_limit_type}</b></Typography>
                                    <Typography sx={{ marginLeft: '5%', marginBottom: 0 }}>Deadline :<b>N/A</b></Typography>
                                </Div>
                            </Grid>
                            <Grid item xs={2}>
                                <Div sx={{ display: "flex" }}>
                                    <Typography sx={{ marginBottom: '10px' }}>Total Marks :<b> {assignments[currentQuestionIndex]?.total_points}</b></Typography>
                                    <Typography sx={{ marginLeft: '5%', marginBottom: 0 }}>Pass Marks :<b> {assignments[currentQuestionIndex]?.min_pass_points}</b></Typography>
                                </Div>
                            </Grid>
                        </Grid>
                    )}
                    <Divider sx={{ height: '2px', backgroundColor: "#555457", marginTop: '10px' }} />
                </Div>

                <Typography sx={{ marginTop: '30px' }}><b>Assignment Submission</b></Typography>

                <Div sx={{ marginTop: '30px' }}>
                    <Typography sx={{ marginBottom: '10px' }}>Assignment answer form </Typography>

                    <Button variant='outlined' onClick={() => setShowFullToolbar(!showFullToolbar)} style={{ float: 'right', marginTop: '6px', }}>
                        {showFullToolbar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Button>

                    <Editor
                        editorStyle={{
                            width: '100%',
                            minHeight: 200,
                            overflow: 'auto',
                            maxHeight: '200px',
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'lightgray',
                            display: 'block',
                        }}
                        value={descriptionText}
                        toolbar={showFullToolbar ? fullToolbarOptions : limitedToolbarOptions}
                        onChange={onEditorChange}
                        editorState={editorState}
                        onEditorStateChange={editorState => setEditorState(editorState)}

                    />
                </Div>

                <Div sx={{ marginTop: '50px', backgroundColor: '#f0f0f0', padding: '40px 20px', width: '100%' }}>
                    <Div sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
                        <Div>
                            <Typography>Attach assignment files (Max: 1 file) </Typography>
                            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                <input
                                    type="file"
                                    id="file-upload"
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        marginTop: isMobile ? '20px' : 0,
                                        marginBottom: isMobile ? '10px' : 0,
                                        marginRight: isMobile ? 0 : '10px',
                                        padding: isMobile ? '5px 5px' : '10px 10px',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    <span>Choose File</span>
                                </Button>
                            </label>
                        </Div>
                        <Div sx={{ marginTop: isMobile ? '20px' : 0, marginLeft: isMobile ? 0 : '3%' }}>
                            <Typography>File Support: Any standard image, Document, Presentation, Sheet, PDF, or Text file is allowed </Typography>
                            <Typography>Total File Size: Max 2 MB </Typography>
                        </Div>
                    </Div>
                </Div>
                {isMobile ? (<Div sx={{ marginTop: '30px', }}>
                    {currentQuestionIndex > 0 && (
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', marginBottom: isMobile ? '15px' : 0, marginRight: isMobile ? '10px' : 0 }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}

                    {!isLastQuestion ? (
                        <Button
                            variant="contained"
                            sx={{ color: 'white', float: 'right' }}
                            onClick={handleSubmit}
                            disabled={isEditorEmpty}
                        >
                            Submit & Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ color: 'white', float: 'right', }}
                            onClick={handleSubmit}
                            disabled={isEditorEmpty}
                        >
                            Submit
                        </Button>
                    )}
                </Div>) : (<Div sx={{ display: 'flex', marginTop: '50px', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                    {currentQuestionIndex > 0 && (
                        <Button
                            variant="contained"
                            sx={{ textTransform: 'capitalize', marginBottom: isMobile ? '10px' : 0, marginRight: isMobile ? '10px' : 0 }}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    )}
                    {!isLastQuestion ? (
                        <Button
                            variant="contained"
                            sx={{ color: 'white', float: 'right', marginLeft: '5%' }}
                            onClick={handleSubmit}
                            disabled={isEditorEmpty}
                        >
                            Submit & Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ color: 'white', float: 'right', marginLeft: '5%' }}
                            onClick={handleSubmit}
                            disabled={isEditorEmpty}
                        >
                            Submit
                        </Button>
                    )}
                </Div>)}

                <Divider sx={{ height: '1px', backgroundColor: "#555457", mt: 4 }} />

                <Div sx={{ marginTop: '30px' }}>
                    <Typography sx={{ marginBottom: '30px' }}><b>Description</b></Typography>
                    <Typography>{assignments[currentQuestionIndex]?.assignment_title}</Typography>
                    <Typography sx={{ marginTop: '30px' }} dangerouslySetInnerHTML={{ __html: assignments[currentQuestionIndex]?.summary }} />
                </Div>


            </Card>
        </Div>
    )
}
