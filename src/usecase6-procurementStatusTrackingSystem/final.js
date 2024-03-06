import api from '../ApiConfig';
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
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

const UseCase6Final = () => {
    const [message, setMessage] = useState(''); // State variable for the user's message
    const [messages, setMessages] = useState([]); // State variable for GPT-4 messages
    const [fileKey, setFileKey] = useState('');
    const [fileBuffer, setFileBuffer] = useState('');

    // Function to handle sending messages
    const handleSendMessage = () => {
        if (!message) return;

        // Add user message to both message lists
        setMessages([...messages, { text: message, isUser: true }]);
        setMessage('');

        // Define request data for GPT-4 and Amazon Titan
        const requestDataGpt4 = {
            "providerName": "file",
            "modelVersion": "gpt-4-file",
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
                "temperature": 0.7,
                "fileKey": fileKey, //name of the .csv file
                "fileBuffer": fileBuffer //buffer data of .csv file
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
    };

    // Function to handle input change in the message input field
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    const handleFileUpload=(data)=>{
        setFileKey(data.fileKey);
        setFileBuffer(data.fileBuffer);

        const requestData = {
            "providerName": "file",
            "modelVersion": "gpt-4-file",
            "roomId": "roomId",
            "messages": [{
                "content": "",
                "role": "user"
            }],
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7,
                "fileKey": data.fileKey, //name of the .csv file
                "fileBuffer": data.fileBuffer //buffer data of .csv file
            }
        };

        const aiResponse = api.post('/conversations/avm-completion', requestData);
        aiResponse.then((res) => {
            // Add AI response to messages state
            setMessages(messages => [...messages, { text: res.data.message, isUser: false }]);
        })
        .catch((error) => {
            console.log("something went wrong", error)
        });
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

export default UseCase6Final;
