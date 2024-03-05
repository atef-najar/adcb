import React, { useState } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';
import styled from '@emotion/styled';
import { Container } from "@mui/material";

import { GRAY_COLORS } from '../constants/colors';

import Settings from '../components/Settings';
import CommandStatement from '../components/CommandStatement';
import TestCaseStatement from '../components/TestCaseStatement';
import CodeConvertion from '../components/CodeConvertion';
import api from '../ApiConfig';
import { SupportedModels } from '../constants/ai-models';

const AppContainer = styled(Container)`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    max-width: 700px;
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

const CodeingAssistantMain = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedStatement, setSelectedStatement] = useState('');
    const [selectedCommand, setSelectedCommand] = useState('');

    const handleSendMessage = () => {
        if (!message) return;
        if (selectedOption === '') return;
        if (selectedStatement === "Generate Test Case For" || selectedStatement === "Convert To") {
            if (selectedCommand === '') return;
        }
        let statement = message + " " + selectedStatement + " " + selectedCommand;
        setMessages([...messages, { text: statement, isUser: true }]);
        setMessage('');

        const postData = {
            "providerName": selectedProvider,
            "modelVersion": selectedOption,
            "roomId": "12345",
            "messages": [
                {
                    "content": statement,
                    "role": "user",
                }
            ],
            "settings": {
                "maxTokens": 1024,
                "temperature": 0.5
            }
        };

        api.post('/conversations/avm-completion-secure', postData)
            .then(response => {
                // Add user message
                // setMessages([...messages, { text: response.data["message"], isUser: false }]);
                setMessages(prevMessages => [...prevMessages, { text: response.data["message"], isUser: false }]);
            })
            .catch(error => {
                console.error('Error:', error);
                setTimeout(() => {
                    const aiResponse = "This is a mock response from AI.";
                    // setMessages(messages => [...messages, { text: aiResponse, isUser: false }]);
                    setMessages(prevMessages => [...prevMessages, { text: aiResponse, isUser: false }]);
                }, 6000);
            });
    };


    const handleOptionChange = (event) => {
        const selectedModel = SupportedModels.find(model => model.value === event.target.value);
        setSelectedProvider(selectedModel.provider);
        setSelectedOption(event.target.value);
    };

    const handleStatementChange = (event) => {
        setSelectedCommand('');
        setSelectedStatement(event.target.value);
    };

    const handleCommandChange = (event) => {
        setSelectedCommand(event.target.value);
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <AppContainer>
            <h1>Code Assistant</h1>

            <Settings handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
            <br />
            <CommandStatement handleStatementChange={handleStatementChange} selectedStatement={selectedStatement} />
            {selectedStatement === "Generate Test Case For" ?
                <>
                    <br />
                    <TestCaseStatement handleCommandChange={handleCommandChange} selectedCommand={selectedCommand} />
                </> : null}
            {selectedStatement === "Convert To" ?
                <>
                    <br />
                    <CodeConvertion handleCommandChange={handleCommandChange} selectedCommand={selectedCommand} />
                </> : null}

            <MessageList messages={messages} />
            <MessageInput
                message={message}
                onMessageChange={handleInputChange}
                onSendMessage={handleSendMessage}
            />
        </AppContainer>
    );
}

export default CodeingAssistantMain;