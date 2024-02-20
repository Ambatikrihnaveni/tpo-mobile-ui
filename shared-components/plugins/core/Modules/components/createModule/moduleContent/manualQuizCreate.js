import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton } from '@mui/material'
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
import useListViewPage from '../../../../../../client/ui/appLayout/pages/list-views/listViewPage/hooks/useListViewPage';
import MyProgramService from "../../../../../../client/ui/graphql/services/programs/myProgram-services";
import useQuiz from "../../../hooks/useQuizz";


export default function ManualCreate({ onClose, productId, lessonId, handleReopen, quizId }) {
    const { onUpdateQuiz, onCreateQuiz, onDeleteQuiz } = useQuiz({ lessonId, quizId, Id: productId })
    const [question, setQuestion] = useState("");
    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [hint, setHint] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true); // New state variable
    const updateSaveButtonState = () => {
        const isAnyFieldEmpty = !(
            question && optionA && optionB && optionC && optionD && correctAnswer && hint
        );
        setIsSaveDisabled(isAnyFieldEmpty);
    };
    const { setRecordsListRefresh } = useListViewPage();


    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleOptionAChange = (e) => {
        setOptionA(e.target.value);
    };

    const handleOptionBChange = (e) => {
        setOptionB(e.target.value);
    };

    const handleOptionCChange = (e) => {
        setOptionC(e.target.value);
    };

    const handleOptionDChange = (e) => {
        setOptionD(e.target.value);
    };

    const handleCorrectAnswerChange = (e) => {
        setCorrectAnswer(e.target.value);
    };

    const handleHintChange = (e) => {
        setHint(e.target.value);
    };

    React.useEffect(async () => {

        if (quizId) {
            const { data } = await MyProgramService.getQuiz(quizId)
            setQuestion(data?.getQuiz?.quiz_question)
            setCorrectAnswer(data?.getQuiz?.quiz_answer)
            setOptionA(data?.getQuiz?.quiz_options?.optionA)
            setOptionB(data?.getQuiz?.quiz_options?.optionB)
            setOptionC(data?.getQuiz?.quiz_options?.optionC)
            setOptionD(data?.getQuiz?.quiz_options?.optionD)
            setHint(data?.getQuiz?.quiz_hint)

        }


    }, [quizId])
    const handleSave = () => {
        if (quizId != undefined) {
            try {
                const data = {
                    quizId: quizId,
                    quiz_title: question,
                    quiz_question: question,
                    quiz_hint: hint,
                    quiz_answer: correctAnswer,
                    quiz_optionA: optionA,
                    quiz_optionB: optionB,
                    quiz_optionC: optionC,
                    quiz_optionD: optionD
                }

                onUpdateQuiz({ quiz: data });
                toast.success('Quiz updated Successfully', {
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
                    refreshQuiz()
                }, "3000");

            } catch (error) {
                // Handle error if needed
            }
        } else {
            const data = {
                quiz_title: question,
                quiz_question: question,
                quiz_hint: hint,
                quiz_answer: correctAnswer,
                quiz_options: {
                    optionA: optionA,
                    optionB: optionB,
                    optionC: optionC,
                    optionD: optionD,
                }
            }
            try {
                onCreateQuiz({ quiz: data });
                toast.success('Quiz uploaded Successfully', {
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
                    //setRecordsListRefresh(true)
                }, "3000");
            } catch (error) {
                // Handle error if needed
            }
        }


        // After clearing, disable the "Save" button again
        setIsSaveDisabled(true);
    };

    useEffect(() => {
        updateSaveButtonState();
    }, [question, optionA, optionB, optionC, optionD, correctAnswer, hint]);


    const handleSaveAndNext = () => {
        const data = {
            quiz_title: question,
            quiz_question: question,
            quiz_hint: hint,
            quiz_answer: correctAnswer,
            quiz_options: {
                optionA: optionA,
                optionB: optionB,
                optionC: optionC,
                optionD: optionD,
            }
        }
        try {
            onCreateQuiz({ quiz: data });
            toast.success('Quiz Created Successfully', {
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
                setQuestion("")
                setOptionA("")
                setOptionB("")
                setOptionC("")
                setOptionD("")
                setCorrectAnswer("")
                setHint("")
                //setRecordsListRefresh(true)
            }, "3000");
        } catch (error) {
            // Handle error if needed
        }
    }


    const handleDeleteQuiz = () => {
        try {
            const data = {
                _id: quizId
            }
            onDeleteQuiz({ quiz: data });
            toast.success('Quiz Deleted Successfully', {
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
                //setRecordsListRefresh(true)
            }, "3000");
        } catch (error) {
            // Handle error if needed
        }
    }



    return (
        <Div>
            <IconButton
                style={{ position: 'absolute', top: 0, right: 0 }}
                onClick={onClose}
                aria-label="close"
            >
                <CloseIcon />
            </IconButton>
            <Div>
                <Typography sx={{ fontWeight: 'bold', fontSize: "25px" }}>Add Quizzes</Typography>

                <Div sx={{ ml: 4, mt: 1, display: "flex" }}>
                    <Div sx={{ width: "50%" }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Write your question here</Typography>
                        <TextField sx={{ width: "90%", mt: 1, }} size='small'
                            value={question}
                            onChange={handleQuestionChange} />
                        <Div sx={{ mt: 1 }}>
                            <Typography>Option A</Typography>
                            <TextField size='small'
                                value={optionA} // Set the value of the field
                                onChange={handleOptionAChange} />
                        </Div>
                        <Div sx={{ mt: 1 }}>
                            <Typography>Option B</Typography>
                            <TextField size='small'
                                value={optionB} // Set the value of the field
                                onChange={handleOptionBChange} />
                        </Div>
                        <Div sx={{ mt: 1 }}>
                            <Typography>Option C</Typography>
                            <TextField size='small'
                                value={optionC} // Set the value of the field
                                onChange={handleOptionCChange} />
                        </Div>
                        <Div sx={{ mt: 1 }}>
                            <Typography>Option D</Typography>
                            <TextField size='small'
                                value={optionD} // Set the value of the field
                                onChange={handleOptionDChange} />
                        </Div>
                    </Div>

                    <Div sx={{ width: "50%", mt: 1 }}>
                        <Div sx={{ mt: 1, minWidth: 100 }}>
                            <Typography> Correct Answer</Typography>
                            <InputLabel size='small'></InputLabel>
                            <FormControl fullWidth>
                                <Select
                                    value={correctAnswer}
                                    onChange={handleCorrectAnswerChange}>
                                    <MenuItem value="optionA">Option A</MenuItem>
                                    <MenuItem value="optionB">Option B</MenuItem>
                                    <MenuItem value="optionC">Option C</MenuItem>
                                    <MenuItem value="optionD">Option D</MenuItem>
                                </Select>
                            </FormControl>
                        </Div>
                        <Div sx={{ mt: 1 }}>
                            <Typography>Hint</Typography>
                            <TextField
                                fullWidth
                                label="Hint"
                                multiline
                                rows={4}
                                placeholder="Write your hint here"
                                name="Hint"
                                value={hint} // Set the value of the field
                                onChange={handleHintChange}
                            />
                        </Div>
                    </Div>
                </Div>
            </Div>


            <Div sx={{ display: "flex", justifyContent: "space-between", mt: 2, ml: 4 }}>

                {quizId !== '' && quizId !== undefined && (
                    <Button variant="contained" onClick={handleSave}>
                        Update
                    </Button>
                )}

                {quizId == '' || quizId == undefined && (
                    <Div>
                        <Button variant="contained" onClick={handleSave} disabled={isSaveDisabled}>
                            Save
                        </Button>&nbsp;&nbsp;
                        <Button variant="contained" sx={{ backgroundColor: "#A8CDDA" }} onClick={handleSaveAndNext}>
                            Save/Next
                        </Button>
                    </Div>
                )}
                <Button variant="contained" sx={{ backgroundColor: "#c70000", color: "white" }} onClick={handleDeleteQuiz}>
                    Delete
                </Button>
            </Div>


            <ToastContainer
                position="bottom-right"
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
        </Div >

    );
}

