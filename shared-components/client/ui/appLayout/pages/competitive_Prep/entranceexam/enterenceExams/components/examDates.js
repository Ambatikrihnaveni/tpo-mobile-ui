import React from "react";
import {
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import Div from "../../../../../../@jumbo/shared/Div";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiSvgIcon-root': {
            borderRadius: '40%', // Make the checkbox icon circular
            backgroundColor: theme.palette.background.default, // Use the background color to simulate a radio button
        },
        '&.Mui-checked .MuiSvgIcon-root': {
            backgroundColor: theme.palette.primary.main, // Change the background color when checked
        },
    },
}));


export default function ExamDates({ selectedDate, setSelectedDate, selectedValues, handleCheckboxChange, handleDateChange, handleToTimeChange, handleFromTimeChange, selectedFromTime, selectedToTime, }) {


    return (
        <Grid sx={{ textAlign: "center", height: '200px' }}>
            <Div>
                <Typography sx={{ fontSize: 29, fontWeight: "bold" }}>Exam Dates</Typography>
                <Typography sx={{ mb: 1, mt: 2 }}>Enter The Number Of Days , Weeks, Or Months Corresponding To Your Desired Program Duration</Typography>
            </Div>

            <Grid container spacing={2} sx={{textAlign: "center",justifyContent:'center'}} >
                <Grid item xs={3} sx={{ml:3,mt:3}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>

                            <DesktopDatePicker
                                sx={{width:"80%"}}
                                label="Select Date"
                                inputFormat="dd/MM/yyyy"
                                format="dd/MM/yyyy" 
                                value={selectedDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                </Grid>
                <Grid item xs={1.5} sx={{ mt: 3 ,mr:2}}>
                    <TextField
                        id="time"
                        label=" Start Time"
                        type="time"
                        fullWidth
                        onChange={handleFromTimeChange}
                        value={selectedFromTime}
                        selected={selectedFromTime}
                        defaultValue="00:00"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}

                    />
                </Grid>

                <Grid item xs={1.5} sx={{ mt: 3,mr:2}}>
                    <TextField
                        id="time"
                        label=" End Time"
                        type="time"
                        fullWidth
                        onChange={handleToTimeChange}
                        value={selectedToTime}
                        selected={selectedToTime}
                        defaultValue="00:00"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}

                    />
                </Grid>

            </Grid>
        </Grid>
    );
}
