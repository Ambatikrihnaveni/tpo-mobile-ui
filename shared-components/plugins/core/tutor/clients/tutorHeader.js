import React from 'react';
import {FormControl,  InputLabel, Select,} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";


const TutorHeader = () => {
    const [age, setAge] = React.useState("");
    return (
        
            <Div>
                <FormControl sx={{ minWidth: 130}} align="center" size="small">
                    <InputLabel id="demo-select-small"  sx={{mt:-0.8}} >Bulk Action</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={age}
                        label="Bulk Action"
                        onChange={(event) => setAge(event.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Approved</MenuItem>
                        <MenuItem value={20}>Pending</MenuItem>
                        <MenuItem value={30}>Cancel</MenuItem>
                    </Select>
                    
                </FormControl>
            </Div>
    );
};

export default TutorHeader;