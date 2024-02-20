import React from "react";
import { Card, Typography, Box, Grid } from "@mui/material";
import Div from '@jumbo/shared/Div'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import AptitudeBanner from "./aptitudeBanner";
import AptitudeDetails from "./details";
import AptitudeOverview from "./overview";
import AptitudeFaqs from "./aptitudeFaqs";
import AptitudeSyllabus from "./syllabus";

export default function AptitudePreview({ handleClose, record}) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid
            style={{ overflowX: 'hidden', }}>
            <Div sx={{
                textAlign: 'center',
                backgroundColor: '#f5f8ff',
                display: "flex",
                backgroundSize: "cover",
            }}>
                <Div >
                    <Div>
                        <AptitudeBanner handleClose={handleClose} />
                    </Div>
                    <Grid sx={{ ml: "5%", mt: "2.5%", }}>
                        <Grid sx={{ width: "70%", typography: 'body1', }}>
                            <AptitudeDetails record={record} />
                        </Grid>
                        <Box sx={{ width: '70%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Card sx={{
                                    borderBottom: 3,
                                    borderColor: 'divider',
                                    textAlign: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    borderRadius: "1px",
                                    backgroundColor: "#39475c",
                                    color: "white",
                                }}>
                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Overview" value="1" sx={{ fontWeight: 'bold', fontSize: '15px' }} />
                                        <Tab label="Syllabus" value="2" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                        <Tab label="FAQ's" value="3" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                    </TabList>
                                </Card>

                                <TabPanel value="1">
                                    <Grid>

                                        <Typography style={{
                                            marginBottom: '32px',
                                            fontSize: '28px',
                                            lineHeight: '36px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            color: "#035961", textTransform: 'none'
                                        }}>Overview</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <AptitudeOverview record={record}/>
                                    </Card>
                                </TabPanel>

                                <TabPanel value="2">
                                    <Grid>
                                        <Typography style={{
                                            marginBottom: '32px',
                                            fontSize: '28px',
                                            lineHeight: '36px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            color: "#035961", textTransform: 'none'
                                        }}>Syllabus</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <AptitudeSyllabus record={record}/>
                                    </Card>
                                </TabPanel>

                                <TabPanel value="3">
                                <Grid>
                                        <Typography style={{
                                            marginBottom: '32px',
                                            fontSize: '28px',
                                            lineHeight: '36px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            color: "#035961", textTransform: 'none'
                                        }}>FAQ's</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <AptitudeFaqs record={record}/>
                                    </Card>
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Grid>
                </Div>
            </Div>
        </Grid>
    );
};
