import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Buttons from './buttons';


export default function Resumestart() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>

      <h1 style={{ textAlign: "center" }}>How do you want to build your resume?</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container style={{ marginLeft: "100px", marginTop: "100px" }} >
          <Grid item md={6}>
            <Grid item xs={8}>
              <Card style={{ border: "solid" }}>
                <Button onClick={handleClickOpen}>
                  <CardContent>
                    <HistoryEduIcon style={{ fontSize: "80px" }} />
                    <h1>Create a new resume</h1>
                    <p>We will help you create a resumestep-by-step.</p>
                  </CardContent>
                </Button>
              </Card>

            </Grid>
          </Grid>


          <Grid item md={6}>
            <Grid item xs={8}>
              <Card style={{ border: "solid" }}>
                <Button onClick={handleClickOpen}>
                  <CardContent>
                    <HistoryEduIcon style={{ fontSize: "80px" }} />
                    <h1>I already have a resume</h1>
                    <p>We'll re-format it and fill in your information
                      so you don't have to..</p>
                  </CardContent>
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Buttons/>
    </div>
  );
}