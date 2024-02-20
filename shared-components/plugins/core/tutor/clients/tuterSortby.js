import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {FormControl, InputLabel, Select, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";



const TutorSort = () => {
    const [age, setAge] = React.useState("");
    return (
        
            <Div>
                <FormControl sx={{ minWidth: 120,}}  align="center" size="small">
                    <InputLabel id="demo-select-small"  sx={{mt:-0.8,ml:2}}  align="center">DESC</InputLabel>
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
                        <MenuItem value={10}>January</MenuItem>
                        <MenuItem value={20}>February</MenuItem>
                        <MenuItem value={30}>March</MenuItem>
                    </Select>
                </FormControl>
            </Div>
    );
};

export default TutorSort;