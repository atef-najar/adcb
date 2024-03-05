import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';
import MessageList from '../components/MessageList';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AppContainer = styled(Container)`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    max-width: 700px;
    max-height: 80vh;
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const UseCase3Sample = () => {
    const [messages, setMessages] = useState([]);

    const onUploadDocument = async (e) => {
        setTimeout(() => {
            const aiResponse = "This is a mock response from AI.";
            setMessages(messages => [...messages, { text: aiResponse, isUser: false }]);
        }, 1000); // Mock response delay
    };

    return (
            <AppContainer>
                <h1>avm-ai-poweredchat</h1>
                <MessageList messages={messages} />
                <label htmlFor="file-input">
                    <AttachFileIcon sx={{ width: '30px', height: '30px', margin: '10px'}} />
                </label>
                <FileInput
                    type="file"
                    id={'file-input'}
                    name={'file-input'}
                    onChange={onUploadDocument}
                    style={{ display: 'none' }}
                    onClick={(event) => {
                        event.target.value = null;
                    }}
                    accept={
                        '.csv'
                    }
                />
            </AppContainer>
    );
}

export default UseCase3Sample;