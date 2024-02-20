import React from 'react';
import Div from '../../../../../../client/ui/@jumbo/shared/Div';
import { Button, Typography, Grid, TextField, IconButton, Dialog, DialogContent } from '@mui/material'
import { useState } from 'react'
import { useTheme } from "@mui/material/styles";
import { useParams } from 'react-router'
import { useJumboDialog } from "@jumbo/components/JumboDialog/hooks/useJumboDialog";
import CloseIcon from '@mui/icons-material/Close';
import './upload quiz CSV.css'
import useCurrentShopId from '../../../../../../client/ui/hooks/useCurrentShopId';
import { ToastContainer, toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import QuizTopics from './Quiztopics';
import useQuiz from '../../../hooks/useQuizz';

export default function UploadQUIZCSV({ onClose, groupId, lessonId, productId, }) {
  const [activeStep, setActiveStep] = useState(0);
  const { showDialog, hideDialog } = useJumboDialog();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showQuizTopics, setShowQuizTopics] = useState(false);
  const { onMultipleQuizCreate } = useQuiz({lessonId, Id:productId})
  const label = { inputProps: { 'aria-label': "Switches" } }
  const params = useParams()
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
 
  const handleContinueClick = () => {

    showDialog({
      fullScreen: true,
      content: <QuizTopics />,
      sx: {
        borderRadius: 0
      }
    })
  }

  const studentGroupId = groupId

  const { shopId } = useCurrentShopId()
  const theme = useTheme();
  const Download = () => {
    const csvHeader = ',Question,Option A,Option B, Option C , Option D ,  Correct Answer , Hints\n Example, What is HTML file formate,.html,.css,.js, .php, optionA, Html file save with the language name\n Q1';
    const csvContent = csvHeader;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Quiz_templete.csv';
    a.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleInvite = async () => {
    if (!selectedFile) {
      console.error('No file selected.'); // Handle the case when no file is selected
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      const lines = content.split('\n');

      const header = lines[0].split(',').map(item => item.trim());
      const data = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');

        const row = {};
        for (let j = 0; j < header.length; j++) {
          row[header[j]] = values[j]?.trim();
        }

        data.push(row);
        console.log(data)
      }

      let Quizes = []

      for (let i = 1; i < data.length - 1; i++) {
        const quiz = {
          quiz_question: data[i]['Question'],
          quiz_title: data[i]['Question'],
          quiz_hint: data[i]['Hints'],
          quiz_answer: data[i]['Correct Answer'],
          quiz_options: {
            optionA: data[i]['Option A'],
            optionB: data[i]['Option B'],
            optionC: data[i]['Option C'],
            optionD: data[i]['Option D']
          }
        }
        Quizes.push(quiz)

      }
      const quizData = {
        quiz: Quizes
      }
      onMultipleQuizCreate({
        quiz: quizData
      })
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
      }, "3000");


    };
    reader.readAsText(selectedFile);
    handleCloseDialog()

  }

  return (
    <Div sx={{ maxWidth: '1000px' }}>
      <IconButton
        style={{ position: 'absolute', top: 0, right: 0 }}
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>

      <Typography variant='h3' style={{ fontWeight: 'bold', marginTop: '25px' }}>Upload your questions to create a quiz
      </Typography>
      <Grid container spacing={1} marginTop={8}>
        <Grid item xs={1}>
          <div class="step-container">
            <div class="step">
              <div class="step-circle">1</div>
              <div class="step-connector"></div>
            </div>
            <div class="step">
              <div class="step-connector"></div>
              <div class="step-circle">2</div>
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>

              <Typography variant='h4' style={{ fontWeight: 'bold' }}>Download</Typography>

              <Typography>Create your question pool with ease using our template.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button variant='outlined' onClick={Download}>Download template</Button>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '15px' }}>
              <Typography style={{ fontWeight: 'bold', marginTop: '20px' }}>Upload</Typography>
              <Typography style={{ marginTop: '10px' }}>Upload your edited file containing your questions.</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                label="Select File"
                variant="outlined"
                value={selectedFile ? selectedFile.name : ''}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={4}>
              <label htmlFor="file-input">
                <Button variant="outlined" component="span">
                  Choose File
                </Button>
              </label>
              <input
                type="file"
                accept=".csv"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </Grid>
          </Grid>
          <Typography style={{ marginTop: '10px' }}>Only .xlsx or .xlsm files accepted. Max 50MB</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>
            <Button color='primary' variant='contained' onClick={handleInvite} disabled={selectedFile == ""} style={{ position: 'absolute', bottom: 25, right: 20 }}
            >Upload</Button>
            <Dialog open={openDialog} onClose={handleCloseDialog}  >
              <DialogContent>
                {/* Your dialog content here */}
                <IconButton
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={handleCloseDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>

                <Grid sx={{ minHeight: "110px", display: "flex", width: "60vh", minWidth: "50%", mt: 7 }}>

                  <Grid>
                    <CheckCircleIcon style={{ color: 'rgb(23, 150, 108)', fontSize: "70px", mt: 7 }} />
                  </Grid>&nbsp;&nbsp;

                  <Grid>
                    <Typography style={{ fontSize: '16px', fontWeight: 'bold' }}>You're good to go!</Typography>
                    <Typography style={{ fontSize: '16px' }}>Your questions have been successfully uploaded.</Typography>
                    <Typography style={{ fontSize: '16px' }}> Next, preview and configure your quiz</Typography>
                  </Grid>

                </Grid>
                <Grid sx={{ float: 'right' }}>
                  <Button variant='outlined'><NavigateBeforeIcon /> Back </Button> &nbsp;&nbsp;
                  <Button variant='contained' onClick={handleContinueClick} > Continue</Button>
                  {showQuizTopics && <QuizTopics />}
                </Grid>
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
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


  )
}
