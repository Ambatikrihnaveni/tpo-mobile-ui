import { Select, Typography } from '@mui/material';
import React from 'react';
import Div from "@jumbo/shared/Div";
import { Grid } from '@mui/material';
import TextField from "@mui/material/TextField";

export default function Attechment() {
    return (
        <Div>
            <Grid flexGrow={1}>
                <Grid item xs={12} md={4} sm={4} lg={2} sx={{ mt: 3 }} >
                    <Typography variant="h5">
                        Attechment
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} sm={4} lg={2} sx={{ mt: -3, ml: 35 }} >
                    <Typography variant="h5">
                        Add Attechment
                    </Typography>
                </Grid>
            </Grid><hr></hr>

            <Grid flexGrow={1}>
                <Grid item xs={12} md={4} sm={4} lg={2} sx={{ mt: 3 }} >
                    <Typography variant="h5">
                        Time Duration
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4} sm={4} lg={2} sx={{ mt: -3, ml: 35 }} >
                    <TextField sx={{ width: 50 }} />
                    <Select />
                </Grid>
            </Grid><hr></hr>
        </Div>
    )
}