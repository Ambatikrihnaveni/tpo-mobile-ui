import React from 'react'
import Div from "@jumbo/shared/Div";
import { Grid, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HandshakeIcon from '@mui/icons-material/Handshake';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';


export default function CourseHighlights({data}) {
    
    return (
        <Div>

            <Grid container spacing={2} justifyContent='center' alignItems='center' sx={{ textAlign: "justify", display: "flex", marginTop: "50px" }}>
                <Grid sx={{ marginLeft: "10px" }}>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: "10px" }}>
                            <Div sx={{ backgroundColor: '#d0f2ed', borderRadius: '10px', padding: '9px' }}>
                                <PlayCircleIcon style={{ color: '#007bff', fontSize: '20px' }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}
                            >Learn {data?.modes}</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>At your own schedule</Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <MobileFriendlyIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Mobile friendly</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>No laptop? No problem</Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <HandshakeIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Placement assistance</Typography>

                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}> To build your career</Typography>
                        </div>
                    </div>
                </Grid>


                <Grid sx={{ marginLeft: "10px" }}>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <WorkspacePremiumOutlinedIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Certificate of Training</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}> From TPO.AI Trainings</Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <ArticleOutlinedIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> 3 projects & 1</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>For hands-on practice</Typography>
                        </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <ContactSupportOutlinedIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Doubt clearing</Typography>

                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>Through Q&A forum</Typography>
                        </div>
                    </div>
                </Grid>


                <Grid sx={{ marginLeft: "10px" }}>

                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <TrendingUpOutlinedIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}> Beginner friendly</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>No knowledge required</Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }}>
                                <CalendarTodayOutlinedIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div>
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}>
                                {data?.duration} duration  </Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>day (flexible schedule) </Typography>
                        </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '50px' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Div style={{ backgroundColor: '#d0f2ed', marginRight: '10px', borderRadius: '10px', padding: '9px' }} >
                                <DownloadForOfflineOutlinedIcon style={{ fontSize: '20px', color: '#007bff', }} />
                            </Div>
                        </div>
                        <div >
                            <Typography style={{
                                marginBottom: '4px',
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '600',
                                color: '#333'
                            }}>
                                Downloadable content</Typography>
                            <Typography style={{
                                fontSize: '18px',
                                lineHeight: '24px',
                                fontWeight: '400',
                                color: '#484848'
                            }}>With lifetime access </Typography>
                        </div>
                    </div>

                </Grid>

            </Grid>
        </Div>
    )
}
