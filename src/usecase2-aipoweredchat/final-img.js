import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';
import { SupportedModels } from "../constants/ai-models";

import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';

import api from "../ApiConfig";

const API_ENDPOINT = "/conversations/avm-completion-secure";
const MODEL = SupportedModels[SupportedModels.length - 1]; // Change the model here.
const MAX_TOKENS = 2048;
const TEMPERATURE = 0.9;

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

const UseCase2FinalImage = () => {
    const [message, setMessage] = useState(''); // State variable for the user's message
    const [messages, setMessages] = useState([]); // State variable for GPT-4 messages

    const getAiResponse = (requestData) => {
        return api.post(API_ENDPOINT, requestData);
      };

    // Function to handle sending messages
    const handleSendMessage = async () => {
        if (!message.trim()) return;

        // Add user message
        const newMessagesArray = [...messages];
        newMessagesArray.push({ text: message, isUser: false });
        setMessages([...newMessagesArray]);
        setMessage('');

        // Prepare request data for the API call
        const requestData = {
          providerName: MODEL.provider,
          modelVersion: MODEL.value,
          // We map the messages array to match the schema described in the README.md
          messages: newMessagesArray.map((message) => {
            return {
              content: message.text,
              role: "system",
            };
          }),
          settings: {
            maxTokens: MAX_TOKENS,
            temperature: TEMPERATURE,
          },
        };

        newMessagesArray.push({ text: "", isUser: true, loading: true });
        setMessages([...newMessagesArray]);

        const aiResponse = await getAiResponse(requestData);
            const {
              data: { message: aiMessage },
            } = aiResponse;

             newMessagesArray[newMessagesArray.length - 1] = {
                  text: aiMessage,
                  isUser: false,
                };

                // setting the latest state
                setMessages([...newMessagesArray]);
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <AppContainer>
            <h1>avm-ai-poweredchat</h1>
            <MessageList messages={messages} provider={MODEL.provider}/>
            <MessageInput
                message={message}
                onMessageChange={handleInputChange}
                onSendMessage={handleSendMessage}
            />
        </AppContainer>
    );
}

export default UseCase2FinalImage;