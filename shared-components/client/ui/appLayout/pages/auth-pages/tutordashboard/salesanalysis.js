import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import data from "./dat";
import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";

const Salesanalysis = () => (
    <>
        <Grid container xs={2} sm={4} md={4}>
            <Grid>
                <Typography sx={{ pl: 3, pt: 2 }}>
                    Sales Analytics
                </Typography>
            </Grid>
            <Grid xs={2} sm={4} md={4} sx={{ ml: 3, mt: 2 }}>
                <ButtonGroup aria-label="outlined primary button group">
                    <Button>Today</Button>
                    <Button>Weekly</Button>
                    <Button>Monthly</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        <ResponsiveContainer width="100%" height={300} >

            <ComposedChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="Revenue" style={{fontWeight:'bold'}} barSize={20} fill={"#b678cc"} />
                <Line type="monotone" dataKey="Sales" stroke="#7cdefc" />
            </ComposedChart>
        </ResponsiveContainer>
    </>

);

export default Salesanalysis;