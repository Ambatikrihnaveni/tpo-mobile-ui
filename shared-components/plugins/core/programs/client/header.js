import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Div from '../../../../client/ui/@jumbo/shared/Div';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useProgram from './hooks/useProgram';


export default function CreateProgramHeader() {

  const { program } = useProgram()
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate("/myPrograms")
  }
  return (
    <Div sx={{ background: "white", p: 2 }} >
      <Grid container spacing={2} >
        <Grid item xs={6} lg={6} sx={{ display: "flex" }} >
          <Div sx={{ mr: 2 }}><Button onClick={onBackClick}><ArrowBackIcon /></Button></Div>
          <Typography variant='h3' sx={{ fontStyle: "bold" }}>{program?.title ? program.title : "Program Title"}</Typography>
        </Grid>
        <Grid item xs={6} lg={6} sx={{ textAlign: "right" }}>
          <Button sx={{ marginRight: "10px", textTransform: 'none', color: "#e33b32" }}><DeleteOutlineIcon fontSize='small' />Move to trash</Button>
          <Button sx={{ marginRight: "10px", textTransform: 'none', }}><VisibilityIcon sx={{ fontSize: "8px" }} />View module</Button>
          <Button variant='outlined' sx={{ marginRight: "10px", textTransform: 'none', }}>Save to darft</Button>
          <Button variant='contained' sx={{ textTransform: 'none', }}>Publish</Button>
        </Grid>
      </Grid>

    </Div>
  )
}
