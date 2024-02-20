import React, { useState } from 'react';
import { Button, ButtonGroup, CardMedia,Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Key, Share } from "@mui/icons-material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import StarIcon from '@mui/icons-material/Star';
import { Meteor } from "meteor/meteor";

const { filesBaseUrl } = Meteor.settings.public;

const ProgramCount = ({programsData,selectedPrograms }) => {
    const [buttonText, setButtonText] = useState([]);
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };
       ;
    const handleClick = (item) => {
        
      programsData(item)
        if (buttonText.includes(item.id)) {
            setButtonText(buttonText.filter((id) => id !== item.id));
        }
      };

    const [isFavorite, setIsFavorite] = useState(true);
    const [inCart, setInCart] = useState(false);


    const [isHovered, setHover] = useState(-1);

    return (

        <Grid container  >
        {selectedPrograms?.map((data, i) => (

            <Grid key={i} item
               >

                <div style={{  width: "325px",}}  >
                    <JumboCardQuick noWrapper sx={{ mb: 4, ml: 1, mr: 1, mt: 2 }}
                     onMouseOver={() => setHover(i)}
                     onMouseLeave={() => setHover(-1)}
                    style={{boxShadow:isHovered!==i?'':'4px 2px 6px rgba(0,0,0,0.3)'}}
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
                             <div style={{  backgroundImage: (data?.programMedia[0]?.URLs) ? `url(${filesBaseUrl}${data?.programMedia[0]?.URLs?.small})` : 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw9-0wqWF4qc-4wOpJ9N30XDTEvBSmuVOgcQ&usqp=CAU")', backgroundSize: "cover", minHeight: "160px", verticalAlign: "center", textAlign: "center" }}>
                                <div style={{ display: `${isHovered == i ? "block" : 'none'}` }}>
                                    <div class="container">
                                        <div class="round">
                                            <input type="checkbox"  /* checked={checked} id="checkbox"
                                            checked={buttonText.includes(data.id)}
                                            onChange={() => {}} */ 
                                            checked={isChecked}
                                              onChange={handleCheckboxChange}
                                            />
                                            <label for="checkbox"></label>
                                        </div>
                                    </div>
                                    <div className='button'>
                                                <button className="btn1" ><b> Preview</b></button>
                                                <button onClick={() => handleClick(data)}className="btn" ><b>
                                                    {buttonText.includes(data._id) ? "Select" : "Unselect"}</b></button>
                                            </div>
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
                          <Grid container  >
                                <Grid>
                                <Typography variant={"h5"} style={{ fontSize: 'small', color: 'rgb(134, 146, 167)',paddingTop: '8px',paddingLeft: '8px', }}>Content by  </Typography>
                                </Grid>
                               <Grid>
                               <Typography style={{ fontWeight: 'bold', color: 'rgb(0, 186, 255)',fontSize: 'small',paddingLeft: '8px', paddingTop: '6px', }}>TPO.AI</Typography>
                               </Grid>
                                </Grid>
                                <Typography variant={'h5'} style={{ fontSize: '1.25rem',   lineHeight: '1.625rem', fontWeight: 600,marginTop:'50px',marginLeft:'-293px' }}>
                                {(data.name).charAt(0).toUpperCase() +(data.name).slice(1)}
                                            </Typography>
                            
                        </ButtonGroup>
                        <Grid>
                        <Typography style={{float:'right',paddingRight:'10px',fontWeight:'bold',color:'#50C2C9'}}> {data.priceType}:{data.price}</Typography>  
                        <Typography variant={'h5'} style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: "2",
                                WebkitBoxOrient: "vertical",
                                marginTop: "-60px",
                                marginLeft: "10px",
                                marginRight: "5px",
                                color: 'rgb(134, 146, 167)',
                                minHeight: 42
                            }}>
                            <div dangerouslySetInnerHTML={{ __html: data?.program_content }} /> 
                            </Typography>  
                            </Grid>        
                            <Grid container spacing={2} style={{ marginTop: '7px', padding: "5px" }}>
                                <Grid item xs={6} >
                                    <Typography variant='h5' style={{ paddingLeft: '5px', marginTop: "-11px", fontSize: '0.875rem', fontWeight: 600 }}> Modules: {data.products.length}</Typography>
                                </Grid>
                                <Grid item xs={6} >
                                    <Typography style={{ marginLeft: "90px", marginTop: "-10px", fontSize: 'small' }}> <StarIcon style={{ color: "rgb(0, 186, 255)" }} fontSize="inherit" />4.5 </Typography>
                                </Grid>
                            </Grid>

                    </JumboCardQuick>
                </div>
            </Grid>
        ))}


    </Grid>
    );
};
export default ProgramCount;
