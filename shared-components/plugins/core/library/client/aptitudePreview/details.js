import React from "react";
import { Grid } from '@mui/material';
import Div from "@jumbo/shared/Div";
import TabContext from '@mui/lab/TabContext';
import { Typography, Avatar } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";

export default function AptitudeDetails({ record }) {
    return (
        <JumboCardQuick sx={{ marginTop: '-110px', borderRadius: "1px" }}>
            <Grid container spacing={3} >
                <Grid item sx={12} sm={8}>
                    <Grid container spacing={2} >

                        <Grid container >
                            <Grid item xs={4} sm={2}>

                                <Avatar
                                    alt={''}
                                    sx={{ width: 80, height: 80, mb: 2, ml: "5%" }}
                                ></Avatar>

                            </Grid>

                            <Grid item xs={8} md={6}>
                                <Typography style={{
                                    fontSize: '35px',
                                    lineHeight: '35px',
                                    fontWeight: '900',
                                    color: '#333',
                                    marginTop: "18px",
                                    textAlign: 'left'

                                }}>{record?.title}</Typography>
                            </Grid>
                        </Grid>


                    </Grid>

                    <TabContext>

                        <Div sx={{ display: "flex", md: 2, mt: 2 }}>
                            <Typography
                                style={{
                                    marginBottom: '4px',
                                    marginTop: "4px",
                                    fontSize: '22px',
                                    lineHeight: '24px',
                                    fontWeight: '400',
                                    color: '#2E475D',
                                    width: '40%',
                                    textAlign: 'left'
                                }}
                            >
                                Duration
                            </Typography>
                            <Typography sx={{ color: '#1b2733', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }}>10 Days</Typography>
                        </Div>


                        <Div sx={{ display: "flex", md: 2, mt: 2 }}>
                            <Typography
                                style={{
                                    marginBottom: '2px',
                                    fontSize: '22px',
                                    marginTop: "4px",
                                    lineHeight: '24px',
                                    fontWeight: '400',
                                    color: '#2E475D',
                                    width: '40%',
                                    textAlign: 'left'
                                }}
                            >
                                Program Available
                            </Typography>
                            <Typography sx={{ color: '#1b2733', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }}>Self-Paced</Typography>
                        </Div>

                        <Div sx={{ display: "flex", md: 2, mt: 2 }}>
                            <Typography
                                style={{
                                    marginBottom: '8%',
                                    fontSize: '22px',
                                    lineHeight: '24px',
                                    fontWeight: '400',
                                    color: '#2E475D',
                                    width: '40%',
                                    marginTop: "4px",
                                    textAlign: 'left'
                                }}
                            >
                                Author
                            </Typography>
                            <Typography sx={{ color: '#1b2733', fontSize: '18px', lineHeight: '24px', textAlign: 'left' }} ><a href='#'>Tpo.Ai</a></Typography>
                        </Div>

                    </TabContext>
                </Grid>
            </Grid>
        </JumboCardQuick>
    )
}