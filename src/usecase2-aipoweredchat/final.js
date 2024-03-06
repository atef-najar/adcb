import api from '../ApiConfig';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container,  Box } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';

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

const UseCase2Final = () => {
    const [message, setMessage] = useState(''); // State variable for the user's message
    const [messages, setMessages] = useState([]); // State variable for GPT-4 messages
    const [amazonTitanMessages, setAmazonTitanMessages] = useState([]); // State variable for Amazon Titan messages
    const [userMessages, setUserMessages] = useState([]);

    // Function to handle sending messages
    const handleSendMessage = () => {
        if (!message) return;

        // Add user message to both message lists
        setMessages([...messages, { text: message, isUser: true }]);
        setAmazonTitanMessages([...amazonTitanMessages, { text: message, isUser: true }]);
        setMessage('');

        console.log(userMessages,"userMessages")
        // Define request data for GPT-4 and Amazon Titan
        const requestDataGpt4 = {
            "providerName": "open_ai",
            "modelVersion": "gpt-4",
            "roomId": "roomId",
            "messages": [...messages, { text: message, isUser: true }].map(
                (message) => {
                  return {
                    content: message.text,
                    role: message.isUser ? "user" : "system",
                  };
                },
              ),
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7
            }
        };

        const requestDataAmazonTitan = {
            "providerName": "amazon",
            "modelVersion": "amazon.titan-text-express-v1",
            "roomId": "roomId",
            "messages":  [...amazonTitanMessages, { text: message, isUser: true }].map(
                (message) => {
                  return {
                    content: message.text,
                    role: message.isUser ? "user" : "system",
                  };
                },
              ),
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7
            }
        };

        // Function to make API request and update message list
        const getAiResponse = (requestData, messagesData) => {
            const aiResponse = api.post('/conversations/avm-completion', requestData);
            aiResponse.then((res) => {
                messagesData(currentState => [...currentState, { text: res.data.message, isUser: false }]);
            })
            .catch((error) => {
                console.log("something went wrong", error)
            });
        }

        // Make API requests for GPT-4 and Amazon Titan
        getAiResponse(requestDataGpt4, setMessages);
        getAiResponse(requestDataAmazonTitan, setAmazonTitanMessages);
    };

    // Function to handle input change in the message input field
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <AppContainer>
            <h1>avm-ai-poweredchat</h1>
            {/* Display message lists for GPT-4 and Amazon Titan */}
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
            {/* Render the message input component */}
            <MessageInput
                message={message}
                onMessageChange={handleInputChange}
                onSendMessage={handleSendMessage}
            />
        </AppContainer>
    );
}

export default UseCase2Final;