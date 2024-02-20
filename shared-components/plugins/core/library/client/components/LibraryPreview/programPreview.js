import React from 'react'
import { Card, Typography, Grid, } from '@mui/material'
import Div from '@jumbo/shared/Div'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, } from "react-router-dom";
import Syllabus from './Syllabus';
import ProgramFAQS from './programFAQS';
import ProgramBanner from './programBanner';
import CourseHighlights from './courseHighlights';
import Admissions from './admissions';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import Overview from './overview';
import ProgramCertificates from './programCertificates';

export default function ProgramPreview({ data, handleClose }) {
  const shopId = localStorage.getItem('accounts:shopId')
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Grid
      style={{
        overflowX: 'hidden',
      }}>
      <Div sx={{
        textAlign: 'center',
        backgroundColor: '#f5f8ff',
        display: "flex",
        backgroundSize: "cover",
      }}>

        <Div>
          <Div >
            <ProgramBanner data={data} handleClose={handleClose} />
          </Div>
          <Grid container sx={{ marginTop: { xs: 0, sm: '-80px' }, zIndex: 2, position: 'absolute' }}>
            <Grid item xs={12} sm={8} >
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
                  <TabList onChange={handleChange} aria-label="lab API tabs example"
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                  >
                    <Tab label="Overview" style={{ padding: "10px", marginRight: "30px", fontSize: "20px", color: '#333', textTransform: 'none', color: "white" }} value="1" />
                    <Tab label="Admissions" sx={{ marginLeft: "10px", marginRight: "10px", fontSize: "20px", color: '#333', textTransform: 'none', color: "white" }} value="2" />
                    <Tab label="Highlights" sx={{ marginLeft: "10px", marginRight: "10px", fontSize: "20px", color: '#333', textTransform: 'none', color: "white" }} value="3" />
                    <Tab label="Syllabus" sx={{ marginLeft: "25px", marginRight: "4px", fontSize: "20px", color: '#333', textTransform: 'none', color: "white" }} value="4" />
                    <Tab label="Certificates" sx={{ marginLeft: "25px", marginRight: "6px", fontSize: "20px", color: '#333', textTransform: 'none', color: "white" }} value="5" />
                    <Tab label="FAQs" sx={{ marginLeft: "25px", marginRight: "6px", fontSize: "20px", color: '#333', textTransform: 'none', color: "white" }} value="6" />
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

                  <Card sx={{ marginBottom: '40px', p: 2, minHeight: "500px", width: "95vw", maxWidth: "100%", }}>
                    <Overview data={data} />
                  </Card>

                </TabPanel>

                <TabPanel value="2">
                  <Card sx={{ marginBottom: '40px', minHeight: "500px", width: "95vw", maxWidth: "100%", }}>
                    <Admissions data={data} />
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
                    }}>Program Highlights</Typography>
                  </Grid>
                  <Card sx={{ marginBottom: '40px', minHeight: "500px", width: "95vw", maxWidth: "100%", ml: -3.6 }}>
                    <CourseHighlights data={data} />
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
                    }}>{`${data?.name} Training Syllabus`}</Typography>
                  </Grid>
                  <Card sx={{ marginBottom: '40px', minHeight: "500px", p: 3, width: "95vw", maxWidth: "100%", ml: -3.6 }}>
                    <Syllabus data={data} />
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
                    }}>Certificates</Typography>
                  </Grid>
                  <Card sx={{ marginBottom: '40px', minHeight: "500px", width: "95vw", maxWidth: "100%", ml: -3.6 }}>
                    <ProgramCertificates data={data} />

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
                    }}>{`${data?.name} Training FAQs`}</Typography>
                  </Grid>
                  <Card sx={{ marginBottom: '40px', minHeight: "500px", width: "95vw", maxWidth: "100%", ml: -3.6 }}>

                    <ProgramFAQS data={data} />

                  </Card>
                </TabPanel>

              </TabContext>
            </Grid>
          </Grid>
        </Div>

      </Div>
    </Grid>
  )
}

