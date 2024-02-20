import React, { useState } from "react";
import {
  Card,
  Divider,
  Typography,
  Button,
  Grid,
  TextField,
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
import Div from "@jumbo/shared/Div";
import { makeStyles } from '@mui/styles';

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



export default function SubmissionAssignment({ onClose, record }) {
  const [open, setOpen] = React.useState(false);
  const [showDetailsTable, setShowDetailsTable] = useState(false);
  const classes = useStyles();
  const [assignmentsLength, setAssignmentsLength] = React.useState('')
  const [totalMarks, setTotalMarks] = React.useState('')
  const [passMarks, setPassMarks] = React.useState('')
  const [feedback, setFeedback] = React.useState('')
  const [marksObtained, setMarksObtained] = useState('')
  const [lessonName, setLessonName] = React.useState('')
  const [correctAnswers, setCorrectAnswers] = React.useState('')
  const [wrongAnswers, setWrongAnswers] = React.useState('')
  const [assignmentResult, setAssignmentResult] = React.useState('')
  const [data, setData] = React.useState([])
  const handleOpen = () => {
    setOpen(true);
  };
  const toggleDetails = () => {
    setShowDetailsTable(!showDetailsTable);
  }
  const handleClose = () => {
    onClose()
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    return formattedDate;
  };

  const currentDate = getCurrentDate();

  React.useEffect(() => {
    if (record) {
      setAssignmentsLength(record?.assignments?.length)
      setLessonName(record?.lessonName)
      let totalMarks = 0
      let marksObtained = 0
      let passMarks = 0
      let minPassPoints = 0
      let marks = 0
      let wrongAnswer = 0
      let correctAnswers = 0
      for (let i = 0; i < record?.assignments?.length; i++) {
        totalMarks += parseFloat(record?.assignments[i]?.total_points)
        passMarks += parseFloat(record?.assignments[i].min_pass_points)
        minPassPoints += parseFloat(record?.assignments[i]?.min_pass_points);
      }
      for (let j = 0; j < record?.assignmentResult?.length; j++) {
        const marks = parseFloat(record?.assignmentResult[j]?.marks);
        if (!isNaN(marks)) {
          marksObtained += parseFloat(marks);
        }

      }
      if (marksObtained >= minPassPoints) {
        setAssignmentResult("Pass")
      } else if (marksObtained < minPassPoints) {
        setAssignmentResult("Fail")
      } else {
        setAssignmentResult("Pending")
      }
      for (let a = 0; a < record?.assignmentResult?.length; a++) {
        for (let b = 0; b < record?.assignments?.length; b++) {
          let data1 = {};
          if (record?.assignmentResult[a]?.assignmentId === record?.assignments[b]?._id) {
            const marks = parseFloat(record?.assignmentResult[a]?.marks);
            const passMarks = parseFloat(record?.assignments[b]?.min_pass_points);
            if (!isNaN(marks)) {
              if (marks >= passMarks) {
                correctAnswers++;
              } else {
                wrongAnswer++;
              }
            }
            data1["question"] = record?.assignments[b]?.assignment_title;
            if (record?.assignmentResult[a]?.marks != '') {
              data1["marks"] = parseFloat(record?.assignmentResult[a]?.marks);
            }
            data1["answer"] = record?.assignmentResult[a]?.answer;
            data1["passMarks"] = parseFloat(record?.assignments[b]?.min_pass_points);
            setData((prevData) => [...prevData, data1]);
          }
        }
      }
      setPassMarks(passMarks)
      setTotalMarks(totalMarks)
      setMarksObtained(marksObtained)
      setCorrectAnswers(correctAnswers)
      setWrongAnswers(wrongAnswer)
    }
  }, [record])


  return (
    <Grid>
      <Grid>
        <AppBar sx={{ position: 'relative', width: "100%" }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }} >
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
        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>Assignment</Typography>
      </Grid>
      <Grid sx={{ alignItems: "center" }}>
        <Divider sx={{ width: "80%", marginLeft: "100px" }} />
      </Grid>
      <Grid container sx={{ display: "flex", mt: 2, mb: 2 }}>
        <Typography sx={{ ml: 12 }}>Questions: {assignmentsLength}</Typography>
        <Typography sx={{ ml: 27 }}>Total Marks:{marksObtained}/{totalMarks}</Typography>
        <Typography sx={{ ml: 34 }}>Passing Marks:{passMarks}</Typography>
      </Grid>
      <Grid sx={{ alignItems: "center" }}>
        <Divider sx={{ width: "80%", marginLeft: "100px" }} />
      </Grid>
      <Grid>
        <Table sx={{ width: "80%", marginLeft: "100px", mt: 7 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>Question</TableCell>
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
                {record?.assignmentResult[0]?.submittedAt}
              </TableCell>
              <TableCell align="right">{assignmentsLength}</TableCell>
              <TableCell align="right">{totalMarks}</TableCell>
              <TableCell align="right">{correctAnswers}</TableCell>
              <TableCell align="right">{wrongAnswers}</TableCell>
              <TableCell align="right">{marksObtained}</TableCell>
              <TableCell align="right">
                {assignmentResult === "Pass" ? (
                  <Chip label="Pass" sx={{ backgroundColor: '#a2f2c8', color: '#079D55' }} />
                ) : assignmentResult === "Fail" ? (
                  <Chip label="Fail" sx={{ backgroundColor: '#FFB9B9', color: '#FF3131' }} />
                ) : (
                  <Chip label="Pending" sx={{ backgroundColor: '#C0C0C0', color: '#696969' }} />
                )}
              </TableCell>
              <Button variant="outlined" sx={{ textTransform: "none", mt: 1, ml: 2 }} onClick={toggleDetails} >Details</Button>
            </TableRow>

          </TableBody>
        </Table>
      </Grid>
      {showDetailsTable && (

<Table sx={{ width: "80%", marginLeft: "100px", mt: 7 }}>
<Div>
          {data.map((row, index) => (

            <Card  key={row.name} sx={{ width: '100%', padding: '20px 20px',mb:5 }}>

                <IconButton
                    sx={{ alignSelf: "flex-end" }}
                    //onClick={handleBack}
                >
                </IconButton>

                <Typography sx={{ marginBottom: '10px', marginLeft: '1%', fontSize: '20px' }}><b>{/* {data?.assignmentName} */}</b> </Typography>

                <Div sx={{flexDirection: 'row', padding: '20px 20px' }}>

                    <Typography > <b>{row?.question}</b> </Typography>
                </Div>

                <Divider sx={{ height: '1px', backgroundColor: "#555457" }} />


                <Grid container spacing={2} sx={{ marginTop: '3px' }}>
                    <Grid item xs={7} sx={{ backgroundColor: '#f0f0f0', padding: '10px 10px' }}>

                        <Typography><b>Assignment Description:</b> </Typography>
                        <Typography sx={{ marginTop: '20px' }}  dangerouslySetInnerHTML={{ __html: row?.answer }}  /* dangerouslySetInnerHTML={{__html: data?.assignmentAnswer}}  *//>

                    </Grid>

                    <Grid item xs={5} sx={{ padding: '10px 10px' }}>
                        <Typography> <b>Evaluation</b></Typography>
                        <Div sx={{ marginTop: '20px' }}>
                            <Typography sx={{ marginBottom: '10px' }}> Your Points </Typography>
                            <Div sx={{ display: 'flex' }}>
                            <TextField
                                  size='small'
                                  sx={{ width: '10%', marginBottom: '10px' }}
                                  variant="outlined"
                                  disabled
                                  value={row.marks}
                                />

                                <Typography sx={{ marginLeft: '2%', marginTop: '5px' }}>Evaluate this assignment out of {/* {data?.assignmentMarks} */}</Typography>

                            </Div>

                            <Div sx={{ marginTop: '20px' }}>
                                <Typography> Feedback  </Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    value={feedback}
                                    variant="outlined"
                                    rows={5}
                                    autoComplete="off"
                                    disabled
                                    size="large"
                                    sx={{ marginTop: '20px', width: '100%' }}
                                />
                            </Div>

                        </Div>

                    </Grid>

                </Grid>
            </Card>
            ))}
        </Div>
       </Table>
      )}
    </Grid>

  )
}