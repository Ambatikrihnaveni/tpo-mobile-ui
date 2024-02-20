import React from "react";
import { Card,Typography, Box,Grid } from "@mui/material";
import Div from '@jumbo/shared/Div'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Banner from "./banner";
import Details from "./details";
import Overview from "./overview";
import Eligibility from "./eligibility";
import ExamDates from "./examDates";
import FAQS from "./faqs";
import ExamPattern from "./examPattern";
import CutOffMarks from "./Cut-off-Marks";
import Syllabus from "./syllbus";

export default function CompetitivePreview({ handleClose, record }) {
               
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
                        <Banner handleClose={handleClose} />
                    </Div>
                    <Grid sx={{ ml: "5%", mt: "2.5%", }}>
                        <Grid sx={{ width: "70%", typography: 'body1', }}>
                            <Details record={record} />
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
                                        <Tab label="Eligibility" value="2" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                        <Tab label="Syllbus" value="3" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                        <Tab label="Exam Pattern" value="4" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                        <Tab label="Exam Dates" value="5" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                        <Tab label="Cut-off Marks" value="6" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
                                        <Tab label="FAQ's" value="7" sx={{ fontWeight: 'bold', fontSize: '15px', marginLeft: '20px' }} />
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
                                        <Overview  record={record} />
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
                                        }}>Eligibility</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <Eligibility  record={record}/>
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
                                        }}>Syllabus</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <Syllabus record={record} />
                                    </Card>
                                </TabPanel>
                                <TabPanel value="4">
                                    <Grid>
                                        <Typography style={{
                                            marginBottom: '32px',
                                            fontSize: '28px',
                                            lineHeight: '36px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            color: "#035961", textTransform: 'none'
                                        }}>Exam Pattern</Typography>
                                    </Grid>
                                    <Card sx={{ marginBottom: '40px', minHeight: "500px", width: "95vw", maxWidth: "100%", ml: -3.6 }}>
                                        <ExamPattern  record={record}/>

                                    </Card>
                                </TabPanel>

                                <TabPanel value="5">
                                    <Grid>
                                        <Typography style={{
                                            marginBottom: '32px',
                                            fontSize: '28px',
                                            lineHeight: '36px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            color: "#035961", textTransform: 'none'
                                        }}>Exam Dates</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <ExamDates record={record}/>
                                    </Card>
                                </TabPanel>

                                <TabPanel value="6">
                                    <Grid>
                                        <Typography style={{
                                            marginBottom: '32px',
                                            fontSize: '28px',
                                            lineHeight: '36px',
                                            fontWeight: '800',
                                            textAlign: 'center',
                                            color: "#035961", textTransform: 'none'
                                        }}>Cut-Off Marks</Typography>
                                    </Grid>

                                    <Card sx={{ marginBottom: '40px', p: 2, minHeight: "400px", width: "95vw", maxWidth: "100%", }}>
                                        <CutOffMarks  record = {record}/>
                                    </Card>
                                </TabPanel>
                                <TabPanel value="7">
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
                                    <Card sx={{ marginBottom: '40px', minHeight: "400px", width: "95vw", maxWidth: "100%", ml: -3.6 }}>
                                        <FAQS record={record}/>
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
