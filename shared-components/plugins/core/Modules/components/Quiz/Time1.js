import React from 'react';
import { FormControl, InputLabel, Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Div from "@jumbo/shared/Div";

const King = () => {
    const [Time, setTime] = React.useState("");
    return (

        <Div>
            <FormControl sx={{ minWidth: 120, textAlign: 'center' }} size="small">
                <InputLabel id="demo-select-small"> minutes</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={Time}
                    label="minutes"
                    onChange={(event) => setTime(event.target.value)}
                >
                    <MenuItem value="">

                    </MenuItem>
                    <MenuItem value={10}>10 minutes</MenuItem>
                    <MenuItem value={20}>20 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                </Select>
            </FormControl>

        </Div>
    );
};

export default King;