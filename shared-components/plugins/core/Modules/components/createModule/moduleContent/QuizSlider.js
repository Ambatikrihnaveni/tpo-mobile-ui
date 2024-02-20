import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Radio, FormControl, FormControlLabel, Typography } from "@mui/material";
import Div from "../../../../../../client/ui/@jumbo/shared/Div";
import { Theme, makeStyles } from "@material-ui/core";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = makeStyles((theme, reset) => ({
  root: {
    background: "#454064",
  },
  dots: {
    bottom: 4,
    fontSize: "20px",
    "& li.slick-active button::before": {
      color: "white",
    },
    "& li": {
      "& button::before": {
        fontSize: "70px",
        color: "#fff",
        opacity: 0.5,
      },
    },
  },
}));

const quizSliderStyle = {
  backgroundImage:
    "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR09h-AQzQLgtKNVX9uxoZBo5M1sgZyReubaA&usqp=CAU')",
  backgroundSize: "cover",
  borderRadius: "50px",
  padding: "20px",
  height: "700px",
};

export default function QuizSlider() {
  const [selectedOption, setSelectedOption] = useState(""); // State to store the selected option
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const classes = useStyles();

  const quizQuestions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
    },
    // Add more quiz questions here
  ];

  // Function to handle option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowBackIosNewIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
    nextArrow: <ArrowForwardIosIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600"}} />,
    dotsClass: `slick-dots ${classes.dots}`,
  };
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, []);

  return (
    <Div sx={{ width: { xs: "100%", sm: "75%" }, margin: "auto", borderRadius: "50px", mt: 10 }}>
      <div style={quizSliderStyle}>
        <Slider {...settings}>
          {quizQuestions.map((quizQuestion, index) => (
            <div key={index}>
              <Typography variant="h5">{quizQuestion.question}</Typography>
              <FormControl component="fieldset">
                {quizQuestion.options.map((option, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                ))}
              </FormControl>
            </div>
          ))}
        </Slider>
      </div>
    </Div>
  );
}
