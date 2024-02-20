import { Card, Typography, Grid } from '@material-ui/core'
import React from 'react';
import ProductImage from './productimages';
import './pcourses.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Popularcourses() {
  const path = 'addmodule'
  return (
    <Card sx={{ p: 5 }}>

      <Grid>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <Grid xs={6} sm={9} >
            <Typography variant={"h1"}>
              Modules
            </Typography>
          </Grid>
          <Grid xs={6} sm={3} sx={{ textAlign: "right" }}>
            <Link to={path} style={{ textDecoration: "none" }}>
              <Button variant='contained'>Add Module</Button>
            </Link>
          </Grid>
        </Grid>
        <hr />

        <ProductImage />

      </Grid>
    </Card>
  )
}
