import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Div from '@jumbo/shared/Div';
import {  Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Markup } from 'interweave';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "#454064"
  },
  dots: {
    bottom: 4,
    fontSize: "30px",
    "& li.slick-active button::before": {
      color: theme.palette.secondary.main
    },
    "& li": {
      "& button::before": {
        fontSize: '70px',
        color: "#fff",
        opacity: 0.5
      }
    }
  }
}));

export default function ProgramListViewSlider({ lessons }) {
  
  const topics = lessons?.topics;

  //const topicContent=  topic?.topic_content? JSON.parse(topic?.topic_content):''
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
  return (
    <>

      <div style={{ width: "75%", margin: 'auto', borderRadius: '50px' }}>
        {(topics?.length != 0) ?
          <Slider  {...settings} style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTuJKB8TahWNNjlc02FsIUVAJWqvhJAk9fjnd0LrDBoITQuw2PeSjrjYo8Ocd40lEwHE&usqp=CAU')", backgroundSize: 'cover', borderRadius: '50px' }}  >

            {topics?.map((topic, i) => (
              <Div key={i} sx={{ height: '80vh', p: 4, overflow: 'auto', color: 'white', alignItems: 'center' }}>
                <Typography variant="h1" sx={{ color: 'white', p: 2, textAlign: 'center', fontWeight: 'bold' }}>{topic?.topic_name}</Typography>
                <Div sx={{ width: '80%', margin: 'auto',color:'white' }}>
                  <Markup content={topic?.topic_content} />
                </Div>
              </Div>

            ))}

          </Slider>

          : <Div
            sx={{
              height: '80vh', p: 4, overflow: 'auto',
              color: 'white', alignItems: 'center',
              backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROTuJKB8TahWNNjlc02FsIUVAJWqvhJAk9fjnd0LrDBoITQuw2PeSjrjYo8Ocd40lEwHE&usqp=CAU')",
              backgroundSize: 'cover', borderRadius: '50px'
            }}>
            <Typography variant="h1" sx={{ color: 'white', p: 2,mt:4, textAlign: 'center', fontWeight: 'bold',textTransform:'none' }}>No data found</Typography>
            <Div>
            </Div>
          </Div>

        }
      </div>

    </>
  );
}