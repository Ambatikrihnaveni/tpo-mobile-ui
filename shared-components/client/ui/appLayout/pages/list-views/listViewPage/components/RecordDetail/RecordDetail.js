import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {  Typography, CardMedia, CardContent, Button, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Div from "@jumbo/shared/Div";
import { ASSET_IMAGES } from '../../../../../utils/constants/paths';
import { getAssetPath } from '../../../../../utils/appHelpers';
import useAuth from '../../../../../../hooks/useAuth';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PsychologyIcon from '@mui/icons-material/Psychology';
const { filesBaseUrl } = Meteor.settings.public;

const RecordDetail = ({ record, onClose, thumbnailImage }) => {
    const { isViewerLoading, viewer, data } = useAuth();
    const [user, setUser] = useState(viewer);
    const userdata = { ...viewer }
    const [numPeopleDisplayed, setNumPeopleDisplayed] = useState(5);

    const [showFullData, setShowFullData] = useState(false);

    const userName = (userdata?.name)?.charAt(0).toUpperCase() + (userdata?.name)?.slice(1)
    let imageSrc = userdata?.userMedia ? userdata?.userMedia[0]?.URLs.small : '';



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

    return (

        <Div>
            <Div sx={{
                backgroundColor: 'white',
                borderRadius: '15px',
                borderColor: 'gray',
                border: '1px solid lightgray',
            }}>
                <IconButton onClick={onClose} style={{ position: 'absolute', top: 0, right: 10 }}>
                    <CloseIcon />
                </IconButton>
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
                            alt={record?.name}
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
                                        Edit Profile
                                    </Button>
                                )

                            }

                        </Div>
                        <Div style={{ marginRight: '20px' }}>
                            <Button
                                size={"small"}
                                variant={"outlined"}
                                sx={{ px: 2, backgroundColor: 'white', borderColor: 'black', color: 'black' }}
                                disableElevation
                            ><MailOutlineIcon style={{ color: 'black' }} />  Message</Button>
                            <Button
                                size={"small"}
                                variant={"contained"}
                                sx={{ px: 2, marginLeft: '5px', backgroundColor: 'blue' }}
                                disableElevation
                            > <AddIcon /> Connect</Button>

                        </Div>
                    </Div>

                </CardContent>
                <Div style={{ marginTop: '-15px', marginLeft: "60px" }}>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>

                            <Typography
                                variant={"h2"}
                                color={"common.red"}>
                                <b> {record?.name} </b></Typography>
                            <Typography
                                variant={"h4"}
                                color={"text.red"}
                            > <b> {record?.email}</b></Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ display: 'flex', marginBottom: '0px' }}>
                                <div><PermPhoneMsgIcon /> </div>
                                <div>
                                    <Typography
                                        variant={"h4"}
                                        color={"common.red"}
                                    > {record?.phoneNumber} </Typography>
                                </div>
                            </div>
                            <div style={{ display: 'flex', marginBottom: '0px' }}>
                                <div><LocationOnIcon /></div>
                                <div>
                                    <Typography
                                        variant={"h4"}
                                        color={"common.red"}
                                    > {record?.city} </Typography>
                                </div>
                            </div>
                            <Typography style={{ marginLeft: '20px' }}
                                variant={"h4"}
                                color={"common.red"}
                            > {record?.country} </Typography>
                            <Typography style={{ marginLeft: '20px' }}
                                variant={"h4"}
                                color={"common.red"}
                            > {record?.pincode} </Typography>

                        </Grid>
                    </Grid>
                </Div>
            </Div>
            <Grid container style={{ padding: "15px 15px" }}>
                <Grid Item xs={12} style={{ padding: '10px 10px' }}>
                    <Div sx={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        border: '1px solid lightgray',
                        marginBottom: '7px',
                    }}>
                        <Grid sx={{ margin: '17px' }}>

                            <div style={{ display: 'flex', }}>
                                <div>
                                    <EditNoteIcon style={{ color: 'var(--color-icon)', fontSize: '40px', marginRight: '10px' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)' }}>Professional Summary </h3>
                                    <Div>
                                        {record?.summary && record?.summary.map((summary, index) => (
                                            <ul>
                                                <li>{summary}</li>
                                            </ul>
                                        ))}
                                       </Div>
                                </div>
                            </div>
                        </Grid>
                    </Div>
                    <Div sx={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        border: '1px solid lightgray',
                        marginBottom: '7px',
                    }}>
                        <Grid sx={{ margin: '17px' }}>
                            <div style={{ display: 'flex', }}>
                                <div>
                                    <SchoolIcon style={{ color: 'var(--color-icon)', fontSize: '40px', marginRight: '10px' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)' }}>Education </h3>
                                    <Div>
                                    <Typography style={{ fontWeight: 'var(--artdeco-reset-typography-font-weight-bold)', color: 'var(--color-text)', fontSize: '20px' }}> {record?.school_name}, {record?.school_location}</Typography>
                                        <Typography style={{ fontWeight: 'bold' }}> {record?.degree}</Typography>
                                        <Typography color={"text.secondary"}> {record?.graduation_year}</Typography>
                                        <Typography> {record?.graduation_score}%</Typography>
                                        {/*                             <Divider style={{ width: '100%', marginTop: '20px' }} />
 */}                        </Div>
                                </div>
                            </div>
                        </Grid>
                    </Div>
                    <Div sx={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        border: '1px solid lightgray',
                        marginBottom: '7px'
                    }}>
                        <Grid style={{ padding: '15px 15px' }}>
                            <div style={{ display: 'flex', }}>
                                <div>
                                    <WorkIcon style={{ color: 'var(--color-icon)', fontSize: '40px', marginRight: '10px' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)' }}>Experience</h3>
                                    <Div >
                                    <Typography style={{ fontWeight: 'var(--artdeco-reset-typography-font-weight-bold)', color: 'var(--color-text)', fontSize: '20px' }}>{record?.employer}</Typography>
                                        <Typography>
                                         {record?.jobTitle}
                                        </Typography>
                                        <Typography color={"text.secondary"}>{record?.start_month}{record?.start_year}-{record?.end_month}{record?.start_year}</Typography>
                                        <Typography>{record?.company_location}</Typography>

                                        {/*                                 <Divider style={{ width: '100%', marginTop: '20px' }} />
 */}
                                    </Div>
                                </div>
                            </div>
                        </Grid>
                    </Div>
                    <Div sx={{
                        backgroundColor: 'white',
                        borderRadius: '15px',
                        border: '1px solid lightgray',
                        marginBottom: '10px'
                    }}>
                        <Grid sx={{ margin: '17px' }}>

                            <div style={{ display: 'flex', }}>
                                <div>
                                    <PsychologyIcon style={{ color: 'var(--color-icon)', fontSize: '40px', marginRight: '10px' }} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '4px', fontSize: '20px', color: 'var(--color-text)' }}>Skills </h3>
                                    <Div >
                                        {record?.skills && record?.skills.map((skill, index) => (
                                            <ul>
                                                <li>{skill}</li>
                                            </ul>
                                        ))}
                                    </Div>
                                </div>
                            </div>
                        </Grid>
                    </Div>
                </Grid >
                </Grid>
        </Div >
    );
};

export default RecordDetail;
