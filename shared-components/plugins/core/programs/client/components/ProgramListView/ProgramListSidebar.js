import React from 'react';
import {
    Typography,
    Grid,
} from "@mui/material";
import { Meteor } from "meteor/meteor";
import StarIcon from '@mui/icons-material/Star';

const { filesBaseUrl } = Meteor.settings.public;

const ProgramListSidebar = ({ data }) => {

    let imageSrc = (data?.media) ? data?.media[0]?.URLs?.small : '';

    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }


    return (
        <Grid>

            <Grid
                className="imageContainer"
            >
                <Grid style={{ backgroundImage: (imageSrc) ? `url(${imageSrc})` : 'url("https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/cb/3c4030d65011e682d8b14e2f0915fa/shutterstock_226881610.jpg?auto=format%2Ccompress&dpr=1")', backgroundSize: "cover", minHeight: "160px", verticalAlign: "center", textAlign: "center", marginTop: '13px', marginBottom: "20px", marginRight: "13px" }}>
                </Grid>
            </Grid>

            <Grid>

                <Typography style={{ fontSize: '20px', marginTop: "15px", marginBottom: "10px", fontWeight: 'bold' }}> {data?.name}</Typography>

            </Grid>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginBottom: '10px' }}>
                <Typography style={{ fontSize: '17px' }}>Program Type</Typography>
                <div style={{ fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>  {data?.type && data?.type.charAt(0).toUpperCase() + data?.type.slice(1)}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginBottom: '10px' }}>
                <Typography style={{ fontSize: '17px' }}>Field of study</Typography>

                <div style={{ fontSize: '20px', marginLeft: '10px', fontWeight: 'bold' }}>
                    {data?.field && data?.field.map((fieldValue, index) => (
                        <div key={index}>
                            {fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1)}
                        </div>
                    ))}
                </div>

            </div>

            <div style={{ display: "flex" }}>
                <div>
                    <Typography style={{ fontSize: '17px' }}>By <div style={{ color: '#08d1c4', marginLeft: "27px", marginTop: "-26px" }}>{data?.account?.name}</div></Typography>
                </div>
                <div style={{ marginLeft: '10px', marginRight: "10px" }}>
                    <div style={{ height: '100%', width: 1, backgroundColor: '#909090', }}> </div>
                </div>
                <div>
                    <StarIcon fontSize="inherit" sx={{ color: "gold" }} />4.7
                </div>
            </div>

            <Typography
                sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    marginTop: "15px",
                    minHeight: 40
                }}>
                <div dangerouslySetInnerHTML={{ __html: data?.program_content }} />
            </Typography>
        </Grid>
    )
};
/* Todo record, view prop define */
export default ProgramListSidebar;