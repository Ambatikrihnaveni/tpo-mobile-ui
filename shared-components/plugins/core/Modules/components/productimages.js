import React, { useState } from 'react';
import { Button, Grid, Typography, Stack, Rating } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import StarIcon from '@mui/icons-material/Star';

const ProductImage = ({ height }) => {
    const module = [

        {
            "id": 1,
            "image": `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsTy4uNsKloQVWzrW1JkhKe2PoXt9HevtScudwvdajXNyhV31rUp1MlV0bDbmVuTQiMi0&usqp=CAU")`,
            "content": "TPO.AI",
            "moduleTitle": "HTML",
            "description": "HTML is the standard markup language for Web pages....",
            "totalLessons": "6 Lessons",
            "rating": 4.6
        },

        {
            "id": 2,
            "image": `url(" https://pixelmechanics.com.sg/wp-content/uploads/2019/04/css.jpg")`,
            "content": " TPO.AI",
            "moduleTitle": "CSS",
            "description": "CSS is the language we use to style an HTML document...",
            "totalLessons": "4 Lessons",
            "rating": 4.3
        },

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
            "image": `url(" https://researchweek.unc.edu/wp-content/uploads/2022/09/python-logo.jpg")`,
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
            "id": 6,
            "image": `url(" https://www.vectorlogo.zone/logos/java/java-ar21.png")`,
            "content": " TPO.AI",
            "moduleTitle": " Java",
            "description": "Java is a popular programming language.....",
            "totalLessons": " 5 Lessons",
            "rating": 4.6
        },

        {
            "id": 7,
            "image": `url(" https://upload.wikimedia.org/wikipedia/commons/c/c1/PHP_Logo.png")`,
            "content": "TPO.AI",
            "moduleTitle": "PHP",
            "description": "PHP is a server scripting language....",
            "totalLessons": " 8 Lessons",
            "rating": 4.6
        },

        {
            "id": 8,
            "image": `url("https://repository-images.githubusercontent.com/200666631/0060c080-d060-11ea-9698-98d89d68fc6d")`,
            "content": "TPO.AI",
            "moduleTitle": "JavaScript",
            "description": "JavaScript is the most popular programming language....",
            "totalLessons": "7 Lessons",
            "rating": 4.6
        },

        {
            "id": 9,
            "image": `url(" https://researchweek.unc.edu/wp-content/uploads/2022/09/python-logo.jpg")`,
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
            "id": 11,
            "image": `url(" https://www.vectorlogo.zone/logos/java/java-ar21.png")`,
            "content": " TPO.AI",
            "moduleTitle": " Java",
            "description": "Java is a popular programming language.....",
            "totalLessons": " 5 Lessons",
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

        <Grid container spacing={4} >
            {module.map((data, i) => (

                <Grid key={i} item
                    onMouseOver={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}>

                    <div style={{ width: "263px" }}>
                        <JumboCardQuick noWrapper >
                            <div className="imageContainer">

                                <div style={{ backgroundImage: `${data.image}`, backgroundSize: "250px", minHeight: "150px" }}>
                                    <div style={{ display: `${isHovered == i ? "block" : 'none'}`, backgroundColor: "rgba(95, 10, 81, 0.7)" }}>

                                        <div style={{ textAlign: 'center', padding: "57px  50px", }}>
                                            <Button variant="contained" sx={{ backgroundColor: 'white', color: "#343635", "&:hover": { color: "white" } }} >Preview</Button>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: "8px" }}>
                                <Typography >Content by <span sx={{ fontWeight: 'bold', color: 'blue' }}> {data.content} </span> </Typography>

                                <Typography variant='h2' sx={{ mt: 1 }} > {data.moduleTitle}</Typography>

                                <Typography sx={{ fontSize: '14px' }}>  {data.description}</Typography>
                                <Grid container sx={{ mt: 2 }} spacing={3} >
                                    <Grid item xs={6} >
                                        <Typography variant='h3' >{data.totalLessons}</Typography>
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Stack direction={"row"} spacing={1} alignItems={'center'}>
                                            <Rating
                                                name="feedback"
                                                value={1}
                                                max={1}
                                                readOnly
                                                precision={1}
                                                size={"medium"}
                                                emptyIcon={<StarIcon />}

                                            />

                                            <Typography
                                                component={'div'}
                                                variant={'body1'}
                                                color={'text.secondary'}
                                                sx={{
                                                    display: 'flex',
                                                    fontSize: 14
                                                }}
                                            >


                                                {data.rating}

                                            </Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </div>
                        </JumboCardQuick>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};
/* Todo height prop define */
export default ProductImage;
