import React from "react";
import {
    Grid,
    Typography,
} from "@mui/material";
import useAuth from "../../../../../../../hooks/useAuth";
import { useParams } from 'react-router-dom';
import { WebinarServicess } from "../../../../../../../graphql/services/webinarservices/webinarservices";
import UserData from "./userData";
export default function WebinarData() {
    const [webinarData, setWebinarData] = React.useState({})
    const { viewer } = useAuth();
    const account_id = viewer?._id
    const params = useParams();
    const webinarId = params.webinarId

    React.useEffect(async () => {
        const data = await WebinarServicess.getWebinar(webinarId)
        setWebinarData(data)
    }, [])

    return (
        <Grid>
            <Grid>
                <Typography sx={{ fontSize: 28, fontWeight: "bold", mb: 2, mt: 2, ml: "2%" }}>{webinarData?.title}</Typography>
            </Grid>

            <Grid sx={{ display: "flex" }}>
                <Grid sx={{ ml: "2%" }}>
                    <Typography sx={{ fontSize: 15 }}><b>Date</b></Typography>
                    <Typography sx={{ mt: 1.5, mb: 3 }}>{webinarData.date}</Typography>
                </Grid>

                <Grid sx={{ ml: "15%" }}>
                    <Typography sx={{ fontSize: 15, }}><b>Time</b></Typography>
                    <Typography sx={{ mt: 1.5, mb: 3 }}>{webinarData.startTime}-{webinarData.endTime}</Typography>
                </Grid>

                <Grid sx={{ ml: "18%" }}>
                    <Typography sx={{ fontSize: 15, }}><b>Audience</b></Typography>
                    {webinarData?.audiences?.map((webinar) => (
                        <Typography sx={{ mt: 1.5, mb: 3 }}>{webinar}</Typography>
                    ))}
                </Grid>


            </Grid>

            <Grid>
                <UserData webinarData={webinarData} />
            </Grid>
        </Grid>
    );
}
