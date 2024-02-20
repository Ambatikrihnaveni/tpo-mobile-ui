import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";

const Raju = () => {
    const [age, setAge] = React.useState("");
    return (
        
            <Div>
                <FormControl sx={{ minWidth: 120,textAlign:'center'}} size="small">
                    <InputLabel id="demo-select-small">SortBy</InputLabel>
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
                        <MenuItem value={10}>Java Script</MenuItem>
                        <MenuItem value={20}>Python</MenuItem>
                        <MenuItem value={30}>PHP</MenuItem>
                    </Select>
                </FormControl>

            </Div>
    );
};

export default Raju;