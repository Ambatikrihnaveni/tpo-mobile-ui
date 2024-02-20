import React, {  useState, useCallback, } from "react";
import { Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import SampleTime from "./simpletime";

export default function SelectTime() {
    const [age, setAge] = React.useState('');
    const [selectedFromTime, setSelectedFromTime] = React.useState(null);
    const [selectedToTime, setSelectedToTime] = React.useState(null);

    let d = new Date();

    const[hour, setHour] = React.useState( d.getHours())
    const [minutes,setMinutes] =React.useState(d.getMinutes())
    const [ampm, setAmPm] = useState(d.getHours() < 12 ? 'AM' : 'PM');
    const menu = [{ label: 'Batch 1' }, { label: 'Batch 2' }, { label: 'Batch 3' }, { label: 'Batch 4' },];
      

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const hour_change = useCallback((e) => {
        if (e.target.value > 23) {
            setHour("23");
        } else if (e.target.value < 0) {
            setHour('00');
        }

        if (e.target.value == "") {
            setHour(formatTime(hour));
        }

        setHour(e.target.value);

    });

    const minute_change = useCallback((e) => {

        if (e.target.value > 59) {
            setMinutes("59")
        } else if (e.target.value < 0) {
            setMinutes("00")
        }

        if (e.target.value == "") {
            setMinutes(formatTime(minutes));
        }

        setMinutes(e.target.value);
    })

    const hour_up = () => {
        setHour(hour + 1)
        if (hour > 23) {
            setHour("0");
        }
    }

    const hour_down = () => {
        setHour(hour - 1);
        if (hour < 0) {
            setHour(23);
        }
    }
 
  
    return (

        <div sx={{ p: 3 }}>
            <Grid container >
                <Grid xs={2}>
                    <h4>Select Batch</h4>
                    {menu.map(() => (
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" style={{ marginTop: '20px' }}>Select Batch</InputLabel>
                            <Select
                                value={age}
                                label="Age"
                                onChange={handleChange}
                                style={{ marginTop: '20px' }}
                            >
                                {menu.map((menu) => (
                                    <MenuItem>{menu.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ))}

                </Grid>

                <Grid xs={2} style={{ marginLeft: '60px' }}>
                    <h4>Morning Session</h4>
                    {menu.map(() => (
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <SampleTime
                                selected={selectedMorningFromTime}
                                hour_change={hour_change}
                                minute_change={minute_change}
                                hour={hour}
                                minute={minutes}
                                hour_up={hour_up}
                                hour_down={hour_down}
                            />

                        </LocalizationProvider>
                    ))}
                </Grid>

                <Grid xs={2} style={{ marginTop: '22px', marginLeft: '5px' }}>
                    {menu.map(() => (
                        <TextField id="outlined-basic" placeholder='End time' variant="outlined" style={{ marginTop: '20px' }} />
                    ))}
                </Grid>

                <Grid xs={2} style={{ marginLeft: '60px' }}>
                    <h4>Eveining Session</h4>
                    {menu.map(() => (
                        <TextField id="outlined-basic" placeholder='start time' variant="outlined" style={{ marginTop: '20px' }} />
                    ))}
                </Grid>

                <Grid xs={2} style={{ marginTop: '22px', marginLeft: '5px' }}>
                    {menu.map(() => (
                        <TextField id="outlined-basic" placeholder='End time' variant="outlined" style={{ marginTop: '20px' }} />
                    ))}
                </Grid>


            </Grid>

        </div>

    );
}

