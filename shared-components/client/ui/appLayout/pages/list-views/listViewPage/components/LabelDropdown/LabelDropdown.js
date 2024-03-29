import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useQuery} from "react-query";
import {useNavigate} from "react-router-dom";
import {recordService} from "../../../../../services/record-services";

const LabelDropdown = () => {
    const navigate = useNavigate();
    const [label, setLabel] = React.useState("");
    const {data: labelQuery} = useQuery("record-label-list", recordService.getLabels);

    return (
        <React.Fragment>
            <FormControl sx={{width: 120}} size={"small"}>
                <InputLabel>Label</InputLabel>
                <Select
                    value={label}
                    label="Label"
                    onChange={(event) => setLabel(event.target.value)}
                >
                    <MenuItem value="">
                        <em>Select Label</em>
                    </MenuItem>
                    {
                        labelQuery?.labels?.map((label, index) => (
                            <MenuItem
                                key={index}
                                value={label}
                                onClick={() => navigate(`/app/records/label/${label?.id}`)}
                            >
                                {label?.name}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </React.Fragment>
    );
};
export default LabelDropdown;
