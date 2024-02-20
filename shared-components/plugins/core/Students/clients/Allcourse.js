import React from 'react';
import JumboDemoCard from "@jumbo/components/JumboDemoCard";
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";
import Button from '@mui/material/Button';

const King = () => {
    const [age, setAge] = React.useState("");
    return (

        <Div>
            <FormControl sx={{ minWidth: 120, textAlign: 'center' }} size="small">
                <InputLabel id="demo-select-small">Courses</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    label="Bulk Action"
                    onChange={(event) => setAge(event.target.value)}
                >
                    <MenuItem value="">

                    </MenuItem>
                    <MenuItem value={10}>Python</MenuItem>
                    <MenuItem value={20}>PHP</MenuItem>
                    <MenuItem value={30}>Java Script</MenuItem>
                    <MenuItem value={40}>All</MenuItem>
                </Select>
            </FormControl>

        </Div>
    );
};

export default King;