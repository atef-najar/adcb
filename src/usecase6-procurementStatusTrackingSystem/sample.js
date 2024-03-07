import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Box } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';

import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';
import FileUpload from '../components/FileUpload';

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

const UseCase6Sample = () => {
    const [message, setMessage] = useState(''); // State variable for the user's message
    const [messages, setMessages] = useState([]); // State variable for GPT-4 messages

    // Function to handle sending messages
    const handleSendMessage = () => {
        if (!message.trim()) return;

        setMessages([...messages, { text: message, isUser: true }]);
        setMessage('');

        setTimeout(() => {
            const aiResponse = "This is a mock response from AI.";
            // Add AI response to messages state
            setMessages(messages => [...messages, { text: aiResponse, isUser: false }]);
        }, 1000); // Mock response delay
    };

    // Function to handle input change in the message input field
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleFileUpload=(data)=>{
        setTimeout(() => {
            const aiResponse = "This is a mock response from AI.";
            // Add AI response to messages state
            setMessages(messages => [...messages, { text: aiResponse, isUser: false }]);
        }, 1000); // Mock response delay
    }

    return (
        <AppContainer>
            <h1>avm-ai-procurement-status-tracking-system</h1>
            {/* Display message lists for GPT-4 and Amazon Titan */}
            <MessageList messages={messages} />
                
            <Box display='flex' width='100%' alignItems='center'>
                <FileUpload getMessages={handleFileUpload} />
                {/* Render the message input component */}
                <Box width='100%' >
                    <MessageInput
                        message={message}
                        onMessageChange={handleInputChange}
                        onSendMessage={handleSendMessage}
                    />
                </Box>
            </Box>
        </AppContainer>
    );
}

export default UseCase6Sample;