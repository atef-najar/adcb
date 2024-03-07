import api from '../ApiConfig';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Box } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';

import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';
import FileUpload from '../components/FileUpload';

// Styling the main container using styled components
const AppContainer = styled(Container)`
    margin-top: 120px;
    display: flex;
    flex-direction: column; 
    max-width: 700px;
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

/* This is the main component which is used for rendering data */
const UseCase6Final = () => {

    // States to store messages
    const [message, setMessage] = useState(''); // State variable for the user's message
    const [messages, setMessages] = useState([]); // State variable for GPT-4 messages
    const [fileKey, setFileKey] = useState(''); // Value of fileKey which is name of file
    const [fileBuffer, setFileBuffer] = useState(''); // Value of fileBuffer which is buffer data of csv file (base64 encoded) 

    /* Function to handle sending messages
    This Function is responsible for passing message to LLM and handling messages to show in chat */
    const handleSendMessage = () => {
        if (!message.trim()) return; // If the message is empty, return

        // Add user message to message lists
        const newMessagesArray = [...messages]; // creating new array for storing messages from state
        newMessagesArray.push({ text: message, isUser: true }); // pushing latest message from user into messagelist
        setMessages([...newMessagesArray]); //setting updated message array to the state
        setMessage(''); // Clear the input

        // Define request data for GPT-4-file
        const requestDataGpt4 = {
            "providerName": "file", // using file provider because of file uploading
            "modelVersion": "gpt-4-file", // using file model to use file upload option
            "roomId": "12345", // static room key
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
                "temperature": 0.7,
                "fileKey": fileKey, //name of the .csv file
                "fileBuffer": fileBuffer //buffer data of .csv file
            }
        };

        // Add the loading message, this is for the loading state, this is optional
        newMessagesArray.push({ text: "", isUser: false, loading: true });
        setMessages([...newMessagesArray]); //setting updated message array to the state with loading = true

        // Function to make API request and update message list
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

        // Make API requests for GPT-4-file
        getAiResponse(requestDataGpt4, setMessages, newMessagesArray);
    };

    // Function to handle input change in the message input field
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    /* Function to handle file upload
    Function is used to upload file and extract data from the file like file name, file buffer data (base64 encoded).
    and pass the file to the LLM API and set response accordingly. */
    const handleFileUpload=(data)=>{
        setFileKey(data.fileKey); // setting file key from data which is file name
        setFileBuffer(data.fileBuffer); // setting file buffer from data which is base64 encoded

        // Add the loading message, this is for the loading state, this is optional
        const newMessagesArray = [...messages]; // creating new array for storing messages from state
        setMessages([...newMessagesArray]); //setting updated message array to the state

        // Define request data for GPT-4-file
        const requestData = {
            "providerName": "file", // using file provider because of file uploading
            "modelVersion": "gpt-4-file", // using file model to use file upload option
            "roomId": "12345", // static room key
            "messages": [{
                "content": "", // Not Asking any questions because we just want LLM API to get through our data
                "role": "user" // role is user because we are uploading file 
            }],
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.7,
                "fileKey": data.fileKey, //name of the .csv file
                "fileBuffer": data.fileBuffer //buffer data of .csv file
            }
        };

        // Add the loading message, this is for the loading state, this is optional
        newMessagesArray.push({ text: "", isUser: false, loading: true });
        setMessages([...newMessagesArray]); //setting updated message array to the state with loading = true
        
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
        // Make API requests for GPT-4-file
        getAiResponse(requestData, setMessages, newMessagesArray);
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
