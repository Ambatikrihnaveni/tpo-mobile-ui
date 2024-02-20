import React from 'react';
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";

const BasicMenu = () => {
    const [age, setAge] = React.useState("");
    return (

        <Div>
            <FormControl sx={{ minWidth: 120, textAlign: 'center' }} size="small">
                <InputLabel id="demo-select-small">Bulk Action</InputLabel>
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
                    <MenuItem value={20}>Pedding</MenuItem>
                    <MenuItem value={30}>Cencel</MenuItem>
                </Select>
            </FormControl>

        </Div>
    );
};

export default BasicMenu;