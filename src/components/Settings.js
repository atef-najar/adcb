import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Collapse,
  FormControlLabel,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { SupportedModels } from "../constants/ai-models";
import { COLOR_PRIMARY, GRAY_COLORS } from "../constants/colors";

export const CustomSlider = styled(Slider)`
  height: 2px;

  .MuiSlider-track {
    border: none;
  }

  .MuiSlider-rail {
    background-color: ${GRAY_COLORS.GRAY_500};
  }

  .MuiSlider-thumb {
    background-color: ${COLOR_PRIMARY};
    width: 12px;
    height: 16px;
    border-radius: 2px;
  }

  .MuiSlider-valueLabel {
    background-color: transparent;
    top: 45px;
    color: ${GRAY_COLORS.GRAY_500};
  }
`;

const Settings = ({
  handleOptionChange,
  selectedOption,
  includeSliders,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
}) => {
  const [areSlidersVisible, setAreSlidersVisible] = useState(false);

  const handleChange = () => {
    setAreSlidersVisible((prev) => !prev);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="settings-select-label">Model</InputLabel>
      <Select
        sx={{ marginBottom: "12px" }}
        labelId="settings-select-label"
        id="settings-select"
        value={selectedOption}
        label="Model"
        onChange={handleOptionChange}
      >
        {SupportedModels.map((model) => (
          <MenuItem value={model.value}>{model.displayName}</MenuItem>
        ))}
      </Select>

      <FormControlLabel
        control={<Switch checked={areSlidersVisible} onChange={handleChange} />}
        label="Show advanced settings"
      />

      {includeSliders && (
        <Collapse in={areSlidersVisible}>
          <Typography>Temperature</Typography>
          <CustomSlider
            sx={{ marginBottom: "12px" }}
            min={0}
            max={2}
            step={0.1}
            onChange={(event, value) => {
              setTemperature(value);
            }}
            value={temperature}
            valueLabelDisplay={"on"}
          />

          <Typography>Maximum Tokens</Typography>
          <CustomSlider
            min={128}
            max={2048}
            step={10}
            onChange={(event, value) => {
              setMaxTokens(value);
            }}
            value={maxTokens}
            valueLabelDisplay={"on"}
          />
        </Collapse>
      )}
    </FormControl>
  );
};

export default Settings;
