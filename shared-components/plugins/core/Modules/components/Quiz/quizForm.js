import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import QuizQestions from './quizQuestions';

const steps = ['Quiz Info', 'Question', 'Settings'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);

    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleCancel = () => {
    setActiveStep(0);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {

          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Box
        sx={{
          width: "100%",
          maxWidth: '100%',
          '& > :not(style)': { m: 1 },
        }}
      >
        <Card> <Quiz step={activeStep} /></Card>
        <br></br>
      </Box>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={handleReset} >Restart</Button>
          </Box>
        </React.Fragment>

      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, pl: "10px", pr: "0px" }}>
            <Button onClick={handleCancel} variant="outlined" sx={{ height: "40px" }}>Cancel</Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, height: 40, mt: 0.5 }}
              variant="outlined"
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {/*   {activeStep === steps.length - 1 ? '' : 'Save&Next'} */}

              <Button variant="contained">Save&Next</Button>
            </Button>

          </Box>
        </React.Fragment>
      )}

    </Box>
  );
}
function Card1() {
  return (

    <React.Fragment>
      <CardContent>
        <label>Quiz Title</label>
        <input fullWidth placeholder="Type Your Quiz Here" style={{ height: 50, width: "100%" }} />
        <label>Summary</label>
        <TextareaAutosize
          style={{ width: "100%", height: 200 }}
        />
      </CardContent>

    </React.Fragment>
  )

};

function Quiz({ step }) {
  if (step === 0) {
    return <Card1 />
      ;
  }
  if (step === 1) {
    return <QuizQestions />
  }
  if (step === 2) {
    return <QuizQestions />
  }

}