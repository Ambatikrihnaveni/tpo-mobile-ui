import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {FormControl, InputLabel, Select, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";

const TutorCourse = () => {
    const [age, setAge] = React.useState("");
    return (
        
            <Div>
                <FormControl sx={{minWidth: 120,align:"center"}}  size="small">
                    <InputLabel id="demo-select-small"  sx={{mt:-0.8}} >All Courses</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label="All Courses"
                        onChange={(event) => setAge(event.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>HTML</MenuItem>
                        <MenuItem value={20}>CSS</MenuItem>
                        <MenuItem value={30}>JAVASCRIPT</MenuItem>
                    </Select>
                </FormControl>
            </Div>
    );
};

export default TutorCourse;