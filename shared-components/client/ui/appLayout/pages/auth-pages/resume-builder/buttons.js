import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const steps = [
  "Select campaign settings",

];

export default function Buttons() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box style={{ width: "90%" }}>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography style={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>

        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box style={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ marginTop: "100px", marginLeft: "8%" }}
            >
              Back
            </Button>
            <Box style={{ flex: "1 1 auto" }} />
            <Button onClick={handleClickOpen} style={{ marginTop: "100px" }}> Next</Button>
            <div>
              <Dialog
                sx={{ borderRadius: "30%" }}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle style={{ textAlign: "center" }} id="alert-dialog-title">
                  {<h5>Create new resume?</h5>}
                  <p>By selecting Create New Resume, your content will be permanently deleted</p>
                </DialogTitle>
                <DialogActions>
                  <Button variant="outlined" onClick={handleClose}></Button>
                  <Button variant="outlined" onClick={handleClose} autoFocus>
                    Continue editing
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}