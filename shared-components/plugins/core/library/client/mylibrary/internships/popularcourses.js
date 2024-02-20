import { Card, Typography, Grid } from '@material-ui/core'
import React from 'react';
import ProductImage from './productimage';
import './pcourses.css'

export default function Internships() {

  return (
    <Card sx={{ p: 5 }}>
      <Grid>
        <Typography variant={"h1"}>
          Internships
        </Typography>
        <hr />
        <ProductImage />
      </Grid>
    </Card>
  )
}
