import { Card, Grid } from '@mui/material';
import React from 'react';
import Cards from './cards';
import RecentActivities1 from './RecentActivities1';
import EnhancedTableHead from './tutor';
import NewAuthors from './NewAuthors';
import Salesanalysis from './salesanalysis';
import Tasklist from './tasklist'

function Tutordashboard() {
  return (
    <>
      <Grid sx={{ m: 1 }}>
        <Cards />
      </Grid>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} sx={{ m: 1 }}>
          <RecentActivities1 />
        </Grid>
        <Grid item xs={2} sm={4} md={7.6} sx={{ m: 1 }}>
          <EnhancedTableHead />
        </Grid>
      </Grid>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} sx={{ m: 1 }}>
          <NewAuthors />
        </Grid>
        <Grid item xs={2} sm={4} md={7.6} sx={{ m: 1 }}>
          <Card>
            <Salesanalysis />
          </Card>
        </Grid>
      </Grid>
      <Grid sx={{ m: 1 }}><Tasklist /></Grid>


    </>

  )
}

export default Tutordashboard