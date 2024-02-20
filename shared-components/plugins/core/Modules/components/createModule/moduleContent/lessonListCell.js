import React, { useState } from 'react';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useMutation } from "@apollo/react-hooks";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import JumboDdPopover from "@jumbo/components/JumboDdPopover";
import { Card, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, Button, Box } from "@mui/material";
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import CreateLessonForm from './createLessonForm';
import ModuleTopicForm from './moduleTopicForm';
import useProduct from '../../../hooks/useProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import createTopicMutation from '../../../../../../client/ui/graphql/services/modules/mutations/createTopic';
import DeleteLessonMutation from '../../../../../../client/ui/graphql/services/modules/mutations/deleteLesson';
import DeleteTopicMutation from '../../../../../../client/ui/graphql/services/modules/mutations/deleteTopic';
import useLesson from '../../../hooks/useLesson';
import useTopic from '../../../hooks/useTopic';
import UploadQUIZCSV from './upload quiz CSV';
import ManualCreate from './manualQuizCreate';
import AssignmentForm from './asignmentform';
import useQuiz from '../../../hooks/useQuizz';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import useAssignment from '../../../hooks/useAssignment';
import TopicList from './topicList';
import AiQuizCreateForm from './aiQuizCreateForm';
import AiTopicCreateForm from './AiTopicCreateForm';

const DragHandle = SortableHandle(() => <DragHandleIcon sx={{ cursor: 'grab', verticalAlign: 'middle' }} />);

const LessonListCell = (props) => {
    const { onDeleteQuiz } = useQuiz();
    const { onDeleteAssignment } = useAssignment();
    const { lesson } = props;
    const { product, shopId } = useProduct();
    const { onDeleteLesson } = useLesson()
    const { onDeleteTopic, onDragAndDrop } = useTopic()
    const { showDialog, hideDialog } = useJumboDialog();
    const productId = product?._id;
    const [createTopic, { error: createTopicError }] = useMutation(createTopicMutation);
    const [deleteLesson] = useMutation(DeleteLessonMutation)
    const [deleteTopic] = useMutation(DeleteTopicMutation)
    const [quizId, setQuizId] = useState('')
    const [assignmentId, setAssignmentId] = useState('')
    const [topicAnchorEl, setTopicAnchorEl] = React.useState(null);
    const open = Boolean(topicAnchorEl);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClose = React.useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleClick = React.useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const topicHandleClose = React.useCallback(() => {
        setTopicAnchorEl(null);
    }, []);

    const topicHandleClick = React.useCallback((event) => {
        setTopicAnchorEl(event.currentTarget);
    }, []);


    const onLessonEdit = (lesson) => {
        showDialog({
            fullScreen: true,
            content: <CreateLessonForm onClose={hideDialog} lessonId={lesson?._id} Id={product?._id} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const deleteLessonMutation = async (lesson) => {

        const lessonId = lesson._id
        try {
            await onDeleteLesson({ lessonId })
            hideDialog()
            toast.success('deleted successfully', {
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
            toast.error(error?.errors[0].message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    const onLessonDelete = (lesson) => {
        showDialog({
            variant: 'confirm',
            title: 'Are you sure about deleting this record?',
            content: "You won't be able to recover this record later",
            onYes: () => deleteLessonMutation(lesson),
            onNo: hideDialog
        })
    }

    const onAddTopic = async (lesson) => {

        const lessonId = lesson?._id
        const { data } = await createTopic({ variables: { input: { shopId, productId, lessonId } } });
        if (data) {
            const { createTopic } = data;
            const topicId = createTopic.topic._id
            showDialog({
                fullScreen: true,
                content: <ModuleTopicForm lessonId={lessonId} topicId={topicId} Id={productId} onClose={hideDialog} />,
                sx: {
                    borderRadius: 0
                }
            })
        }

    }

    const topicEdit = (topic) => {
        showDialog({
            fullScreen: true,
            content: <ModuleTopicForm lessonId={topic.lessonId} topicId={topic._id} Id={topic.productId} onClose={hideDialog} />,
            sx: {
                borderRadius: 0
            }
        })
    }

    const onTopicDelete = (topic) => {

        showDialog({
            variant: 'confirm',
            title: 'Are you sure about deleting this record?',
            content: "You won't be able to recover this record later",
            onYes: () => deleteTopicMutation(topic),
            onNo: hideDialog
        })
    }

    const deleteTopicMutation = async (topic) => {

        try {
            await onDeleteTopic({ topicId: topic?._id })
            hideDialog()
            toast.success('deleted successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (errors) {
            toast.error(errors[0]?.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    const deleteQuizMutation = async (quiz) => {
        const quizId = quiz._id
        const data = {
            _id: quizId
        }
        try {
            await onDeleteQuiz({
                quiz: data
            });

            hideDialog()
            toast.success('Quiz deleted successfully', {
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
        }
    }
    const deleteAssignmentMutation = async (assignment) => {
        const assignmentId = assignment._id
        const data = {
            _id: assignmentId
        }
        try {
            await onDeleteAssignment({
                assignment: data
            });

            hideDialog()
            toast.success('Assignment deleted successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {

        }
    }
    const onAssignmentDelete = (assignment) => {
        showDialog({
            variant: 'confirm',
            title: 'Are you sure about deleting this Assignment?',
            content: "You won't be able to recover this Assignment later",
            onYes: () => deleteAssignmentMutation(assignment),
            onNo: hideDialog
        })
    }

    const onQuizDelete = (quiz) => {
        showDialog({
            variant: 'confirm',
            title: 'Are you sure about deleting this Quiz?',
            content: "You won't be able to recover this Quiz later",
            onYes: () => deleteQuizMutation(quiz),
            onNo: hideDialog
        })
    }

    const quizEdit = (quiz) => {
        const lessonId = lesson?._id
        setQuizId(quiz?.quiz_id)
        showDialog({
            /* fullScreen: true, */
            content: <ManualCreate onClose={hideDialog} sx={{ borderRadius: '15px' }} lessonId={quiz?.lessonId} productId={quiz.productId} quizId={quiz._id} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "900px",
                        maxWidth: "900px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '520px',
                        maxHeight: '520px'
                        // Set your width here
                    },
                },
            },
        })
    }

    const assignmentEdit = (assignment) => {
        const lessonId = lesson?._id
        setAssignmentId(assignment._id)
        showDialog({
            /* fullScreen: true, */
            content: <AssignmentForm onClose={hideDialog} sx={{ borderRadius: '15px' }} lessonId={assignment.lessonId} productId={assignment.productId} assignmentId={assignment._id} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "900px",
                        maxWidth: "900px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '520px',
                        maxHeight: '520px'
                        // Set your width here
                    },
                },
            },
        })
    }
    const onAddQuiz = async (lesson) => {
        const lessonId = lesson?._id
        showDialog({
            /* fullScreen: true, */
            content: <UploadQUIZCSV onClose={hideDialog} sx={{ borderRadius: '15px' }} lessonId={lessonId} productId={productId} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "900px",
                        maxWidth: "900px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '500px',
                        maxHeight: '500px'
                        // Set your width here
                    },
                },
            },
        })
    }

    const quizAiCreate = async (lesson) => {
        const lessonId = lesson?._id
        showDialog({
            fullScreen: true,
            content: <AiQuizCreateForm onClose={hideDialog} lesson={lesson} product={product} open={open} lessonId={lessonId} productId={productId} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "700px",
                        maxWidth: "700px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '320px',
                        maxHeight: '320px'
                        // Set your width here
                    },
                },
            },
        })



    }


    const aiTopicCreate = async (lesson) => {
        const lessonId = lesson?._id
        showDialog({
            fullScreen: true,
            content: <AiTopicCreateForm onClose={hideDialog} lesson={lesson} product={product} open={open} lessonId={lessonId} productId={productId} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "700px",
                        maxWidth: "700px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '320px',
                        maxHeight: '320px'
                        // Set your width here
                    },
                },
            },
        })



    }


    const openManualCreate = (lesson) => {
        const lessonId = lesson?._id

        showDialog({
            content: <ManualCreate onClose={hideDialog} lessonId={lessonId} productId={productId} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "900px",
                        maxWidth: "900px",
                        borderRadius: '15px',
                        marginLeft: '10px',
                        height: '500px',
                        maxHeight: '500px'
                        // Set your width here
                    },
                },
            },
        });
    };
    const AddAssignmentForm = (lesson) => {
        const lessonId = lesson?._id
        showDialog({
            content: <AssignmentForm onClose={hideDialog} lessonId={lessonId} productId={productId} />,
            sx: {
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        maxWidth: "900px",
                        borderRadius: '15px',
                        // Set your width here
                    },
                },
            },
        });
    };



    return (
        <Div>

            <Box sx={{ background: "#e8f9fa", mt: 1, border: 1, borderColor: "#50C2C9" }}>
                <Accordion   >
                    <Card>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{ background: "#e8f9fa" }}
                        >
                            <Grid container rowSpacing={1}>
                                <Grid item xs={2} sm={1}> <DragHandle /></Grid>
                                <Grid item xs={1} sm={1} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                                    <Div sx={{ backgroundColor: "#1793a6", color: "white", p: 1, fontWeight: "bold", borderRadius: '6px', display: "inline" }}>L</Div>
                                </Grid>
                                <Grid item xs={6} sm={8} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                                    <Typography>{lesson.name}</Typography>
                                </Grid>
                                <Grid items xs={2} sx={{ textAlign: 'right', ml: 4 }}>
                                    <Button onClick={() => { onLessonEdit(lesson) }}><EditIcon /></Button>
                                    <Button onClick={() => { onLessonDelete(lesson) }}><ClearIcon /></Button>
                                </Grid>

                            </Grid>

                        </AccordionSummary>
                    </Card>
                    <AccordionDetails>
                        <TopicList
                            topics={lesson?.topics}
                            topicEdit={topicEdit}
                            onTopicDelete={onTopicDelete}
                            onDragAndDrop={onDragAndDrop}
                            lessonId={lesson?._id}
                        />

                        <Box sx={{ background: "#e8f9fa", mt: 1, border: 1, borderColor: "#50C2C9" }}>
                            <Accordion marginBottom="10px">
                                <Card>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{ background: "#e8f9fa" }}>
                                        <Grid container rowSpacing={1}>
                                            <Grid item xs={2} sm={1} color={'#1793a6'}><QuizIcon /></Grid>
                                            <Grid item xs={6} sm={8} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                                                <Typography>Quizzes</Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                </Card>

                                <AccordionDetails>
                                    {lesson.quizs?.map(quiz => (

                                        <Card sx={{ mt: 1, mb: 3, p: 2, background: "#c7edf0", borderRadius: '15px' }}>

                                            <Grid container rowSpacing={1}>
                                                <Grid item xs={1} >
                                                    <Div sx={{ backgroundColor: "#3a055c", color: "white", p: 1, fontWeight: "bold", borderRadius: '6px', display: "inline" }}>Q</Div>
                                                </Grid>
                                                <Grid item xs={9} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                                                    <Typography>{quiz.quiz_title}</Typography>
                                                </Grid>
                                                <Grid items xs={2} sx={{ textAlign: 'right' }}>
                                                    <Button onClick={() => { quizEdit(quiz) }}><EditIcon /></Button>
                                                    <Button onClick={() => { onQuizDelete(quiz) }}><ClearIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        </Card>

                                    ))

                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Box sx={{ background: "#e8f9fa", mt: 1, border: 1, borderColor: "#50C2C9" }}>
                            <Accordion>
                                <Card>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{ background: "#e8f9fa" }}>
                                        <Grid container rowSpacing={1}>
                                            <Grid item xs={2} sm={1} color={'#1793a6'}><AssignmentIcon /></Grid>
                                            <Grid item xs={6} sm={8} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                                                <Typography>Assignments</Typography>
                                            </Grid>
                                        </Grid>
                                    </AccordionSummary>
                                </Card>

                                <AccordionDetails>
                                    {lesson.assignments?.map(assignment => (

                                        <Card sx={{ mt: 1, mb: 3, p: 2, background: "#c7edf0", borderRadius: '15px' }}>

                                            <Grid container rowSpacing={1}>
                                                <Grid item xs={1} >
                                                    <Div sx={{ backgroundColor: "#3a055c", color: "white", p: 1, fontWeight: "bold", borderRadius: '6px', display: "inline" }}>A</Div>
                                                </Grid>
                                                <Grid item xs={9} sx={{ marginLeft: { lg: "-4%", md: "-4%" } }}>
                                                    <Typography>{assignment.assignment_title}</Typography>
                                                </Grid>
                                                <Grid items xs={2} sx={{ textAlign: 'right' }}>
                                                    <Button onClick={() => { assignmentEdit(assignment) }}><EditIcon /></Button>
                                                    <Button onClick={() => { onAssignmentDelete(assignment) }}><ClearIcon /></Button>
                                                </Grid>
                                            </Grid>
                                        </Card>

                                    ))

                                    }
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item>
                            <JumboDdPopover
                                triggerButton={<Button variant="outlined" sx={{ textTransform: 'none', ml: 1, }}>Add Topic</Button>}
                                disableInsideClick
                                anchorEl={topicAnchorEl}
                                isOpen={open}
                                handleClick={topicHandleClick}
                                handleClose={topicHandleClose}
                            >
                                <Div sx={{ width: 250, maxWidth: '100%', padding: 2 }}>
                                    <Button sx={{ textTransform: 'none', fontSize: "18px" }} onClick={() => { onAddTopic(lesson) }}> Manual Create </Button>
{/*                                     <Button sx={{ textTransform: 'none', fontSize: "18px" }} onClick={() => { aiTopicCreate(lesson) }} >Create with AI</Button>
 */}
                                </Div>
                            </JumboDdPopover>
                            </Grid>
                            <Grid item>
                                <Button variant='outlined' sx={{ textTransform: 'none' }} onClick={() => { AddAssignmentForm(lesson) }}>Add Assignments</Button>
                            </Grid>
                            <JumboDdPopover
                                triggerButton={<Button variant="outlined" sx={{ textTransform: 'none', ml: 1, mt: 2 }}>Add Quizzes</Button>}
                                disableInsideClick
                                anchorEl={anchorEl}
                                isOpen={isOpen}
                                handleClick={handleClick}
                                handleClose={handleClose}
                            >
                                <Div sx={{ width: 250, maxWidth: '100%', padding: 2 }}>
                                    <Button sx={{ textTransform: 'none', fontSize: "18px" }} onClick={() => { openManualCreate(lesson) }}> Manual Create </Button>
                                    <Button sx={{ textTransform: 'none', fontSize: "18px" }} onClick={() => { onAddQuiz(lesson) }} >Create with CSV</Button>
{/*                                     <Button sx={{ textTransform: 'none', fontSize: "18px" }} onClick={() => { quizAiCreate(lesson) }} >Create with AI</Button>
 */}
                                </Div>
                            </JumboDdPopover>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Box>

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
    );
};


export default SortableElement(LessonListCell);
