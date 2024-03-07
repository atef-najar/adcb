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
    max-height: auto;
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

const StyledFileInput = styled.div`
    text-align: center;
    border: 3px dashed rgb(210, 227, 244);
    padding: 1.5rem;
    position: relative;
    cursor: pointer;
    p {
        font-size: 0.87rem;
        margin-top: 10px;
        color: #bbcada;
    }
    input {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        cursor: pointer;
    }  
`

const UseCase3Sample = () => {
    // State to store messages
    const [messages, setMessages] = useState([]);

    // Function to handle file upload (mocked response for demonstration)
    const onUploadDocument = async (e) => {
        setTimeout(() => {
            const aiResponse = "This is a mock response from AI.";
            // Add AI response to messages state
            setMessages(messages => [...messages, { text: aiResponse, isUser: false }]);
        }, 1000); // Mock response delay
    };

    return (
        <AppContainer>
            <h1>avm-ai-email-automation</h1>
            {/* Component to display messages */}
            <MessageList messages={messages} />
            {/* File upload button */}
            <StyledFileInput >
                <AttachFileIcon sx={{ width: '30px', height: '30px', margin: '10px' }} />
                <h3>Click box to upload</h3>
                <p>Maximun file size 10mb</p>
                <input type="file" id={'file-input'}
                    name={'file-input'}
                    onChange={onUploadDocument} accept={'.csv'} />
            </StyledFileInput>
        </AppContainer>
    );
}

export default UseCase3Sample;
