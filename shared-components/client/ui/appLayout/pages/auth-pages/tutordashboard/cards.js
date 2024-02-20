import { Grid, Typography } from "@mui/material";
import Div from "@jumbo/shared/Div";
import SchoolIcon from '@mui/icons-material/School';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),

    color: theme.palette.text.secondary,
}));

function Cards() {

    return (

        <>

            <Div sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 20 }}>

                    <Grid item xs={2} sm={4} md={4}>
                        <Item>
                            <Div sx={{ display: "flex", alignItems: 'center' }}>
                                <Div sx={{ ml: 2, flex: 1 }}>
                                    <Typography color={'black'} variant={"h6"} mb={.5}>Total organizations<div style={{ width: '5px', height: '20px', float: 'right', color: 'blue' }}>

                                        <CorporateFareIcon style={{ fontSize: "large", }} />

                                    </div></Typography>

                                    <Typography color={'black'} variant={"h6"} mb={0}>1,235</Typography>
                                </Div>
                            </Div>
                        </Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Item>
                            <Div sx={{ display: "flex", alignItems: 'center' }}>
                                <Div sx={{ ml: 2, flex: 1 }}>
                                    <Typography color={'black'} variant={"h6"} mb={.5}>Students<div style={{ width: '5px', height: '20px', float: 'right', color: 'blue' }}>

                                        <SensorOccupiedIcon style={{ fontSize: "25px", }} />

                                    </div></Typography>

                                    <Typography color={'black'} variant={"h6"} mb={0}>$35,723</Typography>
                                </Div>
                            </Div>
                        </Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Item>
                            <Div sx={{ display: "flex", alignItems: 'center' }}>
                                <Div sx={{ ml: 2, flex: 1 }}>
                                    <Typography color={'black'} variant={"h6"} mb={.5}>Projects<div style={{ width: '5px', height: '20px', float: 'right', color: 'blue' }}>

                                        <SchoolIcon style={{ fontSize: "25px", }} />

                                    </div></Typography>

                                    <Typography color={'black'} variant={"h6"} mb={0}>1,235</Typography>
                                </Div>
                            </Div>
                        </Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Item>
                            <Div sx={{ display: "flex", alignItems: 'center' }}>
                                <Div sx={{ ml: 2, flex: 1 }}>
                                    <Typography color={'black'} variant={"h6"} mb={.5}>Internships<div style={{ width: '5px', height: '20px', float: 'right', color: 'blue' }}>

                                        <CorporateFareIcon style={{ fontSize: "large", }} />

                                    </div></Typography>

                                    <Typography color={'black'} variant={"h6"} mb={0}>$35,723</Typography>
                                </Div>
                            </Div>
                        </Item>
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <Item>
                            <Div sx={{ display: "flex", alignItems: 'center' }}>
                                <Div sx={{ ml: 2, flex: 1 }}>
                                    <Typography color={'black'} variant={"h6"} mb={.5}>Courses<div style={{ width: '5px', height: '20px', float: 'right', color: 'blue' }}>

                                        <GolfCourseIcon style={{ fontSize: "25px", }} />

                                    </div></Typography>

                                    <Typography color={'black'} variant={"h6"} mb={0}>$16.2</Typography>
                                </Div>
                            </Div>
                        </Item>
                    </Grid>


                </Grid>
            </Div>


        </>
    )
}

export default Cards;