import React, { useState } from 'react';
import { Button, ButtonGroup,  Grid, Typography } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import StarIcon from '@mui/icons-material/Star';
import './cards.css'

const Cards = ({ height, programsData }) => {
    const [buttonText, setButtonText] = useState([]);
    const handleClick = (item) => {
        programsData(item)
        if (buttonText.includes(item.id)) {
            setButtonText(buttonText.filter((id) => id !== item.id));
        } else {
            setButtonText([...buttonText, item.id]);
        }
    };

  
    const module = [


        {
            "id": 1,
            "image": `url("https://www.wur.nl/upload_mm/1/0/4/74f0628e-7351-4812-b6e8-af6883c7648e_laptop%20en%20boek_digitale_bibliotheek_eb8e4305_750x400.jpg")`,
            "content": "TPO.AI",
            "moduleTitle": "Effective email",
            "description": "Explore email best practices and tips to up your communication game!",
            "totalLessons": " 8 Lessons",
            "rating": 4.5,
        },

        {
            "id": 2,
            "image": `url("https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/157261547/original/18ea018ffe18afbe836bd2c409c0a11c7ce71e10/reate-or-review-stem-online-learning-modules-for-you.png")`,
            "content": "TPO.AI",
            "moduleTitle": "The Future of work",
            "description": "This course covers the different trends that can be applied by leaders and...",
            "totalLessons": " 7 Lessons",
            "rating": 4.6,
        },

        {
            "id": 3,
            "image": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Iw_VpynotOfrVzdK7Sbz6HYzXRrEVYnD_6ezYah1HsuCezHtm6yByDO6jgzA-EAehIs&usqp=CAU")`,
            "content": " TPO.AI",
            "moduleTitle": "English",
            "description": "Are you starting out as a freelancer and lokking to work in the international...",
            "totalLessons": " 5 Lessons",
            "rating": 4.8,
        },
        {
            "id": 4,
            "image": `url("https://www.wur.nl/upload_mm/1/0/4/74f0628e-7351-4812-b6e8-af6883c7648e_laptop%20en%20boek_digitale_bibliotheek_eb8e4305_750x400.jpg")`,
            "content": "TPO.AI",
            "moduleTitle": "Effective email",
            "description": "Explore email best practices and tips to up your communication game!",
            "totalLessons": " 8 Lessons",
            "rating": 4.1,
        },

        {
            "id": 5,
            "image": `url("https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/157261547/original/18ea018ffe18afbe836bd2c409c0a11c7ce71e10/reate-or-review-stem-online-learning-modules-for-you.png")`,
            "content": "TPO.AI",
            "moduleTitle": "The Future",
            "description": "This course covers the different trends that can be applied by leaders and...",
            "totalLessons": " 7 Lessons",
            "rating": 5.6,
        },

        {
            "id": 6,
            "image": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Iw_VpynotOfrVzdK7Sbz6HYzXRrEVYnD_6ezYah1HsuCezHtm6yByDO6jgzA-EAehIs&usqp=CAU")`,
            "content": " TPO.AI",
            "moduleTitle": "English",
            "description": "Are you starting out as a freelancer and lokking to work in the international...",
            "totalLessons": " 5 Lessons",
            "rating": 4.6,
        },

    ];
    const [isFavorite, setIsFavorite] = useState(true);
    const [inCart, setInCart] = useState(false);


    const [isHovered, setHover] = useState(-1);

    return (

        <Grid container  >
            {module.map((data, i) => (

                <Grid key={i} item
                >

                    <div style={{ width: "270px" }}>
                        <JumboCardQuick noWrapper sx={{ mb: 4, ml: 1, mr: 1, mt: 2 }}
                            onMouseOver={() => setHover(i)}
                            onMouseLeave={() => setHover(-1)}

                        >
                            <div
                                className="imageContainer"

                            >
                                <div style={{ backgroundImage: `${data.image}`, backgroundSize: "250px", minHeight: "160px" }}>
                                    {buttonText.includes(data.id) && (
                                        <div className="checkmark">
                                            <span>&#10003;</span>
                                        </div>
                                    )}
                                    <div style={{ display: `${isHovered == i ? "block" : 'none'}` }}>
                                        <div class="container">
                                            <div class="round">
                                                <input type="checkbox" id="checkbox"
                                                    checked={buttonText.includes(data.id)}
                                                    onChange={() => { }} />
                                                {/* <label for="checkbox"></label> */}
                                            </div>
                                        </div>
                                        <div className='button'>
                                            <Button style={{ backgroundColor: 'white', padding: '5px', marginRight: '3px' }} > Preview</Button>
                                            <Button onClick={() => handleClick(data)}
                                                style={{ backgroundColor: 'white', padding: '5px', marginLeft: '3px' }} >
                                                {buttonText.includes(data.id) ? "Unselect" : "Select"}</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ButtonGroup
                                fullWidth
                                size="large"
                                variant={"text"}
                                sx={{
                                    height: 170,
                                    '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                                        border: "none"
                                    }
                                }}
                            >
                                <Typography variant={"h5"} style={{ paddingLeft: '8px', paddingTop: '5px' }}>Content by <span style={{ fontWeight: 'bold', color: 'blue' }}> {data.content} </span>

                                </Typography>
                                <Typography variant={'h5'} style={{ fontSize: '20px', fontWeight: 'bold', paddingTop: '50px', marginLeft: '-154px' }}>
                                    {data.moduleTitle}
                                </Typography>

                            </ButtonGroup>
                            <Typography variant={'h5'} style={{ marginTop: '-90px', paddingLeft: '10px' }}>
                                {data.description}
                            </Typography>
                            <Grid container spacing={7} style={{ marginTop: '0px' }}>
                                <Grid item xs={6} >
                                    <h4 style={{ paddingLeft: '10px', marginTop: "-10px" }}>{data.totalLessons}</h4>
                                </Grid>
                                <Grid item xs={6} >
                                    <StarIcon style={{ color: 'blue', marginTop: '-25px', marginLeft: '35px' }} />{data.rating}
                                </Grid>
                            </Grid>

                        </JumboCardQuick>
                    </div>
                </Grid>
            ))}


        </Grid>
    );
};
export default Cards;
