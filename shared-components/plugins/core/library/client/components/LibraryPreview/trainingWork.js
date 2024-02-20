import React from 'react'
import Div from "@jumbo/shared/Div";
import { Grid, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

export default function TrainingWork() {
    return (
        <Div className="container">
            <Grid container spacing={2} justifyContent='center' alignItems='center'>
                <Grid item xs={12} sm={6} md={3}>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{  marginRight: '10px' }}>
                            <Div sx={{backgroundColor: '#d0f2ed',  borderRadius: '10px', padding: '13px'}}>
                            <PlayCircleIcon   style={{ color: '#007bff',fontSize: '30px' }}  />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{ marginBottom: '4px', fontSize: '20px', lineHeight: '24px', fontWeight: '600', color: '#333' }}>Learn online</Typography>
                            <Typography style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '400', color: '#484848' }}>Go through training videos to learn concepts</Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex' , marginBottom: '50px'}}>
                        <div style={{ marginRight: '10px'}} >
                        <Div sx={{backgroundColor: '#d0f2ed',  borderRadius: '10px', padding: '13px'}}>
                            <ContactSupportOutlinedIcon  style={{ fontSize: '30px', color: '#007bff', }}  />
                            </Div>
                            </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '20px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> 1:1 doubt solving</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>Get your doubts solved by experts through Q&A forum within 24 hours</Typography>
                        </div>
                    </div>
                   
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div style={{ display: 'flex' , marginBottom: '50px'}}>
                    <div style={{ marginRight: '10px'}} >
                        <Div sx={{backgroundColor: '#d0f2ed',  borderRadius: '10px', padding: '13px'}}>
                            <FactCheckOutlinedIcon  style={{ fontSize: '30px', color: '#007bff', }}  />
                            </Div>
                            </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '20px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Test yourself</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}> Test your knowledge through quizzes & module tests at regular intervals</Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '50px'}}>
                    <div style={{ marginRight: '10px'}} >
                        <Div sx={{backgroundColor: '#d0f2ed',  borderRadius: '10px', padding: '13px'}}>
                            <DescriptionIcon  style={{ fontSize: '30px', color: '#007bff', }}  />
                            </Div>
                            </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '20px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Take final exam</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>Complete your training by taking the final exam</Typography>
                        </div>
                    </div>
                   
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                    <div style={{ marginRight: '10px'}} >
                        <Div sx={{backgroundColor: '#d0f2ed',  borderRadius: '10px', padding: '13px'}}>
                            <SportsHandballIcon  style={{ fontSize: '30px', color: '#007bff', }}  />
                            </Div>
                            </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '20px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}>Hands-on practice</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>Get hands on practice by doing projects. Use our in-browser IDE for coding practice</Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                    <div style={{ marginRight: '10px'}} >
                        <Div sx={{backgroundColor: '#d0f2ed',  borderRadius: '10px', padding: '13px'}}>
                            <WorkspacePremiumIcon  style={{ fontSize: '30px', color: '#007bff', }}  />
                            </Div>
                            </div>
                        <div>
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '20px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}>
                                Get certified  </Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>Get certified in React JS upon successful completion of training </Typography>
                        </div>
                    </div>
                   
                </Grid>
            </Grid>
        </Div>
    )
}
