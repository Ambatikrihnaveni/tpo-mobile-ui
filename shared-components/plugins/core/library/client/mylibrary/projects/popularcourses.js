import { Card, Typography, Grid } from '@material-ui/core'
import React from 'react';
import ProductImage from './productimage';
import './pcourses.css'
import Div from "@jumbo/shared/Div";

export default function Projects() {

  return (
    <Card sx={{ p: 5 }}>
      <Grid>
        <Typography variant={"h1"}>
          Projects
        </Typography>
        <hr />
        <Div sx={{ ml: 10, mr: 10 }}>
          <ProductImage />
        </Div>
      </Grid>
    </Card>
  )
}
