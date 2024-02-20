import React, { useEffect, useRef } from "react";
import { Card, Button, Typography, Grid, } from '@mui/material'

export default function AptitudeAdds({ showAdmissionTab }) {
    const vidRef = useRef();

    useEffect(() => { vidRef.current.play(); }, []);

    return (

        <Card sx={{ borderRadius: "1px", width: "310px", float: "right", mt: "-5%", mr: "7%" }}>

            <video
                style={{ height: "270px", width: "275px", ml: "-12%" }}
                src="Students_Assigned.mp4"
                ref={vidRef}
                muted
                autoPlay
                loop
            />

            <Typography
                sx={{
                    fontSize: "20px",
                    fontWeight: "bold"
                }}>
                Apply to programs in one click
            </Typography>
            <Grid sx={{ marginTop: "10px", marginBottom: "10px" }}>
                <Button variant="contained" sx={{ backgroundColor: "#ed053a" }} onClick={showAdmissionTab}>Apply now</Button>
            </Grid>
        </Card>
    )
}