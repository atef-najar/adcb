import React from 'react';
import { Button, Box, TextField} from '@mui/material';
import styled from "@emotion/styled";
import {COLOR_PRIMARY} from "../constants/colors";

const StyledInputContainer = styled(Box)`
  flex-direction: column;
  margin: 0 0 12px 0;
`;

const StyledInputElement = styled(TextField)`
    width: 100%;
    border-radius: 30px;
    max-height: 100px;
    border-color: ${COLOR_PRIMARY};
`;

const MessageInput = ({ message, onMessageChange, onSendMessage }) => {
    return (
        <StyledInputContainer display="flex" justifyContent="center" margin={2}>
            <StyledInputElement
                value={message}
                onChange={onMessageChange}
                placeholder="Type your message here..."
                fullWidth
                margin="normal"
                onKeyDown={({ key, shiftKey }) => {
                    // if shift and enter are pressed, default behaviour should happen(new line in text box)
                    if (key === 'Enter' && shiftKey) {
                        return;
                    }

                    if (key === 'Enter') {
                        onSendMessage()
                    }
                }}
                InputProps={{
                    endAdornment: (
                        <Button variant="contained" color="primary" onClick={onSendMessage}>
                            Send
                        </Button>
                    ),
                }}
            />
        </StyledInputContainer>
    );
}

export default MessageInput;
