import * as React from 'react';
import Grid from '@mui/material/Grid';
import Div from "@jumbo/shared/Div";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Typography, IconButton } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

export default function Sample() {

  return (
    <Div sx={{ pl: 2, height: "350px" }}>
      <Typography variant="h3" sx={{ color: "black" }}>Create a new Topic</Typography>
      <Typography variant="h4" >Select a Topic type</Typography>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 4, borderStyle: "solid", ml: 3 }}>
          <Typography>
            <IconButton sx={{
              bgcolor: '#385196', color: 'common.white', p: theme => theme.spacing(1.25), '&:hover': {
                backgroundColor: '#385196',
              }
            }} aria-label="Facebook"> <SchoolOutlinedIcon /></IconButton>
          </Typography>
          <Typography variant="h3" sx={{ color: "black" }}>Topic</Typography>
          <Typography variant="h5">
            Delivery core theory and
          </Typography>
          <Typography>concepts</Typography>
        </Grid>
        <Grid item xs={12} md={5} lg={4} sx={{ mt: 4, borderStyle: "solid", ml: 8 }}>
          <Typography>
            <IconButton sx={{
              bgcolor: '#385196', color: 'common.white', p: theme => theme.spacing(1.25), '&:hover': {
                backgroundColor: '#385196',
              }
            }} aria-label="Facebook"> <ChatBubbleOutlineIcon /></IconButton>
          </Typography>
          <Typography variant="h3" sx={{ color: "black" }}>Discussion</Typography>
          <Typography>Promote Knowledge</Typography>
          <Typography>sharing with peers</Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 2, borderStyle: "solid", ml: 3 }}>
          <Typography>
            <IconButton sx={{
              bgcolor: '#385196', color: 'common.white', p: theme => theme.spacing(1.25), '&:hover': {
                backgroundColor: '#385196',
              }
            }} aria-label="Facebook"> <ModeEditIcon /></IconButton>
          </Typography>
          <Typography variant="h3" sx={{ color: "black" }}>Projects</Typography>
          <Typography>Asses Knowledge</Typography>
          <Typography>with a written task</Typography>
        </Grid>
      </Grid>
    </Div>


  );
}
