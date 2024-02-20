import React, { useState } from 'react';
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import useAuth from "/imports/client/ui/hooks/useAuth";
import Div from "@jumbo/shared/Div";
import { useNavigate } from "react-router-dom";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { Meteor } from "meteor/meteor";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import { Avatar, CardContent, CardMedia, Typography, Divider, Button, Grid, } from '@mui/material';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationOutlinedIcon from '@material-ui/icons/CastForEducationOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
const { filesBaseUrl } = Meteor.settings.public;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({

    padding: theme.spacing(0, 1),

    '&:hover': {
        backgroundColor: 'transparent',
    },

    '& .MuiTouchRipple-root': {
        display: 'none'
    }

}));
const UserProfile = () => {
       ;
    const { theme } = useJumboTheme();
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }

    const sample = userdata.role
    const userName = (userdata?.name)?.charAt(0).toUpperCase() + (userdata?.name)?.slice(1)
    const navigate = useNavigate();
    let imageSrc = userdata?.userMedia ? userdata?.userMedia[0]?.URLs.small : '';

    const [numPeopleDisplayed, setNumPeopleDisplayed] = useState(5);
    const [showFullData, setShowFullData] = useState(false);

    // If there is no img src, then render nothing
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    }

    React.useEffect(() => {
        Tracker.autorun((computation) => {
            if (viewer) {
                setUser(viewer);
            }
        });
    });
    const onEditProfile = () => {
        navigate(`edit-profile`);
    }

 



    const handleShowMoreClick = () => {
        setShowFullData(prevShow => !prevShow);
    };

    return (

        <Div style={{ marginTop: '-20px', overflow: 'scroll', margin: '40px' }}>
            <Div sx={{
                backgroundColor: 'white',
                borderRadius: '15px',
                borderColor: 'gray',
                border: '1px solid lightgray',
            }}>
                <CardMedia
                    component="img"
                    height="250px"
                    image={getAssetPath(`${ASSET_IMAGES}/profile-bg.jpg`, "1920x580")}
                    alt="Paella dish"


                />
                <CardContent>
                    <Div
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 1,
                            mt: "-90px",
                            mb: 2,

                        }}
                    >
                        <Avatar
                            alt={userName}
                            src={imageSrc}
                            sx={{
                                width: "180px",
                                height: "180px",
                                border: 3,
                                mr: 2,
                                borderColor: 'common.white',
                                boxShadow: theme => theme.shadows[3]
                            }}
                        />
                        <Div sx={{ flex: 1, }}>

                            {
                                userdata.role == "Student" && (
                                    <Button
                                        disableRipple
                                        startIcon={<LibraryBooksIcon />}
                                        sx={{
                                            color: 'inherit',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                        variant="outlined"
                                        onClick={onEditProfile}
                                    >
                                        Build Resume
                                    </Button>
                                )
                                ||
                                (userdata.role == "Tutor" || userdata.role == "Admin" || userdata.role == "Master-Admin") && (
                                    <Button
                                        disableRipple
                                        sx={{
                                            color: 'inherit',
                                            textTransform: 'none',
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }}
                                        variant="outlined"
                                        onClick={onEditProfile}
                                    >
                                        Edit
                                    </Button>
                                )

                            }

                        </Div>

                    </Div>

                </CardContent>
                <Div style={{ marginTop: '-15px', marginLeft: "60px" }}>

                    {
                        userdata.role == "Student" && (
                            <Grid container spacing={4}>
                                <Grid item xs={6}>

                                    <Typography
                                        variant={"h2"}
                                        color={"common.red"}>
                                        <b> {userName} </b></Typography>
                                    <Typography
                                        variant={"h4"}
                                        color={"text.red"}
                                    > <b> {userdata?.primaryEmailAddress}</b></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ display: 'flex', marginBottom: '0px' }}>
                                        <div><PermPhoneMsgIcon /> </div>
                                        <div>
                                            <Typography
                                                variant={"h4"}
                                                color={"common.red"}
                                            > {userdata?.phoneNumber} </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: '0px' }}>
                                        <div><LocationOnIcon /></div>
                                        <div>
                                            <Typography
                                                variant={"h4"}
                                                color={"common.red"}
                                            > {userdata?.profile.city} </Typography>
                                        </div>
                                    </div>
                                    <Typography style={{ marginLeft: '20px' }}
                                        variant={"h4"}
                                        color={"common.red"}
                                    > {userdata?.profile.country} </Typography>
                                    <Typography style={{ marginLeft: '20px' }}
                                        variant={"h4"}
                                        color={"common.red"}
                                    > {userdata?.profile.pincode} </Typography>

                                </Grid>
                            </Grid>
                        )
                        ||
                        (userdata.role == "Tutor" || userdata.role == "Admin" || userdata.role == "Master-Admin") && (
                            <Grid container spacing={4}>
                                <Grid item xs={6}>

                                    <Typography
                                        variant={"h2"}
                                        color={"common.red"}>
                                        <b> {userName} </b></Typography>
                                    <Typography
                                        variant={"h4"}
                                        color={"text.red"}
                                    > <b> {userdata?.primaryEmailAddress}</b></Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ display: 'flex', marginBottom: '0px' }}>
                                        <div><PermPhoneMsgIcon /> </div>
                                        <div>
                                            <Typography
                                                variant={"h4"}
                                                color={"common.red"}
                                            > {userdata?.phoneNumber} </Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', marginBottom: '0px' }}>
                                        <div><LocationOnIcon /></div>
                                        <div>
                                            <Typography
                                                variant={"h4"}
                                                color={"common.red"}
                                            > {userdata?.profile?.address} </Typography>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        )}
                </Div>
            </Div>
            {
                userdata.role == "Student" && (
                    <Grid container style={{ padding: "15px 15px" }}>
                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px',
                            }}>
                                <Typography variant='h4' style={{ marginTop: '5px', padding: '5px 5px',color: 'var(--color-text)' }}><b> Professional Summary</b> </Typography>

                                <div style={{ display: 'flex', }}>
                                    <div>
                                        <SummarizeIcon style={{ color: 'var(--color-icon)', fontSize: '30px', marginRight: '10px' }} />
                                    </div>
                                    <div>
                                        <Div style={{ marginLeft: '10px' }}>
                                            {userdata?.profile?.summary && userdata?.profile?.summary.map((summary, index) => (
                                                <ul>
                                                    <li>{summary}</li>
                                                </ul>
                                            ))}
                                        </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>



                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px',
                            }}>                   
                                                                   
               <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)', padding:'5px 5px' }}>Education </h3>
                 <div style={{ display: 'flex', }}>
                                    <div>
                                        <SchoolIcon style={{ color: 'var(--color-icon)', fontSize: '25px', marginRight: '10px' }} />
                                    </div>
                                    <div>
                                        <Div>
                                            <Typography style={{ fontWeight: 'var(--artdeco-reset-typography-font-weight-bold)', color: 'var(--color-text)', fontSize: '20px' }}> {userdata?.profile.school_name}, {userdata?.profile.school_location}</Typography>
                                            <Typography > {userdata?.profile.degree}</Typography>
                                            <Typography color={"text.secondary"}> {userdata?.profile.graduation_year}</Typography>
                                            <Typography> {userdata?.profile.graduation_score}%</Typography>
                                        </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>
                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px'
                            }}>
                                         <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)',  padding:'5px 5px' }}>Experience</h3>
                                <div style={{ display: 'flex', }}>
                                    <div>
                                        <WorkIcon style={{ color: 'var(--color-icon)', fontSize: '22px', marginRight: '10px' }} />
                                    </div>
                                    <div>
                                        <Div>
                                            <Typography style={{ fontWeight: 'var(--artdeco-reset-typography-font-weight-bold)', color: 'var(--color-text)', fontSize: '20px' }}>{userdata?.profile.employer}</Typography>
                                            <Typography >
                                                {userdata?.profile.jobTitle}
                                            </Typography>
                                            <Typography color={"text.secondary"}>{userdata?.profile.start_month} {userdata?.profile.start_year} - {userdata?.profile.end_month} {userdata?.profile.end_year}</Typography>
                                            <Typography>{userdata?.profile.company_location}</Typography>

                                            {/*                                     <Divider style={{ width: '100%', marginTop: '20px' }} />
 */}                                </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>

                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '10px'
                            }}>
                                  <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)', padding:'5px 5px' }}>Skills </h3>
                                <div style={{ display: 'flex', }}>
                                    <div>
                                        <PsychologyIcon style={{ color: 'var(--color-icon)', fontSize: '25px', marginRight: '10px' }} />
                                    </div>
                                    <div>

                                        <Div >
                                            {userdata?.profile.skills && userdata?.profile.skills.map((skill, index) => (
                                                <ul>
                                                    <li>{skill}</li>
                                                </ul>
                                            ))}
                                        </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>
                    </Grid >
                ) ||
                (userdata.role == "Admin" || userdata.role == "Master-Admin") && (
                    <Grid container style={{ padding: "15px 15px" }}>
                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px',
                            }}>
                                <Grid sx={{ margin: '17px' }}>
                                    <div style={{ display: 'flex', }}>
                                        <div>
                                            <CastForEducationOutlinedIcon style={{ color: 'var(--color-icon)', fontSize: '30px', marginRight: '10px' }} />
                                        </div>
                                        <div>
                                            <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)' }}>Institute Name </h3>
                                            <Div>
                                                {userdata?.adminUIShops[0]?.name}
                                            </Div>
                                        </div>
                                    </div>
                                </Grid>
                            </Div>
                        </Grid>
                    </Grid>
                ) || (
                    userdata?.role == "Tutor") && (
                    <Grid container spacing={1} style={{ marginTop: '2px', marginLeft: '15px' }}>
                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px',
                            }}>
                                <Typography variant='h4' style={{ marginTop: '5px', padding: '5px 5px' }}><b> Professional Summary</b> </Typography>

                                <div style={{ display: 'flex', }}>
                                    <div>
                                        <SummarizeIcon style={{ color: 'var(--color-icon)', fontSize: '30px', marginRight: '10px' }} />
                                    </div>
                                    <div>
                                        <Div style={{ marginLeft: '10px' }}>
                                            {userdata?.profile?.summary && userdata?.profile?.summary.map((summary, index) => (
                                                <ul>
                                                    <li>{summary}</li>
                                                </ul>
                                            ))}
                                        </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>
                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px',
                            }}>                      <Typography variant='h4' style={{ marginTop: '5px', padding: '5px 5px' }}><b> Education</b> </Typography>
                                <div style={{ display: 'flex', }}>
                                    <div>
                                        <SchoolIcon style={{ color: 'var(--color-icon)', fontSize: '30px', marginRight: '10px' }} />
                                    </div>
                                    <div>
                                        <Div style={{ marginLeft: '10px' }}>
                                            <Typography>{userdata?.profile?.degree}</Typography>

                                        </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>

                        <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                            <Div sx={{
                                backgroundColor: 'white',
                                borderRadius: '15px',
                                border: '1px solid lightgray',
                                marginBottom: '7px',
                            }}>                          <Typography variant='h4' style={{ marginTop: '5px', padding: '5px 5px' }}><b> Experience</b> </Typography>
                                <div style={{ display: 'flex', }}>
                                    <div>
                                        <WorkIcon style={{ color: 'var(--color-icon)', fontSize: '30px', marginRight: '10px' }} />
                                    </div>
                                    <div>
                                        <Div style={{ marginLeft: '10px' }}>
                                            <Typography variant='h6' style={{ fontWeight: 'bold' }}>{userdata?.profile.employer}</Typography>
                                            <Typography >
                                                {userdata?.profile.jobTitle}
                                            </Typography>
                                            <Typography color={"text.secondary"}>{userdata?.profile.start_month}{userdata?.profile.start_year}-{userdata?.profile.end_month}{userdata?.profile.end_year}</Typography>
                                            <Typography>{userdata?.profile.company_location}</Typography>

                                        </Div>
                                    </div>
                                </div>
                            </Div>
                        </Grid>

                        <Grid container spacing={2} style={{ marginLeft: '15px', marginTop: '5px' }}>
                            <Grid Item xs={8} style={{ padding: '10px 10px' }}>
                                <Div sx={{
                                    backgroundColor: 'white',
                                    borderRadius: '15px',
                                    border: '1px solid lightgray',
                                    marginBottom: '7px',
                                }}>
                                    <Typography variant='h4' style={{ marginTop: '5px', padding: '5px 5px' }}><b> Skills</b> </Typography>

                                    <div style={{ display: 'flex', }}>
                                        <div>
                                            <PsychologyIcon style={{ color: 'var(--color-icon)', fontSize: '30px', marginRight: '10px' }} />
                                        </div>
                                        <div>
                                            <Div style={{ marginLeft: '10px' }}>
                                                {userdata?.profile.skills && userdata?.profile.skills.map((skill, index) => (
                                                    <Typography>{skill}</Typography>
                                                ))}
                                            </Div>
                                        </div>
                                    </div>
                                </Div>
                            </Grid>





                        </Grid>


                    </Grid>

                )
            }


        </Div >
    );
};

export default UserProfile;
