import React, { useState } from 'react';
import { Card, Typography, TextField, Checkbox, Button, useMediaQuery, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import { useParams } from 'react-router-dom';
import { useMutation } from "@apollo/react-hooks";
import useAuth from '../../../hooks/useAuth';
import useCurrentShopId from '../../../hooks/useCurrentShopId';
import useListViewPage from '../list-views/listViewPage/hooks/useListViewPage';
import ModulesService from '../../../graphql/services/modules/modules-service';
import Div from '../../../@jumbo/shared/Div';
import gql from 'graphql-tag';
import AptitudeQuizSubmit from './Quizsubmit';


const masterAdminQuiz = gql`
mutation quizAttempt($input:QuizAttemptInput!){
  quizAttempt(input:$input)
}`

export default function AptitudeQuizItem() {
    
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [open, setOpen] = React.useState(false);
  const [quizAttempt] = useMutation(masterAdminQuiz, { ignoreResults: true });
  const { viewer } = useAuth()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [submitMode, setSubmitMode] = useState(false);
  const [saveMode, setSaveMode] = useState(false);
  const [optionsLocked, setOptionsLocked] = useState(false);
  const navigate = useNavigate();
  const routeParams = useParams()
  const lessonId = routeParams?.lessonId
  const productId = routeParams?.productId
  const { shopId } = useCurrentShopId()
  const [lessonName, setLessonName] = useState('')
  const [quizes, setQuizes] = useState([])
  const [result, setResult] = useState()
  const [quizLength, setQuizLength] = useState('')
  const [selectedOptions, setSelectedOptions] = useState(Array(quizLength).fill({}));
  const isLastQuestion = currentQuestionIndex === quizLength - 1;
  const { showDialog, hideDialog } = useJumboDialog();
  const { setRecordsListRefresh } = useListViewPage();
  const [optionSelected, setOptionSelected] = useState('')
  const hideDialogAndRefreshRecordsList = React.useCallback(() => {
    hideDialog();
    setRecordsListRefresh(true);
  }, [hideDialog, setRecordsListRefresh]);

  const [checkboxes, setCheckboxes] = useState({
    optionA: false,
    optionB: false,
    optionC: false,
    optionD: false,
  });
  React.useEffect(async () => {
    const lessonData = await ModulesService.getLesson(productId, shopId, lessonId)
    const lesson = lessonData?.data?.data?.lesson
    if (lesson) {
      setLessonName(lesson?.name)
      setQuizes(lesson?.quizs)
      setQuizLength(lesson?.quizs?.length)
      const givenAnswer = lesson?.quizs[currentQuestionIndex]?.given_answer;
      if (givenAnswer) {
        setOptionSelected(givenAnswer)
        setCheckboxes((prevCheckboxes) => ({
          ...prevCheckboxes,
          [givenAnswer]: true,
        }));
        setOptionsLocked(true)
        setIsOptionSelected(true)
      }
    }

  }, [lessonId, shopId, productId])


  const handleDetailsClick = () => {
    navigate(-1)

  }
 


  const handleCheckboxChange = (option) => {
    setOptionSelected(option)
    setCheckboxes((prevCheckboxes) => {
      const newCheckboxes = { ...prevCheckboxes };
      for (const key in newCheckboxes) {
        if (key !== option) {
          newCheckboxes[key] = false;
        }
      }

      newCheckboxes[option] = !newCheckboxes[option];

      const selectedOption = Object.keys(newCheckboxes).find((key) => newCheckboxes[key]);
      const isCorrect = selectedOption === quizes[currentQuestionIndex]?.quiz_answer;

      // Now 'isCorrect' contains whether the selected option is correct or not
      setIsOptionSelected(true);
      setResult(isCorrect);
      return newCheckboxes;
    });
  };
  const cardStyles = {
    width: '100%',
    padding: '20px 20px',
    display: 'flex',
    flexDirection: 'column',
    marginTop: isMobile ? '10px' : '0',
  };

  const textFieldStyles = {
    width: isMobile ? '100%' : '60%',
    marginBottom: isMobile ? '10px' : '0',
  };


  const questionStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    width: isMobile ? '100%' : '100%',
    marginLeft: isMobile ? '-14%' : '',
  };


  const showRecordDetail = React.useCallback(() => {
    showDialog({
      fullScreen: true,
      content: <AptitudeQuizSubmit onClose={hideDialog} lessonId={lessonId} />
    })
  }, [showDialog]);


  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizes.length - 1) {
      const currentOptions = { ...checkboxes };
      selectedOptions[currentQuestionIndex] = currentOptions;

      // Update checkboxes based on the selected options of the next question
      setCheckboxes(selectedOptions[currentQuestionIndex + 1]);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsOptionSelected(false);
    } else {
      // Handle the case when it's the last question
    }
  };



  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const currentOptions = { ...checkboxes };
      selectedOptions[currentQuestionIndex] = currentOptions;
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setIsOptionSelected(false);
      setIsOptionSelected(!!selectedOptions[currentQuestionIndex - 1]);
      setCheckboxes(selectedOptions[currentQuestionIndex - 1]);

    }
  };

  const handleToggleSubmitMode = async () => {
    if (isOptionSelected) {
      const quizId = quizes[currentQuestionIndex]._id
      const studentId = viewer?._id
      const answer = optionSelected
      const data = await quizAttempt({
        variables: {
          input: {
            quizId,
            studentId,
            result,
            answer
          }
        }
      })

      setOptionsLocked(true);
      const currentOptions = { ...checkboxes };
      selectedOptions[currentQuestionIndex] = currentOptions;
      if (currentQuestionIndex < quizes.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsOptionSelected(false);
        setCheckboxes({});
        setOptionsLocked(false);
      } else {
        setIsOptionSelected(false);
      }
      if (data && isLastQuestion) {
        showRecordDetail()
      }
    };

  }


  const handleToggleSaveMode = () => {
    if (isOptionSelected) {
      const currentOptions = checkboxes;
      selectedOptions[currentQuestionIndex] = currentOptions;
      setSaveMode(true);
      setSubmitMode(false);
      setOptionsLocked(false);
      handleNextQuestion();
    }
  };
  const calculateProgressPercentage = () => {
    // Your progress calculation logic here based on the currentQuestionIndex
    return ((currentQuestionIndex + 1) / quizes.length) * 100;
  };


  return (
    <Card sx={cardStyles}>
      <Div>
        <AppBar sx={{ position: 'relative', }}>
          <Toolbar>
            <Typography variant='h1' component={"div"} sx={{ flexGrow: 1, color: 'white' }}>
              {lessonName}
            </Typography>
            <Typography variant='h2' sx={{ marginRight: '8%', color: 'white', display: { xs: 'none', md: 'block' } }} >
              Your Progress:   {currentQuestionIndex + 1} /{quizLength} ({Math.round(calculateProgressPercentage())}%)
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDetailsClick}
              aria-label="close the dialog "
              sx={{ marginRight: isMobile ? '8px' : '0' }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Div>


      <Div sx={{ marginTop: '3%', marginLeft: '5%' }}>
        <Typography>Questions No: {currentQuestionIndex + 1}/{quizLength}</Typography>
        <Div sx={{ marginTop: '3%', marginLeft: '13%' }}>
         
              <Typography sx={questionStyles}>
                  {quizes?.[currentQuestionIndex]?.quiz_question}
              </Typography>
           
        </Div>
        <Div sx={{ marginTop: '2%', display: 'flex', alignItems: 'center', margin: '5%', marginLeft: '14%' }}>
          <Grid container spacing={isMobile ? 2 : 0}>
            <Grid item xs={12} md={6}>
              <TextField
                value={quizes[currentQuestionIndex]?.quiz_options?.optionA}
                sx={textFieldStyles}
                size="medium"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Checkbox
                      checked={checkboxes?.optionA}
                      onChange={() => handleCheckboxChange('optionA')}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={quizes[currentQuestionIndex]?.quiz_options?.optionB}
                sx={textFieldStyles}
                size="medium"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Checkbox
                      checked={checkboxes?.optionB}
                      onChange={() => handleCheckboxChange('optionB')}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Div>
        <Div sx={{ marginTop: '2%', display: 'flex', alignItems: 'center', margin: '5%', marginLeft: '14%' }}>
          <Grid container spacing={isMobile ? 2 : 0}>
            <Grid item xs={12} md={6}>
              <TextField
                value={quizes[currentQuestionIndex]?.quiz_options?.optionC}
                sx={textFieldStyles}
                size="medium"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Checkbox
                      checked={checkboxes?.optionC}
                      onChange={() => handleCheckboxChange('optionC')}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                value={quizes[currentQuestionIndex]?.quiz_options?.optionD}
                sx={textFieldStyles}
                size="medium"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Checkbox
                      checked={checkboxes?.optionD}
                      onChange={() => handleCheckboxChange('optionD')}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Div>
        {currentQuestionIndex > 0 && (
          <Button variant="contained" sx={{ color: 'white', marginLeft: '14%' }} onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Back
          </Button>
        )}
        {!isLastQuestion ? (
          <Button
            variant="contained"
            sx={{ color: 'white', float: 'right', marginRight: '6%' }}
            onClick={handleToggleSubmitMode}
            disabled={!isOptionSelected}
          >
            Submit & Next
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ color: 'white', float: 'right', marginRight: '6%' }}
            onClick={handleToggleSubmitMode}
            disabled={!checkboxes?.optionA && !checkboxes?.optionB && !checkboxes?.optionC && !checkboxes?.optionD}

          >
            Submit
          </Button>
        )}
      </Div>
    </Card>
  );
}
