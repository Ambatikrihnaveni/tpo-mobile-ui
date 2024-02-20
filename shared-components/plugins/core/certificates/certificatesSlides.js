import React from 'react';
import './certificate.css';
import Div from '@jumbo/shared/Div';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Certificate from './TP_certificate/components/certificate';




export default function CertificatesSlides({ preview, certifiTemp, template, templates, onSelectTemp }) {
  



  const settings = {
    dots: true,
    infinite: true,
    centerPadding: "60px",
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosNewIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
    nextArrow: <ArrowForwardIosIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
    className:'styles'
    // dotsClass: `slick-dots ${classes.dots}`,

  };




  const onTempClick = (data, i) => {
    onSelectTemp(data,i)
  }

  return (
    <Div>

      <Div sx={{ width: '800px', margin: 'auto', p: 2, display: preview ? "none" : 'block' }}>
        <Slider {...settings} >
          {templates?.map((data, i) => (
            <div>
            <Div key={i}
              sx={{
                background: `url(${data.sample})`,
                backgroundSize: 'cover',
                width: '200px',
                height: '150px',
                ':hover': {
                  boxShadow: '3px 5px  8px rgba(0,0,0,0.3)',
                  marginBottom:'3px'
                },
                cursor: 'pointer',
                transition: '0.5s',
                textAlign: 'center',
                verticalAlign: 'middle',
                margin:'10px'
              }}
              onClick={() => onTempClick(data, i)}>
              <Div sx={{ width: '200px', height: '150px', verticalAlign: 'middle', background: 'rgba(0,0,0,0.6)', display: data.template == template ? "block" : "none" }}>
                <IconButton sx={{ textAlign: 'center', mt: 6 }}><CheckCircleOutlineIcon color="success" sx={{ fontSize: '50px', fontWeight: "bolder" }} /></IconButton>
              </Div>
            </Div>
            </div>
          ))}
        </Slider>

      </Div>
      <Div sx={{mt:2}}>
     <Certificate certifiTemp={certifiTemp} template={template}/>
     </Div>
    
    </Div>
  )
}
