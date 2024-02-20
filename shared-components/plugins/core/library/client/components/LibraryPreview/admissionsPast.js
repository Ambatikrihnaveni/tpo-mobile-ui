import React  from "react";
import { Avatar, Card, Typography,AvatarGroup,Tooltip } from "@mui/material";
import Div from '@jumbo/shared/Div'
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";


const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

const Item = styled(Span)(({ theme }) => ({
    minWidth: 0,
    flexGrow: 0,
    padding: theme.spacing(0, 1),
}));

const { filesBaseUrl } = Meteor.settings.public;

export default function AdmissionsPast({ data, image, duration, programName }) {

    let imageSrc = image;
    if (imageSrc === String(null)) return null;

    if (imageSrc) {
        imageSrc = `${filesBaseUrl}${imageSrc}`;
    } else {
        imageSrc = "";
    }

    const shopId = window.localStorage.getItem('accounts:shopId');
    let admissionsData = []
    const { t } = useTranslation();
    return (
        <Div className="container">
            <Typography variant="h5" sx={{ color: '#2e475D', fontSize: '28px' }}> <b>Past Admissions</b></Typography>
            <Grid container spacing={2} sx={{ mt: 2 }} >
                {data?.map((batch, index) => (
                    <Card sx={{ width: '500px', margin: '10px', marginTop: '50px', border: '2px solid #2e475D' }}>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={6}>
                                <Typography>BATCH</Typography>
                                <Typography variant="h4"> <b>{batch?.name}</b></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>MENTOR</Typography>
                                <AvatarGroup max={3} sx={{mr:13}}>
                                    {batch?.tutors?.map((tutor) => 
                                     <Tooltip title={tutor.name} key={tutor.id}>
                                        <Avatar src={`${filesBaseUrl}${tutor?.userMedia[0]?.URLs?.thumbnail}`}/>
                                        </Tooltip>
                                    )}
                                </AvatarGroup>

                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container sx={{ mt: 2, mb: 2 }}>
                            <Grid item xs={6}>
                                <Typography>STARTING FROM </Typography>
                                <Typography variant="h4"> <b>{formatDate(batch?.startDate)}</b></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>TIMINGS</Typography>
                                <Typography variant="h4"><b> {batch?.batchStartTime} &nbsp; To &nbsp; {batch?.batchEndTime}</b></Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container sx={{ mt: 2, mb: 2 }}>
                            <Grid item xs={6}>
                                <Typography> ENROLL START DATE</Typography>
                                <Typography variant="h4"><b>{`${formatDate(batch?.enrolementStartDate)}`}</b></Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography> ENROLL END DATE</Typography>
                                <Typography variant="h4"><b>{`${formatDate(batch?.enrolementEndDate)}`}</b></Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container sx={{ backgroundColor: '#2e475D' }}>
                            <Typography variant="h4" sx={{ color: 'white', mt: 2, mb: 2,ml:10, fontSize: '20px' }}><b> {programName}</b></Typography>
                        </Grid>

                    </Card>

                ))}
            </Grid>
        </Div>
    );
};
