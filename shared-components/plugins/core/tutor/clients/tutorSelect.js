import React from 'react';
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";

const SelectSmall = () => {
    const [age, setAge] = React.useState("");
    return (
        
            <Div>
                <FormControl sx={{m: 1, minWidth: 120,}} align="center" size="small">
                    <InputLabel id="demo-select-small" align="center"  sx={{mt:-0.8}}  >Approved</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label="Approved"
                        onChange={(event) => setAge(event.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10} >Approved</MenuItem>
                        <MenuItem value={20} >Pending</MenuItem>
                        <MenuItem value={30}>Cancel</MenuItem>
                    </Select>
                </FormControl>
            </Div>
    );
};

export default SelectSmall;