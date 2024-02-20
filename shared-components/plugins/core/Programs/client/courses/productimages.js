import React, { useState } from 'react';
import { Button, ButtonGroup } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Grid, Typography } from '@material-ui/core';
import StarIcon from '@mui/icons-material/Star';


const ProductImage = ({ height }) => {
    const module = [


        {
            "id": 3,
            "image": `url("https://repository-images.githubusercontent.com/200666631/0060c080-d060-11ea-9698-98d89d68fc6d")`,
            "content": "TPO.AI",
            "moduleTitle": "JavaScript",
            "description": "JavaScript is the  most popular programming language....",
            "totalLessons": "7 Lessons",
            "rating": 4.6
        },

        {
            "id": 4,
            "image": `url(" https://i.pinimg.com/originals/a2/6c/4b/a26c4b485716a585073da2af4328a8cd.jpg")`,
            "content": "TPO.AI",
            "moduleTitle": "Pyhton",
            "description": "Python is a popular programming language....",
            "totalLessons": " 8 Lessons",
            "rating": 4.6
        },

        {
            "id": 5,
            "image": `url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
            "content": "TPO.AI",
            "moduleTitle": "Node js",
            "description": "Node.js is an open source server environment.... ",
            "totalLessons": " 7 Lessons",
            "rating": 4.6
        },




        {
            "id": 9,
            "image": `url(" https://i.pinimg.com/originals/a2/6c/4b/a26c4b485716a585073da2af4328a8cd.jpg")`,
            "content": " TPO.AI",
            "moduleTitle": "Pyhton",
            "description": "Python is a popular programming language....",
            "totalLessons": " 8 Lessons",
            "rating": 4.6
        },

        {
            "id": 10,
            "image": `url(" https://miro.medium.com/max/750/0*3P4WhyFtuwCV5nTa.jpg")`,
            "content": " TPO.AI",
            "moduleTitle": "Node js",
            "description": "Node.js is an open source server environment.... ",
            "totalLessons": " 7 Lessons",
            "rating": 4.6
        },



        {
            "id": 12,
            "image": `url("https://upload.wikimedia.org/wikipedia/commons/c/c1/PHP_Logo.png")`,
            "content": " TPO.AI",
            "moduleTitle": "PHP",
            "description": "PHP is a server scripting language....",
            "totalLessons": " 8 Lessons",
            "rating": 4.6
        }

    ];


    const [isHovered, setHover] = useState(-1);

    return (

        <Grid container spacing={3.25}  >
            {module.map((data, i) => (

                <Grid key={i} item xs={8} md={4} lg={3} sx={{ m: 1 }}
                    onMouseOver={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}>

                    <div style={{ width: "263px" }}>
                        <JumboCardQuick noWrapper sx={{ mb: 4, ml: 1, mr: 1, mt: 2 }}>
                            <div
                                className="imageContainer"

                            >
                                <div style={{ backgroundImage: `${data.image}`, backgroundSize: "250px", minHeight: "150px" }}>
                                    <div className='button' style={{ display: `${isHovered == i ? "block" : 'none'}` }}> <Button variant="contained" style={{ backgroundColor: 'white', padding: '5px' }} > <a href="#"> Preview</a></Button></div>
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
                                <Typography variant={"h5"} style={{ paddingLeft: '10px' }}>Content by <span style={{ fontWeight: 'bold', color: 'blue' }}> {data.content} </span>

                                </Typography>

                                <div style={{ marginTop: '15px', marginLeft: '-150px' }}>
                                    <h3 style={{ fontSize: '25px', fontWeight: 'bold' }}> {data.moduleTitle}</h3>
                                </div>


                            </ButtonGroup>

                            <h5 style={{ marginTop: '-90px', paddingLeft: '8px' }}>  {data.description}</h5>
                            <Grid container spacing={7} style={{ marginTop: '-15px' }}>
                                <Grid item xs={6} >
                                    <h4>{data.totalLessons}</h4>
                                </Grid>
                                <Grid item xs={6} >
                                    <StarIcon style={{ color: 'blue', marginTop: '13px', marginLeft: '35px' }} />{data.rating}
                                </Grid>
                            </Grid>

                        </JumboCardQuick>
                    </div>
                </Grid>
            ))}


        </Grid>
    );
};
/* Todo height prop define */
export default ProductImage;
