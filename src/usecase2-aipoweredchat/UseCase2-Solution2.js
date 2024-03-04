import api from '../ApiConfig';
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
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

const AiPoweredChat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [amazonTitanMessages, setAmazonTitanMessages] = useState([]);
    const navigate = useNavigate()

    const handleSendMessage = () => {
        if (!message) return;

        // Add user message
        setMessages([...messages, { text: message, isUser: true }]);
        setAmazonTitanMessages([...amazonTitanMessages, { text: message, isUser: true }]);
        setMessage('');

        
        const requestDataGpt4 = {
            "providerName": "open_ai",
            "modelVersion": "gpt-4",
            "roomId": "roomId",
            "messages": [{
                "content": message,
                "role": "user"
            }],
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7
            }
        };

        const requestDataAmazonTitan = {
            "providerName": "amazon",
            "modelVersion": "amazon.titan-text-express-v1",
            "roomId": "roomId",
            "messages": [{
                "content": message,
                "role": "user"
            }],
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7
            }
        };

        const getAiResponse = (requestData, messagesData) => {
            const aiResponse = api.post('/conversations/avm-completion', requestData);
            aiResponse.then((res) => {
                messagesData(currentState => [...currentState, { text: res.data.message, isUser: false }]);
            })
            .catch((error) => {
                console.log("something went wrong", error)
            });
        }

        getAiResponse(requestDataGpt4, setMessages);
        getAiResponse(requestDataAmazonTitan, setAmazonTitanMessages);
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
                <Box display='flex' justifyContent='space-between' gap='1rem' >
                    <Box width='100%' >
                        <h3>GPT-4</h3>
                        <MessageList messages={messages} />
                    </Box>
                    <Box width='100%' >
                        <h3>Titan Text Large</h3>
                        <MessageList messages={amazonTitanMessages} />
                    </Box>
                </Box>
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