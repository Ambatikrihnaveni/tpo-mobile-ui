import React from 'react';
import { Avatar, Card, CardContent, Rating, Typography, Box } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import GroupsIcon from '@mui/icons-material/Groups';
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { textAlign } from '@mui/system';
import TutorDetails from '../../../pages/list-views/listViewPage/components/RecordDetail/TutorDetails';

const { filesBaseUrl } = Meteor.settings.public;

const AgentDetail = (props) => {
  const firstLetter = props?.tutors?.name?.charAt(0).toUpperCase();
   
  const string =props?.tutors?.name
  const truncateString = (str = '', maxLength = 50) => str?.length > maxLength ? `${str.substring(0, maxLength)}…`: str;
  // demo the above function
  const truncateName = string ? truncateString(string, 10) : "";
  
  let tutorImage = props?.tutors?.userMedia[0]?.URLs?.thumbnail;
  if (tutorImage === String(null)) return null;
  if(tutorImage) {
    tutorImage = `${filesBaseUrl}${tutorImage}`
  }

    return (
        <Card sx={{ overflow: 'visible', mt: 4 }}  >
            <CardContent >
                <Box display="flex" justifyContent="center" alignItems="center" >
                    {(tutorImage) ? <Avatar
                        alt={firstLetter}
                        src={tutorImage}
                        sx={{ boxShadow: 15, width: 60, height: 60, mb: 2, }}
                    ></Avatar> : <Avatar
                        sx={{ boxShadow: 15, width: 60, height: 60, mb: 2, }}
                    >{firstLetter}</Avatar>}
                </Box>

                <Typography  sx={{ mb: 2 }} style={{ textAlign: "center" , 
                              //textOverflow: "ellipsis",
                              //overflow: "hidden",
                                 /*  display: "-webkit-box",
                                WebkitLineClamp: "5",
                                WebkitBoxOrient: "vertical",
                                whiteSpace: "nowrap", */ 
                            }}>
                      
                    {truncateName.charAt(0).toUpperCase() + truncateName.slice(1)}
                </Typography>
                <Rating
                        name="feedback"
                        value={1}
                        max={1}
                        readOnly
                        precision={1}
                        size={"medium"}
                        emptyIcon={<StarIcon/>}
                        
                    /> 4.5
                {/* <Box display="flex" justifyContent="center" alignItems="center" >
                <Stack direction={"row"} spacing={1} alignItems={'center'}> */}
                {/* <Typography
                    component={'div'}
                    variant={'body1'}
                    color={'text.secondary'}
                    sx={{
                            
                            fontSize: 13,
                        //    paddingLeft:'30px'
                        }}
                    >
                <GroupsIcon  flexItem  /> </Typography> */}
                {/* <Typography
                        component={'div'}
                        variant={'body1'}
                        color={'text.secondary'}
                        sx={{
                            display: 'flex',
                            fontSize: 13,
                        //    paddingLeft:'30px'
                        }}
                    >
                        
                        {agentDetail.studentCount}
                        </Typography> */}
                {/* </Stack>
                        </Box> */}
                {/* <Box display="flex" justifyContent="center" alignItems="center" >
                <Stack direction={"row"} spacing={1} alignItems={'center'}>
                    <Rating
                        name="feedback"
                        value={1}
                        max={1}
                        readOnly
                        precision={1}
                        size={"medium"}
                        emptyIcon={<StarIcon/>}
                        
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
                        
                       
                        {agentDetail.rating}
                       {/*  <Divider orientation="vertical" flexItem sx={{mx: 1, my: .5}}/>
                     {agentDetail.desc} 
                    </Typography>
                </Stack>
                    </Box>*/}
            </CardContent>
        </Card>
    );
};
/* Todo agent detail prop */
export default AgentDetail;
