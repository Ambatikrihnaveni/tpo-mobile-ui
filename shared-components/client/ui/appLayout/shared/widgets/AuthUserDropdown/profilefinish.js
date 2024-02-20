
import React, { useState } from 'react'
import Div from "@jumbo/shared/Div";
import { Form, Formik, } from "formik";
import Container from '@mui/material/Container';
import {  Grid, Typography } from '@material-ui/core'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles(() => ({
  dropdown: {
    position: 'relative',
    display: 'inline-block',
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#0058ac',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  dropdownIcon: {
    marginLeft: '5px',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '5px',
    marginTop: '5px',
    minWidth: '120px',
  },
  dropdownOption: {
    textDecoration: 'none',
    display: 'block',
    padding: '5px',
    color: '#0058ac',
  },
}));
export default function ProfileFinish({ data, education }) {
           ;;
  const { work, jobtitle, employer, location, startmonth, selectedStartYear, endmonth, selectedEndYear } = data;
  const email = data?.email || "";
  const phonenumber = data?.phonenumber || "";
  const firstname = data?.firstname || "";
  const surname = data?.surname || "";
  const city = data?.city || "";

  const study = education?.study || " ";
  const additional = data?.additional || [];
  const customField = data?.customField || " ";
  const degree = data?.degree || " ";
  const selectedSkills = data?.selectedSkills || [];
  const selectedSummary = data?.selectedSummary || [];
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Formik>
      <Form>
        <Div style={{ marginLeft: '10px' }}>
          <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2.5rem' }}>Review your Resume</h2>
          <p style={{ color: '#475259' }}>Review and make any final changes to your resume. Then download or email yourself a copy and apply for jobs!</p>
          <br />
          <ModeEditIcon style={{ color: '#0058ac' }} />
          <Div sx={{ minHeight: '800px', border: '5px solid white', width: '650px', boxShadow: '1px 1px 2px 2px gray' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3} md={3} style={{ borderRight: 'solid 1px ',height: '803px' }}>
                <Container>

                  <img src='https://png.pngitem.com/pimgs/s/35-350426_profile-icon-png-default-profile-picture-png-transparent.png' height={'150px'} width={'120px'} style={{ marginTop:'20px',marginRight:'10px' }} />
                  
                  <p style={{ color: '#4A4A4A', fontWeight: 'bold', fontStyle: 'italic', paddingTop: '25px', paddingRigtht: '10px', fontSize: 'small' }}>Professional Summary</p>
                  <Typography style={{ color: '#4A4A4A', fontWeight: 'bold', fontStyle: 'italic', paddingTop: '75px', fontSize: 'small' }}>Skills</Typography>
                  <p style={{ color: '#4A4A4A', fontWeight: 'bold', fontStyle: 'italic', paddingTop: '80px', fontSize: 'small' }}>Work History</p>
                  <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>{startmonth} {selectedStartYear} <br /> {endmonth} {selectedEndYear} </Typography>
                  <Typography style={{ color: '#4A4A4A', fontSize: 'small', fontWeight: 'bold', fontStyle: 'italic', paddingTop: '25px' }}>Education</Typography>
                  {education.map((item, index) => (
                    <Typography style={{ color: '#4A4A4A', paddingTop: '10px', paddingBottom: '40px', fontSize: 'small' }}>
                      {item.gradYear}
                    </Typography>))}





                </Container>
              </Grid>
              <Grid item xs={12} sm={8} md={8} style={{  paddingLeft: '30px', }}>
                <h1 style={{ color: '#4A4A4A', fontFamily: 'Georgia, serif', fontSize: '30px', fontStyle: 'italic', fontSize: '20px' }}>
                  {firstname} {surname}
                </h1>
                <Typography style={{ color: '#4A4A4A', fontWeight: '12px', paddingTop: '5px', fontSize: 'small' }}><EmailIcon style={{ fontSize: 'small' }} />{email}</Typography>
                <Typography style={{ color: '#4A4A4A', fontWeight: '12px', fontSize: 'small' }}><LocalPhoneIcon style={{ fontSize: 'small' }} />{phonenumber}</Typography>
                <Typography style={{ color: '#4A4A4A', fontWeight: '12px', fontSize: 'small' }}><LocationOnIcon style={{ fontSize: '15px' }} /> {city.charAt(0).toUpperCase() + city.slice(1)} {data.pincode}</Typography>

                <Typography style={{ color: '#4A4A4A', fontWeight: '10px', paddingTop: '25px', fontSize: 'small' }}> <ul style={{ listStyleType: 'none' }}>
                  {selectedSummary.map((summary, index) => (
                    <React.Fragment key={index}>
                      <li style={{}}>
                        {summary}
                      </li>
                    </React.Fragment>

                  ))}
                </ul></Typography>
                <ul style={{ margin: '20px 5px ', fontSize: 'small' }}> 
                  {selectedSkills.map((skill, index) => (
                    <React.Fragment key={index}>
                      <li >
                        {skill.charAt(0).toUpperCase() +skill.slice(1)}
                      </li>
                    </React.Fragment>

                  ))}
                </ul>

                <ul style={{ margin: '20px 5px ', fontSize: 'small' }}>
                  {additional.map((add, index) => (
                    <React.Fragment key={index}>
                      <li >
                        {add.charAt(0).toUpperCase() +add.slice(1)}
                      </li>
                    </React.Fragment>

                  ))}
                </ul>
                <>
                  {work.map((item, index) => (
                    <React.Fragment key={index} style={{ margin: '7px 2px' }}>
                      <Typography style={{ color: '#4A4A4A', fontWeight: '12px', fontSize: 'small' }}>
                      {(item.jobtitle).charAt(0).toUpperCase() + (item.jobtitle).slice(1)}                      </Typography>
                      <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>
                       {(item.employer).charAt(0).toUpperCase() + (item.employer).slice(1)}
                      </Typography>
                      <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>
                        {item.location}
                      </Typography>
                      <p>{item.startmonth} {item.selectedStartYear} - {item.endmonth && item.selectedEndYear ? (
                        <p>
                          <span className="typography">{item.endmonth} {item.selectedEndYear}</span>
                        </p>
                      ) : (
                        <p>
                          <span className="typography">Currently work here</span>
                        </p>
                      )}
                      </p>
                    </React.Fragment>
                  ))}
                </>
                <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>{jobtitle?.charAt(0).toUpperCase() +jobtitle.slice(1)}</Typography>
                <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>{employer?.charAt(0).toUpperCase() +employer.slice(1)}</Typography>
                <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>{location?.charAt(0).toUpperCase() +location.slice(1)}</Typography>

                <>
                  {education.map((item, index) => (
                    <React.Fragment key={index}>
                      <Typography style={{ color: '#4A4A4A', fontWeight: '12px', padding: '25px 1px 1px 1px', fontSize: 'small' }}>
                        {(item.qualification).charAt(0).toUpperCase() +(item.qualification).slice(1)}
                      </Typography>

                      <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>
                        {(item.schoolname).charAt(0).toUpperCase() +(item.schoolname).slice(1)}, {(item.schoollocation).charAt(0).toUpperCase() +(item.schoollocation).slice(1)}
                      </Typography>
                      <Typography style={{ color: '#4A4A4A', fontSize: 'small' }}>
                        {(item.study).charAt(0).toUpperCase() +(item.study).slice(1)} - {item.score}
                      </Typography>


                    </React.Fragment>
                  ))}
                </>
              </Grid>
            
            </Grid>
          </Div>
        </Div>
      </Form>
    </Formik>

  )
}
