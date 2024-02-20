import React from 'react'
import { Grid, Typography } from '@mui/material'

export default function ProgramDescription({ data }) {
  return (
    <Grid container spacing={1} alignItems='center' justifyContent='center'>
      <Grid item xs={12} sm={10} md={9}>
        <Typography variant='h1' style={{
          marginBottom: '32px',
          fontSize: '28px',
          lineHeight: '36px',
          fontWeight: '800',
          textAlign: 'center',
          color: "#035961", textTransform: 'none'
        }}>{`Why do you learn ${data?.name}?`} </Typography>
        <Grid container spacing={2}>


          <Grid item xs={12} sm={8}>
            <p style={{ fontSize: "20px" }}> Using React to build web applications saves development time and helps you ship your applications faster. </p>
            <p style={{ fontSize: "20px" }} > Since React is a very popular and robust framework, there are many open-source APIs and tools available </p>
            <p style={{ fontSize: "20px" }}> Since React is a very popular and robust framework, there are many open-source APIs and tools available </p>
            <p style={{ fontSize: "20px" }}>HTML, CSS, and JavaScript are the core technologies of the web that are required to learn React. </p>
            <p style={{ fontSize: "20px" }}> React is purely written in JavaScript with some HTML-like syntax, called JSX, for creating the UI components.</p>
            <p style={{ fontSize: "20px" }}>Using CSS, you can style the user interface components by applying various style rules.</p>
          </Grid>



          <Grid item xs={12} sm={4}>
            <img src="/images/learnreact-removebg-preview.png" alt="learn" style={{ width: '400px', }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
