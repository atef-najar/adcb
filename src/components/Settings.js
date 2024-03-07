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

// Custom styled Slider component with specific color and size adjustments
export const CustomSlider = styled(Slider)`
  height: 2px; // Custom height for the slider track

  .MuiSlider-track {
    border: none; // Removes default border
  }

  .MuiSlider-rail {
    background-color: ${GRAY_COLORS.GRAY_500}; // Custom rail color
  }

  .MuiSlider-thumb {
    background-color: ${COLOR_PRIMARY}; // Custom thumb color
    width: 12px; // Custom thumb width
    height: 16px; // Custom thumb height
    border-radius: 2px; // Custom thumb border radius
  }

  .MuiSlider-valueLabel {
    background-color: transparent; // Custom label background
    top: 45px; // Adjusts the position of the label
    color: ${GRAY_COLORS.GRAY_500}; // Custom label color
  }
`;

// Main settings component with props for handling state and events
const Settings = ({
  handleOptionChange, // Function to handle model selection change
  selectedOption, // Currently selected model
  includeSliders, // Boolean to determine if sliders should be included
  temperature, // State for the "temperature" setting
  setTemperature, // Function to update the temperature
  maxTokens, // State for the "max tokens" setting
  setMaxTokens, // Function to update the max tokens
}) => {
  // Local state to toggle visibility of sliders
  const [areSlidersVisible, setAreSlidersVisible] = useState(false);

  // Function to toggle the areSlidersVisible state
  const handleToggleSlidersVisibility = () => {
    setAreSlidersVisible((prev) => !prev);
  };

  return (
    <FormControl fullWidth>
      {/* Model selection dropdown */}
      <InputLabel id="settings-select-label">Model</InputLabel>
      <Select
        sx={{ marginBottom: "12px" }} // Adds bottom margin for spacing
        labelId="settings-select-label"
        id="settings-select"
        value={selectedOption} // Controlled component with current selection
        label="Model" // Label for accessibility
        onChange={handleOptionChange} // Handler for change event
      >
        {/* Map over supported models and render as options */}
        {SupportedModels.map((model) => (
          <MenuItem value={model.value}>{model.displayName}</MenuItem>
        ))}
      </Select>

      {/* Toggle switch for showing/hiding advanced settings */}
      <FormControlLabel
        control={
          <Switch
            checked={areSlidersVisible}
            onChange={handleToggleSlidersVisibility}
          />
        }
        label="Show advanced settings"
      />

      {/* Conditionally rendered sliders for advanced settings */}
      {includeSliders && (
        <Collapse in={areSlidersVisible}>
          {/* Temperature slider */}
          <Typography>Temperature</Typography>
          <CustomSlider
            sx={{ marginBottom: "12px" }} // Adds bottom margin for spacing
            min={0}
            max={2}
            step={0.1} // Step value for slider
            onChange={(event, value) => {
              setTemperature(value); // Update temperature on change
            }}
            value={temperature} // Controlled value for the slider
            valueLabelDisplay={"on"} // Displays the slider's value
          />

          {/* Maximum tokens slider */}
          <Typography>Maximum Tokens</Typography>
          <CustomSlider
            min={128}
            max={2048}
            step={10} // Step value for slider
            onChange={(event, value) => {
              setMaxTokens(value); // Update max tokens on change
            }}
            value={maxTokens} // Controlled value for the slider
            valueLabelDisplay={"on"} // Displays the slider's value
          />
        </Collapse>
      )}
    </FormControl>
  );
};

// Export the Settings component for use elsewhere in the application
export default Settings;
