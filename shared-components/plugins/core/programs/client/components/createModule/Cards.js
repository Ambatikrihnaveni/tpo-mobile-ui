import React, { useState } from 'react';
import { Button, ButtonGroup, Grid, Typography } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import StarIcon from '@mui/icons-material/Star';
import './cards.css'

const { filesBaseUrl } = Meteor.settings.public;

const Cards = ({ handleToggle, module }) => {

    const [buttonText, setButtonText] = useState([]);;
    const [isHovered, setHover] = useState(-1);

    const handleClick = (itemId) => {

        handleToggle(itemId)
        if (buttonText.includes(itemId)) {
            setButtonText(buttonText.filter((id) => id !== itemId));
        } else {
            setButtonText([...buttonText, itemId]);
        }
    };

    return (

        <Grid container  >
            {module?.map((data, i) => (

                <Grid key={i} item
                    onMouseOver={() => setHover(i)}
                    onMouseLeave={() => setHover(-1)}>

                    <div style={{ width: "263px" }}>
                        <JumboCardQuick noWrapper sx={{ mb: 4, ml: 1, mr: 1, mt: 2 }}>
                            <div
                                className="imageContainer"

                            >
                                <div style={{ backgroundImage: `url(${filesBaseUrl}${data.media[0]?.URLs?.small})`, backgroundSize: "250px", minHeight: "137px" }}>
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
                                                <label for="checkbox"></label>
                                            </div>
                                        </div>
                                        <div className='button'>

                                            <Button onClick={() => handleClick(data.id)}
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
                                <Typography variant={"h5"} style={{ paddingLeft: '8px', paddingTop: '5px', marginLeft: "3px" }}>Content by <span style={{ fontWeight: 'bold', color: 'blue' }}> TPO.AI </span>

                                </Typography>


                                <Typography variant={'h5'} style={{ fontSize: '20px', fontWeight: 'bold', paddingTop: '50px', marginLeft: '-130px' }}>
                                    {data.title && data.title.charAt(0).toUpperCase() + data.title.slice(1)}
                                </Typography>

                            </ButtonGroup>
                            <Typography
                                variant={'h5'}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "2",
                                    WebkitBoxOrient: "vertical",
                                    marginTop: '-90px', p: 2,
                                    marginRight: "5px",
                                    minHeight: 42
                                }}>  <div dangerouslySetInnerHTML={{ __html: data.description }} />
                            </Typography>
                            <Grid container spacing={1} sx={{ p: 1, marginLeft: "3px" }}>
                                <Grid item xs={8} >
                                    Lessons : {data.lessons?.length}
                                </Grid>
                                <Grid item xs={4} sx={{ display: "flex" }} >
                                    <StarIcon style={{ color: 'blue' }} />4.6
                                </Grid>
                            </Grid>

                        </JumboCardQuick>
                    </div>
                </Grid>
            ))}
        </Grid>
    );
};
/* Todo height prop define. */
export default Cards;
