import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Button, Box } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';

import { useNavigate } from 'react-router-dom';
import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';

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

const AiPoweredChat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const navigate = useNavigate()

    const handleSendMessage = () => {
        if (!message) return;

        // Add user message
        setMessages([...messages, { text: message, isUser: true }]);
        setMessage('');

        // Mock AI response after a delay
        setTimeout(() => {
            const aiResponse = "This is a mock response from AI.";
            setMessages(messages => [...messages, { text: aiResponse, isUser: false }]);
        }, 1000); // Mock response delay
    };

    const handleNavigate = () => {
        navigate('/')
    }

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" margin={2}>
                <Button onClick={handleNavigate} variant="contained" color="primary">Home</Button>
            </Box>
            <AppContainer>
                <h1>avm-ai-poweredchat</h1>
                <MessageList messages={messages} />
                <MessageInput
                    message={message}
                    onMessageChange={handleInputChange}
                    onSendMessage={handleSendMessage}
                />
            </AppContainer>
        </>
    );
}

export default AiPoweredChat;