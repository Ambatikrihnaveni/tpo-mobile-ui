import { Card, Typography, Grid } from '@material-ui/core'
import React from 'react';
import ProductImage from './productimages';
import './pcourses.css'

export default function Projects() {

  return (
    <Card sx={{ p: 5 }}>

      <Grid>
        <Typography variant={"h1"}>
          Projects
        </Typography>
        <hr />
        <ProductImage />
      </Grid>

    </Card>
  )
}
