import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Div from '@jumbo/shared/Div';
import HTMLRenderer from 'react-html-renderer'
import { Typography, Card } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import JumboScrollbar from "../../../../../../../client/ui/@jumbo/components/JumboScrollbar/JumboScrollbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#454064"
  },
  dots: {
    bottom: 4,
    fontSize: "30px",
    "& li.slick-active button::before": {
      color: '#24918c'
    },
    "& li": {
      "& button::before": {
        fontSize: '70px',
        color: '#24918c',
        opacity: 0.4
      }
    }
  }
}));

export default function ProgramViewSlider({ lessons }) {

  const topics = lessons?.topics
  const quiz = lessons?.quizs
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosNewIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
    nextArrow: <ArrowForwardIosIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
    dotsClass: `slick-dots ${classes.dots}`,

  };
  const sliderRef = useRef(null);
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [topics]);

  return (
    <>

      <Div sx={{ width: { xs: "100%", sm: "90%" }, margin: 'auto', borderRadius: '50px' }}>
        {(topics?.length != 0) ?
          <Slider ref={sliderRef} {...settings} style={{ borderRadius: '50px' }}  >

            {topics?.map((topic, i) => {
              const sanitizeHTML = (html) => {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const iframes = doc.querySelectorAll('iframe');
                const bodyElement = doc.querySelector('body');
                if (bodyElement) {
                  // Set the style attribute
                  bodyElement.style.backgroundColor = 'white';
                  bodyElement.style.fontSize = '20px';
                  // Add more styles as needed
                }

                iframes.forEach((iframe) => {
                  iframe.setAttribute('allowfullscreen', 'true');
                });

                return doc.documentElement.outerHTML;
              };

              const sanitizedHTML = sanitizeHTML(topic?.topic_content);
              return (
                <Card key={i} sx={{ height: '80vh', p: 3, alignItems: 'center', border: '1px solid #3aafa9' }}  >
                  <JumboScrollbar
                    style={{ minHeight: 480 }}>
                    <Typography variant="h1" sx={{ p: 2, textAlign: 'center', fontWeight: 'bold', color: '#0c8d91', mb: 2 }}>{topic?.topic_name}</Typography>
                    <Div sx={{ width: '90%', margin: 'auto', fontSize: '21px' }}>
                      <HTMLRenderer html={sanitizedHTML} />
                    </Div>
                  </JumboScrollbar>
                </Card>
              )
            })}

          </Slider>

          : <Card
            sx={{
              height: '80vh', p: 4, overflow: 'auto', border: '1px solid #3aafa9',
              alignItems: 'center', borderRadius: '50px'
            }}>
            <Typography variant="h1" sx={{ color: 'white', p: 2, mt: 4, textAlign: 'center', fontWeight: 'bold', textTransform: 'none' }}>No data </Typography>
            <Div>
            </Div>
          </Card>
        }
      </Div>

    </>
  );
}