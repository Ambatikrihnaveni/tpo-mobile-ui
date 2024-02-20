import React, { useState } from 'react';
import {  Typography } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import TranslateIcon from '@mui/icons-material/Translate';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import useAuth from '../../../../../hooks/useAuth';

const StudentAddationals = () => {
  const { viewer, data } = useAuth();
  const [links, setLinks] = React.useState([])
  const [languages, setLanguages] = React.useState([])
const [certifications,setCertifications] = React.useState('')
const [accomplishments,setAccomplishments] = React.useState('')
const [additionalInfo,setAdditionalInfo] = React.useState()
  const Languages = []

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };


  React.useEffect(() => {
    if (viewer && viewer?.profile?.additional?.length > 0) {
      for (let i = 0; i < viewer?.profile?.additional?.length; i++) {
        if (viewer?.profile?.additional[i].additionalType == "links") {
          setLinks(viewer?.profile?.additional[i].links)
        } else if (viewer?.profile?.additional[i].additionalType == "languages") {
          setLanguages(viewer?.profile?.additional[i].languages)
        }else if (viewer?.profile?.additional[i].additionalType == "certifications") {
          if(viewer?.profile?.additional[i].certifications.length>0){
            setCertifications(viewer?.profile?.additional[i].certifications[0])
          }
         
        }else if (viewer?.profile?.additional[i].additionalType == "accomplishments") {
          if(viewer?.profile?.additional[i].accomplishments.length>0){
            setAccomplishments(viewer?.profile?.additional[i].accomplishments[0])
          }
         
        } else if (viewer?.profile?.additional[i].additionalType == "additionalInfo") {
          setAdditionalInfo(viewer?.profile?.additional[i].additionalInfo)
        }
      }
    }
  })


  return (

    <div >


      <Typography variant='h2' color="text.secondary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}> Websites, Portfolios, Profiles</Typography>
      {links?.map((link, index) => (
        <div key={index}>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '10px 0',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <LinkIcon sx={{ marginLeft: '20px', color: '#08d1c4' }} />&nbsp;&nbsp;
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: hoveredIndex === index ? 'underline' : 'none',
                textDecorationColor: '#08d1c4',
                courser: 'pointer'

              }}
            >
              {link}
            </a>
          </span>
        </div>
      ))}

      <Typography variant='h2' color="text.secondary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}> Certificates</Typography>
     
        <div dangerouslySetInnerHTML={{ __html: certifications }} style={{marginLeft: '20px',}}/>
         


      <Typography variant='h2' color="text.secondary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}> Languages</Typography>
      {languages?.map((item, index) => (
        <div key={index}>
          <span style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <TranslateIcon sx={{ marginLeft: '20px', color: '#08d1c4' }} /> &nbsp;&nbsp;
            <Typography>
              {item.language}-{item.level}
            </Typography>
          </span>
        </div>

      ))}

      <Typography variant='h2' color="text.secondary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}> Accomplishment</Typography>
      <div dangerouslySetInnerHTML={{ __html: accomplishments }} style={{marginLeft: '20px',}}/>


{/*       <Typography variant='h2' color="text.secondary" sx={{ marginTop: '20px', marginBottom: '20px', marginLeft: '20px' }}> Affiliation</Typography>
 */}      {Languages?.map((item, index) => (
        <div key={index}>
          <span style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <CrisisAlertIcon sx={{ marginLeft: '20px', color: '#08d1c4' }} /> &nbsp;&nbsp;
            <Typography>

            </Typography>
          </span>
        </div>

      ))}


      <Typography variant='h2' color="text.secondary" sx={{ marginTop: '20px', marginLeft: '20px', marginBottom: '20px' }}> Additional Information</Typography>


      <div dangerouslySetInnerHTML={{ __html: additionalInfo}} style={{marginLeft: '20px',}}/>


    </div>
  );
};
/* Todo project props */
export default StudentAddationals;
