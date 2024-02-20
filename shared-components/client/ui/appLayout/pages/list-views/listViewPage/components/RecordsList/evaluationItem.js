import React, { useState } from 'react';
import {
    Card,
    Divider,
    Typography,
    Button,
    TextField,
    IconButton
} from "@mui/material";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Div from "@jumbo/shared/Div";
import { Meteor } from "meteor/meteor";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from 'react-router-dom';
import AssignmentService from '../../../../../../graphql/services/assignment-services/assignmentServices';

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const useStyles = makeStyles({
    textarea: {
        resize: "both",
        width: "100%"
    }
});

const { filesBaseUrl } = Meteor.settings.public;

const EvaluationItem = () => {
    const classes = useStyles();
    const [feedback, setFeedback] = React.useState('')
    const navigate = useNavigate();
    const params = useParams()
    const assignmentId = params.assignmentId
    const studentId= params.studentId
    const [data, setData] = useState({})
    const [points, setPoints] = React.useState()
    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value && event.target.value[0].toUpperCase() + event.target.value.slice(1) )
    }

    const handlePointChange = (event) => {
        setPoints(event.target.value)
    }

    const handleBack = () => {
        navigate(-1)
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await AssignmentService.getEvaluation(assignmentId);
                const studentData = data?.assignmentDetails?.find(item => item.studentId === studentId);
                setData(studentData);
                setPoints(studentData?.totalPoints)
            } catch (error) {
                // Handle error if needed
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [assignmentId]);
    

    const handleEvaluate = () => {
        const accountId = data?.studentId;
        const marks = points;
        const result = AssignmentService.evaluateAssignment(accountId, assignmentId, marks);
        if(result){
            navigate("/assignments")
        }
    };

    return (
        <Div>
            <Card sx={{ width: '100%', padding: '20px 20px' }}>

                <IconButton
                    sx={{ alignSelf: "flex-end" }}
                    onClick={handleBack}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Typography sx={{ marginBottom: '10px', marginLeft: '1%', fontSize: '20px' }}><b>{data?.assignmentName}</b> </Typography>

                <Div sx={{ display: "flex", flexDirection: 'row', padding: '20px 20px' }}>

                    <Typography > <b> Course:</b>  {data?.course} </Typography>
                    <Typography sx={{ marginLeft: '3%' }}> <b> Student:</b>  {data?.studentName}({data?.studentEmail}) </Typography>
                    <Typography sx={{ marginLeft: '3%' }}> <b>Submitted Date:</b> {data?.date} </Typography>
                </Div>

                <Divider sx={{ height: '1px', backgroundColor: "#555457" }} />


                <Grid container spacing={2} sx={{ marginTop: '3px' }}>
                    <Grid item xs={7} sx={{ backgroundColor: '#f0f0f0', padding: '10px 10px' }}>

                        <Typography><b>Assignment Description:</b> </Typography>
                        <Typography sx={{ marginTop: '20px' }}  dangerouslySetInnerHTML={{__html: data?.assignmentAnswer}} />

                    </Grid>

                    <Grid item xs={5} sx={{ padding: '10px 10px' }}>
                        <Typography> <b>Evaluation</b></Typography>
                        <Div sx={{ marginTop: '20px' }}>
                            <Typography sx={{ marginBottom: '10px' }}> Your Points </Typography>
                            <Div sx={{ display: 'flex' }}>
                                <TextField sx={{ width: '20%', marginBottom: '10px' }} variant="outlined" value={points} onChange={handlePointChange} />
                                <Typography sx={{ marginLeft: '2%', marginTop: '5px' }}>Evaluate this assignment out of {data?.assignmentMarks}</Typography>

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
                                    inputProps={{ className: classes.textarea }}
                                    size="large"
                                    sx={{ marginTop: '20px', width: '100%' }}
                                    onChange={handleFeedbackChange}
                                />
                            </Div>
                            <Button variant="contained" sx={{ marginTop: '20px', textTransform: 'capitalize' }} onClick={handleEvaluate}>Evaluate This Submission</Button>

                        </Div>

                    </Grid>

                </Grid>

            </Card>
        </Div>
    );
};
export default EvaluationItem;