import React from 'react'
import RecommendedjobCard from './recommendedjobscard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { makeStyles, Grid, } from "@material-ui/core";
import Div from "@jumbo/shared/Div";


const dummyData = [
    {
        title: 'Software Engineer',
        team: "Maximoz Team",
        program: "Database Programmer",
        postedon: 'june 10, 2023',
        price: " ₹ 560",
        img: "https://img.freepik.com/premium-photo/harmonious-symphony-abstract-multicolored-artistry_968519-1949.jpg",
        location: 'California, US',
        Decription: 'A Software Engineer is an IT professional who designs. The Indian rupee sign is the currency symbol for the Indian..'
    },
    {
        title: 'Software Developer',
        team: "Colo Colo Studios",
        program: "Intern Programmer",
        price: " ₹ 400",
        img: "https://img.freepik.com/premium-photo/planets-galaxy-science-fiction-wallpaper-beauty-deep-space_877354-95.jpg",
        postedon: 'january 8, 2023',
        location: 'Los Angeles, US',
        Decription: 'A Software Developer is an IT professional who develops The Indian rupee sign is the currency symbol for the Indian...'
    },
    {
        title: 'Backend Developer',
        team: "Kleanify Ltd",
        price: " ₹ 200",
        img: "https://img.freepik.com/free-photo/peaceful-view-sunset-light_23-2148851752.jpg",
        program: "PHP Programmer",
        postedon: 'February 12, 2023',
        location: 'Alaska, US',
        Decription: 'A Backend Developer is an IT professional who designs The Indian rupee sign is the currency symbol for the Indian...'
    },
    {
        title: 'Software Developer',
        team: "Colo Colo Studios",
        price: " ₹ 150",
        program: "Intern Programmer",
        img: "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg",
        postedon: 'january 8, 2023',
        location: 'Los Angeles, US',
        Decription: 'A Software Developer is an IT professional who develops The Indian rupee sign is the currency symbol for the Indian...'
    },
    {
        title: 'Backend Developer',
        team: "Kleanify Ltd",
        price: " ₹ 780",
        program: "PHP Programmer",
        img: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg",
        postedon: 'February 12, 2023',
        location: 'Alaska, US',
        Decription: 'A Backend Developer is an IT professional who designs The Indian rupee sign is the currency symbol for the Indian...'
    },
];
const useStyles = makeStyles((theme) => ({
    root: {
        background: "#454064"
    },
    dots: {
        bottom: -90,
        fontSize: "20px",
        "& li.slick-active button::before": {
            color: theme.palette.secondary.main
        },
        "& li": {
            "& button::before": {
                fontSize: '20px',
                color: "#0aa0ab",
                opacity: 0.5
            }
        }
    }
}));

export default function RecommendedJobs() {

    const classes = useStyles();
    const settings = {
        className: "center",
        infinite: true,
        dots: true,
        slidesToShow: 1,
        swipeToSlide: true,
        afterChange: function (index) {
            console.log(
                `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
            );
        },
        prevArrow: <ArrowBackIosNewIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
        nextArrow: <ArrowForwardIosIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
        dotsClass: `slick-dots ${classes.dots}`,

    };

    return (
        <Div className="container">
            <Grid container spacing={1} alignItems='center' justifyContent='center'>
                <Grid item xs={12} sm={11} md={10}>
                    <Slider {...settings}>
                        {dummyData.map((jobPosting, index) => (
                            <div key={index} >
                                <RecommendedjobCard jobPosting={jobPosting} />
                            </div>
                        ))}
                    </Slider>
                </Grid>
            </Grid>
        </Div>
    )
}
