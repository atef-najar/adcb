import React from "react";
import { Button, Box, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { COLOR_PRIMARY } from "../constants/colors";

// Styled component for the input container with specific margin and flex direction
const StyledInputContainer = styled(Box)`
  flex-direction: column;
  margin: 0 0 12px 0;
`;

// Styled component for the input element with custom width, border radius, max height, and border color
const StyledInputElement = styled(TextField)`
  width: 100%;
  border-radius: 30px;
  max-height: 100px;
  border-color: ${COLOR_PRIMARY};
`;

// Functional component for message input handling props for message state and event handlers
const MessageInput = ({ message, onMessageChange, onSendMessage }) => {
  return (
    // Use the styled container with flex display and center alignment, applying a margin
    <StyledInputContainer display="flex" justifyContent="center" margin={2}>
      {/* Text input field styled with custom properties and handling change and key down events */}
      <StyledInputElement
        multiline
        maxRows={5}
        value={message} // Controlled input field value
        onChange={onMessageChange} // Function to call on input change
        placeholder="Type your message here..." // Placeholder text for the input
        fullWidth // Make the input take the full width of its parent
        margin="normal" // Apply normal margin around the input
        onKeyDown={({ key, shiftKey }) => {
          // Special handling for Enter key press with and without Shift key
          if (key === "Enter" && shiftKey) {
            // If Shift + Enter is pressed, allow default behavior (e.g., new line)
            return;
          }

          if (key === "Enter") {
            // If Enter is pressed without Shift, trigger the send message function
            onSendMessage();
          }
        }}
        InputProps={{
          // Add a Send button as the end adornment of the input
          endAdornment: (
            <Button variant="contained" color="primary" onClick={onSendMessage}>
              Send
            </Button>
          ),
        }}
      />
    </StyledInputContainer>
  );
};

// Export the MessageInput component for use in other parts of the application
export default MessageInput;
