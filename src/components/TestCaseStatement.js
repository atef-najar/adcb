import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TestCases } from "../constants/TestCases";

const TestCaseStatement = ({ handleCommandChange, selectedCommand }) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="test-select-label">Select Framework</InputLabel>
            <Select
                labelId="test-select-label"
                id="test-select"
                value={selectedCommand}
                label="Select Framework"
                onChange={handleCommandChange}
            >
                <MenuItem value=''>None</MenuItem>
                {TestCases.map(model =>
                    <MenuItem value={model.value}>{model.displayName}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
}

export default TestCaseStatement;
