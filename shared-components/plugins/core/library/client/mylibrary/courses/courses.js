import { Card, Typography, Grid } from '@material-ui/core'
import React from 'react';
import ProductImage from './productimages';
import './pcourses.css'


export default function Courses() {


  return (
    <Card sx={{ p: 5 }}>
      <Grid>
        <Typography variant={"h1"}>
          Courses
        </Typography>
        <hr />
        <ProductImage />
      </Grid>
    </Card>
  )
}
