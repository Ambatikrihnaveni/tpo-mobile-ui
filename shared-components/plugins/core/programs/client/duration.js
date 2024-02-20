import React from "react";
import { Grid, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function Duration({ data, handleChange }) {
    const handleProgramDuration = (event) => {
        handleChange(event.target.value);
    };

    return (
        <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "-100px" }}>
            <Typography variant='h3' style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'none', marginTop: "-80px" }}> Duration</Typography>

            <Grid sx={{ marginTop: "50px" }}>
                <Grid sx={{ color: '#007aff', marginBottom: "10px", textAlign: "center" }}>
                    <Typography>Select Program Duration</Typography>
                </Grid>

                <Grid style={{ display: "flex" }} justifyContent="center">
                    <Grid>
                        <FormControl sx={{ width: "300px", marginLeft: "20px" }}>
                            <InputLabel>Select Duration</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                onChange={handleProgramDuration}
                                value={data}
                                sx={{ textAlign: "center" }}
                            >
                                <MenuItem value={"Day"}>Day</MenuItem>
                                <MenuItem value={"Weeks"}>Weeks</MenuItem>
                                <MenuItem value={"Months"}>Months</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    )
}