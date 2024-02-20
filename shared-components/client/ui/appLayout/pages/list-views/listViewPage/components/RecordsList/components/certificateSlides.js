import React from 'react'
import Div from '@jumbo/shared/Div';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, IconButton,Grid ,Dialog,DialogTitle,DialogActions } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function CertificateSlides({ open, handleClose, certificates, setSelectCertificate }) {
    const [temp, setTemp] = React.useState(null)
    const settings = {
        dots: true,
        infinite: true,
        centerPadding: "50px",
        speed: 500,
        slidesToShow: 3,
        swipeToSlide: true,
        slidesToScroll: 1,
        prevArrow: <ArrowBackIosNewIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
        nextArrow: <ArrowForwardIosIcon color="primary" sx={{ fontSize: '25px', fontWeight: "600" }} />,
        // dotsClass: `slick-dots ${classes.dots}`,

    };

    const onTempClick = (data) => {
        setTemp(data)
        setSelectCertificate(data)
    }

    return (
        <Dialog onClose={handleClose} open={open}
            sx={{
                "& .MuiDialog-container": {
                    "& .MuiPaper-root": {
                        width: "1200px",
                        maxWidth: "1200px",
                        borderRadius: '15px'
                        // Set your width here
                    },
                },
            }}
        >
            <DialogTitle>Select  Certificate</DialogTitle>
            <Div sx={{ width: '800px', margin: 'auto', p: 2, }}>
                <Slider {...settings} >
                    {certificates?.map((data, i) => (
                        <div>
                        <Div key={i}
                            sx={{
                                background: `url(${data.templateImage})`,
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
                                verticalAlign: 'middle'
                            }}
                            onClick={() => onTempClick(data, i)}>
                            <Div sx={{ width: '200px', height: '150px', verticalAlign: 'middle', background: 'rgba(0,0,0,0.6)', display: data?.templateImage == temp?.templateImage ? "block" : "none" }}>
                                <IconButton sx={{ textAlign: 'center', mt: 6 }}><CheckCircleOutlineIcon color="success" sx={{ fontSize: '50px', fontWeight: "bolder" }} /></IconButton>
                            </Div>
                        </Div>
                        </div>
                    ))}
                </Slider>

            </Div>
           <Div
           sx={{
            background: `url(${temp?.templateImage})`,
            backgroundSize: 'cover',
            width: '800px',
            minHeight: '550px',
            boxShadow: '3px 5px  8px rgba(0,0,0,0.3)',
            margin:'auto'
           }}
           ></Div>
            <DialogActions>
          <Button variant='contained' sx={{mb:3}} onClick={handleClose}>Ok</Button>
        
        </DialogActions>
        </Dialog>
    )
}
