import React from "react";
import { Grid, Typography, } from "@mui/material";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Div from "../../../../client/ui/@jumbo/shared/Div/Div";
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function ProgramDuration(params) {

    const { duration, durationType, AddDurationType, addDuration, handleModeChange, selectedModes } = params

    return (
        <Div style={{ minHeight: '50vh' }}>
            <Box sx={{ marginTop: params.recordType ? "" : '-50px', alignItems: 'center', textAlign: 'center', }}>
                <Typography style={{ color: 'rgb(0, 0, 0)', fontWeight: '700', fontStyle: 'normal', fontSize: '25px', padding: '10px 5px', }}>Set Program Duration</Typography>
                <Typography style={{ fontSize: '14px', color: '#8595A6', textTransform: 'none', fontWeight: '350', marginBottom: '20px' }}>Enter the number of days, weeks, or months corresponding to your desired program duration.
                </Typography>

                <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ margin: 'auto' }}>
                    <Grid item xs={6} md={4}>
                        <FormControl sx={{ width: "55%", marginLeft: "15px" }}>
                            <InputLabel style={{ marginLeft: '20px' }}> Duration Type</InputLabel>
                            <Select
                                onChange={AddDurationType}
                                value={durationType}
                                label="Select Duration Type"
                                sx={{ textAlign: "center" }}
                            >
                                <MenuItem value={"Days"}>Days</MenuItem>
                                <MenuItem value={"Weeks"}>Weeks</MenuItem>
                                <MenuItem value={"Months"}>Months</MenuItem>
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TextField
                            label="Duration"
                            placeholder="Ex:30"
                            value={duration}
                            fullWidth
                            onChange={addDuration}
                            type="number"
                        />
                    </Grid>
                </Grid>
                <Typography style={{ color: 'rgb(0, 0, 0)', fontWeight: '700', fontStyle: 'normal', fontSize: '25px', padding: '10px 5px', marginTop: '20px' }}>Modes Of Program</Typography>
                <Div sx={{ textAlign: 'center', alignItems: 'center', marginLeft: '32%' }}>
                    <Div sx={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ marginRight: '20px', display: "flex", alignItems: "center" }}>
                            <Typography>Online</Typography>
                            <Checkbox
                                {...label}
                                checked={selectedModes?.includes("Online")}
                                onChange={() => handleModeChange("Online")}
                            />
                        </div>
                        <div style={{ marginRight: '20px', display: "flex", alignItems: "center" }}>
                            <Typography>Offline</Typography>
                            <Checkbox
                                {...label}
                                checked={selectedModes?.includes("Offline")}
                                onChange={() => handleModeChange("Offline")}
                            />
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Typography>Self-Paced</Typography>
                            <Checkbox
                                {...label}
                                checked={selectedModes?.includes("Self Paced")}
                                onChange={() => handleModeChange("Self Paced")}
                            />
                        </div>
                    </Div>
                </Div>
            </Box>
        </Div>
    );
}
