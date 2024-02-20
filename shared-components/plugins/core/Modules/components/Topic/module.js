import React from 'react';
import { Card, Grid, Dialog } from "@mui/material";
import Div from "@jumbo/shared/Div";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import Divider from "@mui/material/Divider";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Typography, } from '@mui/material';
import Sample from './sample';

export default function Module() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Div>
      <Card >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} md={6} lg={10}>
            <Typography variant="h5" sx={{ pl: 6 }}>Module<ArrowForwardIosIcon />Untitled course</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <SettingsIcon />   <MoreVertIcon />   <Button variant="contained" disableElevation>
              Publish
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h3" sx={{ pl: 6, pt: 2, color: "black" }}>Untitled Module</Typography>
        <Typography variant="h5" sx={{ pl: 6, pt: 2 }}>Module description</Typography>
        <Divider />
        <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6} md={6} lg={2}>
            <Button variant="contained" sx={{ ml: 6 }} disableElevations>Draft </Button><InfoOutlinedIcon />
          </Grid>
          <Grid item xs={1} md={1} lg={8} >
            <Typography> <AddIcon /> Invite learners</Typography>
          </Grid>
          <Grid item xs={2} md={2} sx={{ float: "right" }}>
            <Typography>Last updates 1 decond ago <KeyboardArrowDownIcon /></Typography>
          </Grid>
        </Grid>
        <Divider />
        <Button variant="contained" disableElevation onClick={handleClickOpen}> <AddIcon />Create Content</Button>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Sample />

        </Dialog>
      </Card>
    </Div>
  )
} 
