import React, { useState } from "react";
import {
  Divider,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import useAuth from "../../../../../../hooks/useAuth";
import StudentsService from "../../../../../../graphql/services/students/students-service";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const useStyles = makeStyles((theme) => ({
  redCheckbox: {
    '&$checked': {
      color: 'red',
    },
  },
  greenCheckbox: {
    '&$checked': {
      color: 'green',
    },
  },
  checked: {},
}));
export default function SubmissionQuiz({ onClose, lessonId }) {
 
  const [showDetails, setShowDetails] = useState(false);
  const { viewer } = useAuth()
  const classes = useStyles();
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = React.useState('')
  const [quizzes, setQuizzes] = React.useState([])
  const [lessonName, setLessonName] = React.useState('')
  const [passedQuizzes, setPassedQuizzes] = React.useState('');
  const [submittedDate, setSubmittedDate] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = viewer?._id;
        const { data } = await StudentsService.quizDetails(studentId, lessonId);
        setQuizzes(data?.data?.studentQuizData?.quiz);
        setLessonName(data?.data?.studentQuizData?.lessonName);

        let passed = 0;
        for (let i = 0; i < data?.data?.studentQuizData?.quiz?.length; i++) {
          setSubmittedDate(data?.data?.studentQuizData.quiz[i]?.submittedDate);
          if (data?.data?.studentQuizData.quiz[i].result === true) {

            passed += 1;
          }
        }

        setPassedQuizzes(passed);

        if (passed >= data?.data?.studentQuizData?.quiz?.length/2) {
          setResult("Pass");
        } else {
          setResult("Fail");
        }
      } catch (error) {
        // Handle errors here
        console.error("Error fetching quiz details:", error);
      }
    };

    fetchData(); // Call the async function

  }, [lessonId]);

  const formatAnswer = (answer) => {
    if (answer.length >= 2) {
      return answer[0].toUpperCase() + answer.slice(1, -1) + ' ' + answer.slice(-1);
    }else {
      return "Answer is too short to format.";
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    onClose()
  };

 
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    return formattedDate;
  };

  const currentDate = getCurrentDate();
  return (
    <Grid>
      <Grid>
        <AppBar sx={{ position: 'relative', width: "100%" }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white', fontSize: '20px' }}>
              {lessonName}
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid sx={{ margin: 7 }}>
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>Quizz</Typography>
      </Grid>
      <Grid sx={{ alignItems: "center" }}>
        <Divider sx={{ width: "80%", marginLeft: "100px" }} />
      </Grid>
      <Grid container sx={{ display: "flex", mt: 2, mb: 2 }}>
        <Typography sx={{ ml: 15 }}>Questions:{quizzes?.length}</Typography>
        <Typography sx={{ ml: 20 }}>Quiz Time:0 Minutes</Typography>
        <Typography sx={{ ml: 27 }}>Total Marks:{passedQuizzes}/{quizzes?.length}</Typography>
        <Typography sx={{ ml: 53}}>Passing Marks:{(quizzes?.length) / 2}</Typography>
      </Grid>
      <Grid sx={{ alignItems: "center" }}>
        <Divider sx={{ width: "80%", marginLeft: "100px" }} />
      </Grid>
      <Grid>
        <Table sx={{ width: "80%", marginLeft: "100px", mt: 7 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>No.Questions</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Total Marks</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Correct Answer</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Incorrect Answer</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Earned Marks</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Result</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {submittedDate}
              </TableCell>
              <TableCell align="right">{quizzes?.length}</TableCell>
              <TableCell align="right">{passedQuizzes}</TableCell>
              <TableCell align="right">{passedQuizzes}</TableCell>
              <TableCell align="right">{quizzes?.length - passedQuizzes}</TableCell>
              <TableCell align="right">{passedQuizzes}</TableCell>
              <TableCell align="right">{result === "Pass" ? (<Chip label="Pass" sx={{ backgroundColor: '#a2f2c8', color: " #079D55" }} />) : (<Chip label="Fail" sx={{ backgroundColor: '#FFB9B9', color: "#FF3131" }} />)}</TableCell>
              <Button variant="outlined" onClick={toggleDetails} sx={{ textTransform: "none", mt: 1, ml: 5 }}>Details</Button>
            </TableRow>

          </TableBody>
        </Table>
      </Grid>
      {showDetails && (

        <Table sx={{ width: "80%", marginLeft: "100px", mt: 7 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                No
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell sx={{ fontWeight: "bold",width:"250px"}}>
                Questions
              </TableCell>
              <TableCell sx={{ fontWeight: "bold",width:"150px" }}>
                Given Answer
              </TableCell>
              <TableCell  sx={{ fontWeight: "bold",width:"150px" }}>
                Correct Answer
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Hint
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizzes?.map((quiz, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              >
                <TableCell align="right">{index+1}</TableCell>
                <TableCell align="right">
                    {quiz?.given_answer === quiz?.quiz_answer ? (
                      <CheckIcon className={classes.greenCheckbox} sx={{color:"green"}} />
                    ) : (
                      <ClearIcon className={classes.redCheckbox} sx={{color:"red"}}/>
                    )}
                </TableCell>

                <TableCell sx={{width:"250px"}}>{quiz.quiz_title}</TableCell>
                <TableCell sx={{width:"150px"}}>{formatAnswer(quiz.given_answer)}</TableCell>
                <TableCell sx={{width:"180px"}}>{formatAnswer(quiz.quiz_answer)}</TableCell>
                <TableCell sx={{justifyContent:"flex-start"}}> {quiz.quiz_hint}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Grid>
  )
}