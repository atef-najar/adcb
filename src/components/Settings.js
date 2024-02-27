import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {SupportedModels} from "../constants/ai-models";


const Settings = ({ handleOptionChange, selectedOption }) => {
  return (
      <FormControl fullWidth>
          <InputLabel id="settings-select-label">Model</InputLabel>
          <Select
              labelId="settings-select-label"
              id="settings-select"
              value={selectedOption}
              label="Model"
              onChange={handleOptionChange}
          >
              {SupportedModels.map(model =>
                  <MenuItem value={model.value}>{model.displayName}</MenuItem>
              )}
          </Select>
      </FormControl>
  )
}

export default Settings;
