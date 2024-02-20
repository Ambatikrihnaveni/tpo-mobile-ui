import React, { useState, useEffect } from 'react';
import { Divider, Typography, TextField, Grid, Button, Tooltip,IconButton,MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send';
import { BeatLoader } from "react-spinners";
import { convertToRaw, EditorState, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Div from "@jumbo/shared/Div";
import AiServices from '../../../../../../client/ui/appLayout/services/ai-services';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CloseIcon from '@mui/icons-material/Close';
import useCurrentShopId from '../../../../../../client/ui/hooks/useCurrentShopId';
import { ToastContainer, toast } from 'react-toastify';
import useAssignment from '../../../hooks/useAssignment';
import ModulesService from '../../../../../../client/ui/graphql/services/modules/modules-service';

let Editor = () => <React.Fragment />;
const useStyles = makeStyles({
    button: {
        background: 'linear-gradient(270deg, #3fa1a9, #79f1a4)',
        color: 'white',
        '& .MuiIcon-root': {
            color: 'white',
        },
    },
    cancelButton: {
        border: '1px solid #50C2C9',
        color: '#50C2C9',
        '&:hover': {
            background: '#50C2C9',
            color: 'white',
        },
    },
    updateButton: {
        border: '1px solid #50C2C9',
        color: '#50C2C9',
        '&:hover': {
            background: '#50C2C9',
            color: 'white',
        },
    },
    UploadAttachments: {
        border: '1px solid #50C2C9',
        color: '#50C2C9',
        '&:hover': {
            background: '#50C2C9',
            color: 'white',
        },
    },
});
const days = [
    {
        value: 'Years',
        label: 'Years'
    },
    {
        value: 'Months',
        label: 'Months'
    },
    {
        value: 'Weeks',
        label: 'Weeks'
    },
    {
        value: 'Days',
        label: 'Days'
    }
]

export default function AssignmentForm({ onClose, lessonId, productId, assignmentId }) {
    const { shopId } = useCurrentShopId()
    const { onUpdateAssignment, onCreateAssignment } = useAssignment({ shopId, Id: productId, lessonId })
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);
    const classes = useStyles();
    const [prompt, setPrompt] = useState('')
    const [buttonText, setButtonText] = useState('AI');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [descriptionText, setDescriptionText] = React.useState('')
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [timeLimit, setTimeLimit] = useState('');
    const [totalPoints, setTotalPoints] = useState('');
    const [minPassPoints, setMinPassPoints] = useState('');
    const [maxFileSize, setMaxFileSize] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState(null);


    const handleTimeLimitChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) || value === '') {
          setTimeLimit(value);
        }
      };
      

      const handleTotalPointsChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) || value === '') {
          setTotalPoints(value);
        }
      };

      const handleMinPassPointsChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) || value === '') {
          setMinPassPoints(value);
        }
      };

      const handleMaxFileSizeChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) || value === '') {
          setMaxFileSize(value);
        }
      };

    const handleSummaryChange = (event) => {
        setSummary(event.target.value);
    };

    const handleAssignmentTitleChange = (event) => {
        setAssignmentTitle(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handlePromptChange = (event) => {
        setPrompt(event.target.value)
    }

    React.useEffect(async () => {
        if (assignmentId) {
            try {
                const data = await ModulesService.getAssignments(assignmentId);
                if (data) {
                    setAssignmentTitle(data?.assignment?.assignment_title);
                    setTimeLimit(data?.assignment?.time_limit);
                    setTotalPoints(data?.assignment?.total_points);
                    setSelectedValue(data?.assignment?.time_limit_type);
                    setMinPassPoints(data?.assignment?.min_pass_points);

                    if (data?.assignment?.summary) {
                        const html = data?.assignment?.summary;
                        setDescriptionText(html);
                        const contentBlock = convertFromHTML(html);
                        if (contentBlock) {
                            const contentState = ContentState.createFromBlockArray(contentBlock);
                            const editorState = EditorState.createWithContent(contentState);
                            setEditorState(editorState);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching assignment data:", error);
            }
        }

        Editor = require('react-draft-wysiwyg').Editor;

    }, [assignmentId]);

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
                const descriptionText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
                setDescriptionText(descriptionText)
            } setIsTextFieldVisible(false);
            setIsSubmitting(false)
            setIsSubmitted(false)
        }
    };
    const handleButtonClick = () => {
        setIsTextFieldVisible(true);
    }
    useEffect(() => {
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
        const descriptionText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setDescriptionText(descriptionText)
    }
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
    };

    const createAssignment = () => {
        if (assignmentId != undefined) {
            try {
                const data = {
                    assignmentId: assignmentId,
                    assignmentTitle,
                    descriptionText,
                    timeLimit,
                    selectedValue,
                    minPassPoints,
                    totalPoints
                }
                onUpdateAssignment({ assignment: data });
                toast.success('Assignment Updated Successfully', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    onClose();
                }, "3000");
            } catch (error) {
                // Handle error if needed
            }
        } else {
            const data = {
                assignmentId: assignmentId,
                assignmentTitle,
                descriptionText,
                timeLimit,
                selectedValue,
                minPassPoints,
                totalPoints
            }


            try {
                onCreateAssignment({
                    assignment: data
                });
                toast.success('Assignment Created Successfully', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    onClose()
                    lessonssRefresh()
                }, "3000");
            } catch (error) {
            }

        }
    }
    return (
        <Div sx={{ paddingBottom: '20px', borderColor: '1px solid black' }}>
            <Div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0px 24px', height: '3.8rem', position: 'relative', }}>
                <Typography variant='h5' style={{ color: 'rgb(44, 42, 80)', fontWeight: "bold", fontSize: '20px', marginLeft: '10px' }}>Assignment</Typography>
                <IconButton
                    //edge="end"
                    onClick={onClose}
                    sx={{ marginLeft: '20px' }}
                >
                    <CloseIcon />
                </IconButton>
            </Div>
            <Divider sx={{ backgroundColor: '#0a0909', marginTop: '20px', height: '2px' }} />
            <Grid>
                <Typography sx={{ fontSize: '16px', marginTop: '20px', marginLeft: '40px' }}>Assignment Title</Typography>
                <TextField label="Title" size='small' sx={{ marginLeft: '40px', marginTop: '15px', width: '80%' }} value={assignmentTitle} onChange={handleAssignmentTitleChange} />
            </Grid>
            <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}> Summary</Typography>
            <Tooltip title={"Generate with AI"} color='primary'>
                <Button variant="contained"
                    disabled={isSubmitting == true}
                    className={classes.button}
                    style={{ fontWeight: 'bolder', float: 'right', marginTop: '10px', marginLeft: '-10px' }}
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
                    Width: 1000,
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
            <Div>
                <Editor
                    editorStyle={{
                        width: '100%',
                        minHeight: 200,
                        overflow: 'auto', maxHeight: '200px',
                        borderWidth: 1,
                        borderStyle: 'solid',
                        borderColor: 'lightgray',

                    }}
                    value={descriptionText}
                    onChange={onEditorChange}
                    editorState={editorState}
                    onEditorStateChange={editorState => setEditorState(editorState)}
                />
            </Div>

            <Div>
                <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}> Attachments</Typography>
                <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                    />
                    <Button variant="outlined" className={classes.UploadAttachments} component="span" size="small" style={{ marginLeft: '40px', marginTop: '20px', padding: '5px' }}>
                        <span>
                            Upload Attachments
                            <AttachFileIcon style={{ float: 'left', }} />
                        </span>
                    </Button>
                </label>
                {uploadedFile && (
                    <div style={{ marginLeft: '40px', marginTop: '10px' }}>
                        <strong>Uploaded File:</strong> {uploadedFile.name}
                    </div>
                )}
            </Div>
            <Grid>
                <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}>Time Limit</Typography>
                <TextField size='small' sx={{ marginTop: '15px', marginLeft: '40px' }} value={timeLimit} onChange={handleTimeLimitChange} />
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    size='small'
                    value={selectedValue}
                    onChange={handleSelectChange}
                    sx={{
                        width: '15%', marginLeft: '20px', marginTop: '15px'
                    }}
                >
                    {days.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid>
                <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}> Total Points</Typography>
                <TextField size='small' sx={{ marginLeft: '40px', marginTop: '15px' }} value={totalPoints} onChange={handleTotalPointsChange} />
                <div style={{ marginLeft: '44px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: '10px' }}> Maximum points a student can score</span>
                </div>
            </Grid>
            <Grid>
                <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}> Minimum Pass Points</Typography>
                <TextField size='small' sx={{ marginLeft: '40px', marginTop: '15px' }} value={minPassPoints} onChange={handleMinPassPointsChange} />
                <div style={{ marginLeft: '44px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: '10px' }}> Minimum points required for the student to pass this assignment</span>
                </div>
            </Grid>
            <Grid>
                <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}> Allow to upload files</Typography>
                <TextField size='small' sx={{ marginLeft: '40px', marginTop: '15px' }} value={uploadedFiles}/*  onChange={handleFileUploads} */ />
                <div style={{ marginLeft: '44px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: '10px' }}> Define the number of files that a student can upload in this assignment.Input 0 to disabled the option to upload </span>
                </div>
            </Grid>
            <Grid>
                <Typography sx={{ fontSize: '16px', marginLeft: '40px', marginTop: '30px' }}>Maximum file size limit</Typography>
                <TextField size='small' sx={{ marginLeft: '40px', marginTop: '15px' }} value={maxFileSize} onChange={handleMaxFileSizeChange} />
                <div style={{ marginLeft: '44px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    <ErrorOutlineIcon /> <span style={{ marginLeft: '10px' }}> Define file size attachment in MB</span>
                </div>
            </Grid>
            <Divider sx={{ backgroundColor: '#0a0909', marginTop: '20px', height: '2px' }} />
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button variant='outlined' className={classes.cancelButton} style={{ marginLeft: '30px', padding: '5px' }} onClick={onClose}>Cancel</Button>
                <Button variant='outlined' size='medium' className={classes.updateButton} 
                style={{ marginRight: '30px', padding: '5px' }} onClick={createAssignment} 
                disabled={!assignmentTitle || !descriptionText || !timeLimit || !selectedValue || minPassPoints === '' || !totalPoints}
                > Update Assignment</Button>
            </div>
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