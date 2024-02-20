import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { Typography, IconButton } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {


  return (
    <div>
      <Typography variant="h3" sx={{ color: "black" }}>Create a new Topic</Typography>
      <Typography variant="h4" >Select a Topic type</Typography>
      <Box sx={{ width: '40%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6} lg={4} sx={{ mt: 4, borderStyle: "solid" }}>
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
          <Grid item xs={12} md={6} lg={4} sx={{ mt: 4, borderStyle: "solid" }}>
            <Typography>
              <IconButton sx={{
                bgcolor: '#385196', color: 'common.white', p: theme => theme.spacing(1.25), '&:hover': {
                  backgroundColor: '#385196',
                }
              }} aria-label="Facebook"> <ModeEditIcon /></IconButton>
            </Typography>
            <Typography variant="h3" sx={{ color: "black" }}>Projects</Typography>
            <Typography>Asses Knowledge with</Typography>
            <Typography>a written task</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>

  );
}
