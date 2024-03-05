import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Convertion } from "../constants/Convertion";

const CodeConvertion = ({ handleCommandChange, selectedCommand }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="language-select-label">Select Language</InputLabel>
            <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedCommand}
                label="Select Language"
                onChange={handleCommandChange}
            >
                <MenuItem value=''>None</MenuItem>
                {Convertion.map(model =>
                    <MenuItem value={model.value}>{model.displayName}</MenuItem>
                )}
                <MenuItem value='Others'>Others</MenuItem>
            </Select>
        </FormControl>
    )
}

export default CodeConvertion;
