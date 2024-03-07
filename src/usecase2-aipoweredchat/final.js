import api from '../ApiConfig';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container,  Box } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';

import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';

// Styling the main container using styled components
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

/* This is the main component which is used for rendering data */
const UseCase2Final = () => {
    const [message, setMessage] = useState(''); // State variable for the user's message
    const [messages, setMessages] = useState([]); // State variable for GPT-4 messages
    const [amazonTitanMessages, setAmazonTitanMessages] = useState([]); // State variable for Amazon Titan messages

    /* Function to handle sending messages
    This Function is responsible for passing message to LLM and handling messages to show in chat */
    const handleSendMessage = () => {
        if (!message.trim()) return; // If the message is empty, return

        /* Add user message to both message lists */
        // for gpt-4
        const newMessagesArray = [...messages]; // creating new array for storing messages from state
        newMessagesArray.push({ text: message, isUser: true }); // pushing latest message from user into messagelist
        setMessages([...newMessagesArray]); //setting updated message array to the state

        // for amazon titan
        const newAmazonMessagesArray = [...amazonTitanMessages]; // creating new array for storing messages from state
        newAmazonMessagesArray.push({ text: message, isUser: true }); // pushing latest message from user into messagelist
        setAmazonTitanMessages([...newAmazonMessagesArray]); //setting updated message array to the state
        
        // Clear the input
        setMessage('');

        // Define request data for GPT-4
        const requestDataGpt4 = {
            "providerName": "open_ai", // providing provider's name statically because we don't provide an option to select the model in UI.
            "modelVersion": "gpt-4", // providing provider's name statically because we don't provide an option to select the model in UI.
            "roomId": "12345", //roomID which is provided static
            "messages": newMessagesArray.map( // looping through message array to provide context to the LLM API, So that it can have context to the previous questions
                (message) => {
                  return {
                    content: message.text, //question to be asked to LLM API
                    role: message.isUser ? "user" : "system", // Is this message from user or from system
                  };
                },
              ),
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7
            }
        };

        // Define request data for Amazon Titan
        const requestDataAmazonTitan = {
            "providerName": "amazon", // providing provider's name statically because we don't provide an option to select the model in UI.
            "modelVersion": "amazon.titan-text-express-v1", // providing provider's name statically because we don't provide an option to select the model in UI.
            "roomId": "roomId", //roomID which is provided static
            "messages":  newAmazonMessagesArray.map( // looping through message array to provide context to the LLM API, So that it can have context to the previous questions
                (message) => {
                  return {
                    content: message.text, //question to be asked to LLM API
                    role: message.isUser ? "user" : "system", // Is this message from user or from system
                  };
                },
              ),
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7
            }
        };

        // Add the loading message, this is for the loading state, this is optional
        newMessagesArray.push({ text: "", isUser: false, loading: true });
        setMessages([...newMessagesArray]); //setting updated message array to the state with loading = true
        
        // Add the loading message, this is for the loading state, this is optional
        newAmazonMessagesArray.push({ text: "", isUser: false, loading: true });
        setAmazonTitanMessages([...newAmazonMessagesArray]); //setting updated message array to the state with loading = true
 
        /* Function to make API request and update message list
        Function takes payload data and array of all messages as an arguments,
        calls the LLM API and sets the response in messages array */
        const getAiResponse = (requestData, messagesData, messages) => {
            const aiResponse = api.post('/conversations/avm-completion', requestData);
            aiResponse.then((res) => {
                /* We override the loading message, with the one we got from the API Request
                Only needed because we used the loading state, otherwise we could've simply used this:
                setMessages((messages) => [
                  ...messages,
                  { text: aiMessage, isUser: false },
                ]); */
                messages[messages.length - 1] = {
                    text: res.data.message,
                    isUser: false,
                  };
              
                  // setting the latest state
                  messagesData([...messages]);
            })
            .catch((error) => {
                console.log("something went wrong", error)
            });
        }

        // Make API requests for GPT-4 and Amazon Titan
        getAiResponse(requestDataGpt4, setMessages, newMessagesArray); //for GPT-4
        getAiResponse(requestDataAmazonTitan, setAmazonTitanMessages, newAmazonMessagesArray); //for Amazon Titan
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