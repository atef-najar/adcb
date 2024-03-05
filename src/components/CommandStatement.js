import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Commands } from "../constants/Commands";

const CommandStatement = ({ handleStatementChange, selectedStatement }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="command-select-label">Select Command</InputLabel>
            <Select
                labelId="command-select-label"
                id="command-select"
                value={selectedStatement}
                label="Select Command"
                onChange={handleStatementChange}
            >
                <MenuItem value=''>None</MenuItem>
                {Commands.map(model =>
                    <MenuItem value={model.value}>{model.displayName}</MenuItem>
                )}
                <MenuItem value='Others'>Others</MenuItem>
            </Select>
        </FormControl>
    )
}

export default CommandStatement;
