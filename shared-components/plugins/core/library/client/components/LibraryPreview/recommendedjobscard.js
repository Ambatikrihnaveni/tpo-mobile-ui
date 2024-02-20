import React from 'react';
import { Typography, Card, Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import Div from '@jumbo/shared/Div'
import Button from '@mui/material/Button';

export default function RecommendedjobCard({ jobPosting }) {
  const shopId = window.localStorage.getItem('accounts:shopId');

  return (
    <div >
      <Div className="container">
        <div style={{ height: '330px',}}>
          <Div>
            <Grid container spacing={2}>
              <Grid>
                <Card sx={{ width: '430px', textAlign: "justify" ,marginTop:"47px",marginLeft:"135px"}}>
                  <Grid>

                    <Grid container style={{ display: "flex" }}>

                      <Grid xs={1}>

                      </Grid>

                      <Grid xs={7} >
                        <Typography style={{
                          fontSize: '18px',
                          lineHeight: '24px',
                          fontWeight: '400px',
                          marginLeft: "5px",
                          marginBottom: "7px",
                          marginTop: "7px",
                          color: '#484848'
                        }}> {jobPosting.team} </Typography>

                        <Typography style={{
                          marginBottom: '4px',
                          fontSize: '20px',
                          lineHeight: '24px',
                          fontWeight: '600px',
                          color: '#333',
                          marginLeft: "5px",
                          marginBottom: "7px",
                          marginTop: "7px",
                        }}> {jobPosting.program}</Typography>

                        <Typography style={{
                          fontSize: '18px',
                          lineHeight: '24px',
                          fontWeight: '400px',
                          color: 'blue',
                          marginLeft: "7px",
                          marginTop: "15px",
                          marginBottom: "5px",
                        }}> {jobPosting.price} </Typography>
                      </Grid>

                      <Grid xs={4}>
                        <Box sx={{ display: "flex", margin: "20px" }}>
                          <img src={jobPosting.img}
                            style={{ width: "70px", height: "80px", borderRadius: "5px" }} />
                        </Box>
                      </Grid>

                    </Grid>


                    <Grid container sx={{ margin: "10px" }}>
                      <Grid xs={1}>

                      </Grid>
                      <Grid sx={{marginLeft:"20px",marginRight:"20px",marginTop:"2px",marginBottom:"2px"}}>

                        <Typography
                          sx={{
                            fontSize: '18px',
                            lineHeight: '24px',
                            fontWeight: '250px',
                            color: '#484848',
                          }}
                        >
                          {jobPosting.Decription}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container>
                      <Grid xs={1}>

                      </Grid>
                      <Grid xs={6} sx={{marginTop:"10px",marginBottom:"7px"}}>
                      <Button variant="outlined">Remote</Button>
                      </Grid>
                      <Grid xs={5} sx={{marginTop:"10px",marginBottom:"7px"}}>
                      <Typography style={{
                          marginBottom: '4px',
                          fontSize: '20px',
                          lineHeight: '24px',
                          fontWeight: '600px',
                          color: '#333',
                          marginLeft: "5px",
                          marginBottom: "7px",
                          marginTop: "7px",
                        }}> {jobPosting.location}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Div>
        </div>
      </Div>

    </div>
  );
}
