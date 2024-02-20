import React, { useState, useRef } from 'react'
import Div from "@jumbo/shared/Div";
import { Form, Formik,  } from "formik";
import { Popover, Button } from "@mui/material";
import {Grid, Typography } from '@material-ui/core'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { makeStyles } from '@material-ui/core/styles';
import DownloadIcon from '@mui/icons-material/Download';
import { usePDF, Margin } from 'react-to-pdf'
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { IconButton } from '@mui/material';
import useAuth from '../../../../hooks/useAuth';
import HTMLtoDOCX from "html-to-docx";

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
export default function Finish({ data, education }) {
  const exportRef = useRef(null);
  const [downloadType, setDownloadType] = useState(null); // State to track selected download type (PDF or DOC)
  const { toPDF, targetRef } = usePDF({
    filename: data?.firstname + " " + "Resume.pdf",
    page: { margin: Margin.MEDIUM }
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Define a simple InspectModule (this is a simplified example)
  function InspectModule() {
    return {
      getAllTags: function () {
        return { tag1: "value1", tag2: "value2" };
      },
    };
  }

  const handleDownload = async () => {
    if (downloadType === 'pdf') {
      // Generate PDF from the div content
      toPDF(targetRef, { margin: Margin.MEDIUM })
        .then((blob) => {
          // Save the Blob as a PDF file
          FileSaver.saveAs(blob, `${data?.firstname} Resume.pdf`);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else if (downloadType === 'doc') {
      const htmlContent = targetRef.current.innerHTML;

      const output = await HTMLtoDOCX(htmlContent);
      // Assuming your output is stored in a variable called "output"
      const blob = new Blob([output], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);

      // Create a download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data?.firstname} Resume.docx`; // Set the desired file name
      a.textContent = 'Download the file';
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Clean up by removing the download link and revoking the object URL
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    handleClose();
  };

  const { viewer } = useAuth()
  const additional = viewer?.profile?.additional
  const { work } = data;
  const email = data?.email || "";
  const phonenumber = data?.phonenumber || "";
  const firstname = data?.firstname || "";
  const surname = data?.surname || "";
  const city = data?.city || "";
  const bio = data?.bio || "";
  const jobtitle = work?.jobtitle || " ";
  const location = work?.location || " ";
  const employer = work?.employer || " ";
  const endmonth = work?.endmonth || " ";
  const startmonth = work?.startmonth || " ";
  const description = work?.description || ""
  const selectedStartYear = work?.selectedStartYear || " ";
  const selectedEndYear = work?.selectedEndYear || " ";
  const study = education?.study || " ";
  const customField = data?.customField || " ";
  const degree = data?.degree || " ";
  const selectedSkills = data?.selectedSkills || [];
  const selectedSummary = data?.selectedSummary || [];
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const skills = data?.skillsList || []
  const accomplishments = []
  const languages = []
  const certifications = []
  let additionalInfo = ""
  const link = []
  for (let i = 0; i < additional?.length; i++) {
    if (additional[i]?.additionalType == "links") {
      link.push(additional[i]?.links)
    } else if (additional[i]?.additionalType == "languages") {
      languages.push(additional[i]?.languages)
    } else if (additional[i]?.additionalType == "accomplishments") {
      accomplishments.push(additional[i].accomplishments)
    } else if (additional[i]?.additionalType == "certifications") {
      certifications.push(additional[i]?.certifications)
    } else if (additional[i]?.additionalType == "additionalInfo") {
      additionalInfo += additional[i]?.additionalInfo
    } else {
      return null
    }
  }
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Formik>
      <Form>
        <Div >
          <Div sx={{ textAlign: 'center' }}>
            <h2 style={{ width: '100%', color: '#475259', fontFamily: '"Domine",Georgia,serif', fontFamily: '"Domine",Georgia,serif', marginBottom: '10px', fontWeight: '700', fontSize: '2rem' }}>Review your Resume</h2>
            <p style={{ color: '#475259' }}>Review and make any final changes to your resume. Then download or email yourself a copy and apply for jobs!</p>
            <br />
          </Div>
          <Div sx={{ margin: 'auto', overflowX: 'scroll' }}>
            <Div sx={{ width: '750px', margin: 'auto' }}>
              <ModeEditIcon style={{ color: '#0058ac' }} />
              <IconButton onClick={handleClick}>
                <DownloadIcon />
              </IconButton>

              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setDownloadType('pdf'); // Set the download type to PDF
                      handleDownload();
                    }}
                  >
                    Download as PDF
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setDownloadType('doc'); // Set the download type to DOC
                      handleDownload();
                    }}
                    style={{ marginTop: '8px' }}
                  >
                    Download as DOC
                  </Button>
                </div>
              </Popover>
            </Div>
            <Div sx={{ minHeight: '800px', border: '5px solid white', width: '750px', boxShadow: '1px 1px 2px 2px gray', padding: '20px', margin: 'auto', fontSize:'30px' }} ref={targetRef}>
              <Grid container spacing={2} style={{ border: '1px solid gray', padding: '20px' }}>

                <Grid item xs={12}>
                  <h1 style={{
                    color: 'black', fontFamily: 'Georgia, serif', fontSize: '30px', fontStyle: 'italic', fontSize: '20px', // Use flexbox
                    textAlign: 'center', marginTop: '-20px'
                  }}>
                    {firstname} {surname}
                  </h1>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '-10px', }}>
                  <Grid container spacing={2} style={{ borderBottom: '2px solid black' }}>
                    <Grid item xs={4}>

                      <Typography style={{ color: 'black', fontWeight: '15px', fontFamily: 'Georgia, serif', fontSize: '18px', }}> {city.charAt(0).toUpperCase() + city.slice(1)} {data.pincode}</Typography>
                    </Grid>
                    <Grid item xs={4}>

                      <Typography style={{ color: 'black', fontWeight: '15px', fontFamily: 'Georgia, serif', fontSize: '18px', }}>{email}</Typography>
                    </Grid>
                    <Grid item xs={4}>

                      <Typography style={{ color: 'black', fontWeight: '15px', fontFamily: 'Georgia, serif', fontSize: '18px', marginLeft: '55px' }}>{phonenumber}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} >
                  <div dangerouslySetInnerHTML={{ __html: bio }} style={{ color: 'black', fontSize: '18px' }} />
                </Grid>
                <Grid item xs={12} >
                  {education && education?.length > 0 && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '18px', border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Education</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <>
                          {education?.map((item, index) => (
                            <React.Fragment key={index}>
                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '18px', }}>
                                {(item.qualification).charAt(0).toUpperCase() + (item.qualification).slice(1)}
                              </Typography>

                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '18px', }}>
                                {(item.schoolname).charAt(0).toUpperCase() + (item.schoolname).slice(1)}, {(item.schoollocation).charAt(0).toUpperCase() + (item.schoollocation).slice(1)}
                              </Typography>
                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '18px', }}>
                                {(item.study).charAt(0).toUpperCase() + (item.study).slice(1)} - {item.score} %
                              </Typography>
                              <br />
                            </React.Fragment>
                          ))}
                        </>
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                {skills && skills?.length > 0 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '18px', border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Technical Skills</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <>
                        {skills?.map((item, index) => (
                          <ul style={{ margin: '20px 5px ', fontSize: 'small' }}>
                            <React.Fragment key={index} >
                              <li style={{ display: 'flex', gap: '20px' }}>
                                <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '18px', }}>{
                                  item?.skill
                                }
                                </Typography>
                                <Rating
                                  name="text-feedback"
                                  value={item.rating}
                                  readOnly
                                  precision={item.rating}
                                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                              </li>
                            </React.Fragment>
                          </ul>
                        ))}
                      </>
                    </Grid>
                  </Grid>
                )}
                {work && work?.length > 0 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '18px', border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Internships/Projects</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <>
                        {work?.map((item, index) => (
                          <React.Fragment key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 'bold' }}>
                                {(item.jobtitle)?.charAt(0).toUpperCase() + (item.jobtitle).slice(1)}, {(item.employer)?.charAt(0).toUpperCase() + (item.employer).slice(1)}, {item.location}
                              </Typography>
                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 'bold' }}>
                                {item.selectedStartYear || item.startmonth ? `${item.startmonth} ${item.selectedStartYear}` : 'Present'} - {item.selectedEndYear || item.endmonth ? `${item.endmonth} ${item.selectedEndYear}` : 'Present'}
                              </Typography>
                            </div>
                            <Typography style={{ color: 'black',fontFamily: 'Georgia, serif', fontSize: '18px', }}>
                              {item.description}
                            </Typography>
                            <br />
                          </React.Fragment>
                        ))}
                      </>
                    </Grid>
                  </Grid>
                )}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '18px',border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Accomplishments</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <>
                      {accomplishments[0]?.map((item, index) => (
                        <React.Fragment key={index}>
                          <div dangerouslySetInnerHTML={{ __html: item }} style={{ color: 'black',fontSize: 'medium', }} />
                        </React.Fragment>
                      ))}
                    </>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '18px', border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Certifications</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <>
                      {certifications[0]?.map((item, index) => (
                        <React.Fragment key={index}>
                          <div dangerouslySetInnerHTML={{ __html: item }} style={{ color: 'black', fontSize: 'medium' }} />
                        </React.Fragment>
                      ))}
                    </>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '20px',border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Languages</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <>
                      {languages[0]?.map((item, index) => (
                        <ul style={{ margin: '20px 5px ', fontSize: 'small' }}>
                          <React.Fragment key={index}>
                            <li style={{ display: 'flex', gap: '20px' }}>
                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '18px', }}>
                                {(item.language)?.charAt(0).toUpperCase() + (item.language)?.slice(1)}
                              </Typography>
                              <Typography style={{ color: 'black', fontFamily: 'Georgia, serif', fontSize: '18px', }}>{item.level}</Typography>
                            </li>
                          </React.Fragment>
                        </ul>
                      ))}
                    </>
                  </Grid>
                </Grid>

                {additionalInfo && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography style={{ color: 'black', fontWeight: 'bold', fontFamily: 'Georgia, serif', fontSize: '18px', border: '1px solid black', backgroundColor: 'gray', paddingLeft: '10px' }}>Additional Information</Typography>
                    </Grid>
                    <Grid item xs={12}>

                      <div dangerouslySetInnerHTML={{ __html: additionalInfo }} style={{ color: 'black', fontSize: 'medium' }} />

                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Div>
          </Div>
        </Div>
      </Form>
    </Formik >

  )
}
