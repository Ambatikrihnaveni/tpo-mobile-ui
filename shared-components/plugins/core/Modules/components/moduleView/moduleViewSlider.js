import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Div from '@jumbo/shared/Div';
import HTMLRenderer from 'react-html-renderer'
import { Typography, Card } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import JumboScrollbar from "../../../../../client/ui/@jumbo/components/JumboScrollbar/JumboScrollbar";




const useStyles = makeStyles((theme, reset) => ({
  root: {
    background: "#454064"
  },
  dots: {
    bottom: 4,
    fontSize: "30px",
    "& li.slick-active button::before": {
      color: "#24918c"
    },
    "& li": {
      "& button::before": {
        fontSize: '70px',
        color: "#24918c",
        opacity: 0.4
      }
    }

  }
}));

export default function ModuleViewSlider({ lesson, module, onLesson, onClose }) {

  const lessons = module?.lessons
  const topics = lesson?.topics
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  //const topicContent=  topic?.topic_content? JSON.parse(topic?.topic_content):''
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [text, setText] = useState("");



  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

 



  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    // lazyLoad:'progressive',
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


  const sanitizeHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const iframes = doc.querySelectorAll('iframe');
    const bodyElement = doc.querySelector('body');

    // Check if the body element is found before manipulating it
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

  const sanitizedHTML = sanitizeHTML((topics?.length > 0) ? topics[0]?.topic_content : '');


  

  return (
    <>
      <Div sx={{ width: { xs: '100%', sm: "90%" }, margin: 'auto', borderRadius: '50px' }}>
        {topics?.length > 0 ? (
          topics.length === 1 ? (
            <>
              <Card sx={{ height: '80vh', p: 3, alignItems: 'center', border: '1px solid #3aafa9' }}  >
                <JumboScrollbar
                  style={{ minHeight: 400 }}>
                  <Typography variant="h1" style={{ padding: 2, textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
                    {topics[0]?.topic_name}
                  </Typography>

                  <div style={{ width: '90%', margin: 'auto', fontSize: '21px' }}>

                    <HTMLRenderer html={sanitizedHTML} />
                  </div>
                </JumboScrollbar>
              </Card>
            </>
          ) : topics.length > 1 ? (

            <Slider ref={sliderRef} {...settings} >

              {topics.map((topic, i) => {

                const sanitizeHTML = (html) => {
                  const doc = new DOMParser().parseFromString(html, 'text/html');
                  const iframes = doc.querySelectorAll('iframe');
                  const bodyElement = doc.querySelector('body');

                  // Check if the body element is found before manipulating it
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
                      autoHeightMin={30}
                      style={{ minHeight: 500 }}>
                      <Typography variant="h1" style={{ padding: 2, textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
                        {topic?.topic_name}
                      </Typography>
                      <Div style={{ width: '90%', margin: 'auto', fontSize: '21px' }}>
                        {/*   <div dangerouslySetInnerHTML={{__html:topic?.topic_content}} /> */}
                        <HTMLRenderer html={sanitizedHTML} />
                      </Div>
                    </JumboScrollbar>
                  </Card>

                )
              })}

            </Slider>

          ) : (
            <Card sx={{ height: '80vh', p: 3, alignItems: 'center', border: '1px solid #3aafa9' }}  >
              <Typography variant="h1" style={{ padding: 2, marginTop: 4, textAlign: 'center', fontWeight: 'bold', textTransform: 'none' }}>
                No Data Found
              </Typography>
            </Card>
          )
        ) : (
          // If topics array is empty, render "No Data Found" message
          <Card sx={{ height: '80vh', p: 3, alignItems: 'center', border: '1px solid #3aafa9' }}  >
            <Typography variant="h1" style={{ padding: 2, marginTop: 4, textAlign: 'center', fontWeight: 'bold', textTransform: 'none' }}>
              No Data Found
            </Typography>
          </Card>
        )}
      </Div >

    </>
  )
}