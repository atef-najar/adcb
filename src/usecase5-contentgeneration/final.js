import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from "@mui/material";

// Importing constant colors
import { GRAY_COLORS } from '../constants/colors';

// Importing custom components
import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';
import Settings from '../components/Settings';
import CommandStatement from '../components/CommandStatement';
import TestCaseStatement from '../components/TestCaseStatement';
import CodeConvertion from '../components/CodeConvertion';
import api from '../ApiConfig';
import { SupportedModels } from '../constants/ai-models';

// Styled component for the main application container
const AppContainer = styled(Container)`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    max-width: 700px;
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

// Main component
const UseCase5Final = () => {
    // State variables
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedStatement, setSelectedStatement] = useState('');
    const [selectedCommand, setSelectedCommand] = useState('');

    // Function to handle sending a message
    const handleSendMessage = () => {
        // Check if message is empty
        if (!message) return;

        // Check if selected option is empty
        if (selectedOption === '') return;

        // Check if selected statement requires a command and if it's empty
        if (selectedStatement === "Generate Test Case For" || selectedStatement === "Convert To") {
            if (selectedCommand === '') return;
        }

        // Prepare final statement
        let statement = message + " " + selectedStatement + " " + selectedCommand;

        // Add user message to messages state
        setMessages([...messages, { text: statement, isUser: true }]);

        // Clear message input
        setMessage('');

        // Prepare data for API request
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

        // Send API request
        api.post('/conversations/avm-completion-secure', postData)
            .then(response => {
                // Add AI response to messages
                setMessages(prevMessages => [...prevMessages, { text: response.data["message"], isUser: false }]);
            })
            .catch(error => {
                console.error('Error:', error);
                setTimeout(() => {
                    // Add mock AI response in case of error
                    const aiResponse = "This is a mock response from AI.";
                    setMessages(prevMessages => [...prevMessages, { text: aiResponse, isUser: false }]);
                }, 6000);
            });
    };

    // Function to handle the change in option
    const handleOptionChange = (event) => {
        const selectedModel = SupportedModels.find(model => model.value === event.target.value);
        setSelectedProvider(selectedModel.provider);
        setSelectedOption(event.target.value);
    };

    // Function to handle the change in statement
    const handleStatementChange = (event) => {
        setSelectedCommand('');
        setSelectedStatement(event.target.value);
    };

    // Function to handle the change in command
    const handleCommandChange = (event) => {
        setSelectedCommand(event.target.value);
    };

    // Function to handle input change
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    return (
        <AppContainer>
            <h1>Code Assistant</h1>

            {/* Settings component */}
            <Settings handleOptionChange={handleOptionChange} selectedOption={selectedOption} />
            <br />

            {/* Command statement component */}
            <CommandStatement handleStatementChange={handleStatementChange} selectedStatement={selectedStatement} />
            {selectedStatement === "Generate Test Case For" ?  // Check if the selected statement is "Generate Test Case For"
                <>
                    <br />
                    {/* Render the Test Case Statement component */}
                    <TestCaseStatement handleCommandChange={handleCommandChange} selectedCommand={selectedCommand} />
                </> : null} {/* If the selected statement is not "Generate Test Case For", render nothing */}
            {selectedStatement === "Convert To" ? // Check if the selected statement is "Convert To"
                <>
                    <br />
                    {/* Render the Code Conversion component */}
                    <CodeConvertion handleCommandChange={handleCommandChange} selectedCommand={selectedCommand} />
                </> : null} {/* If the selected statement is not "Convert To", render nothing */}

            {/* Message list component */}
            <MessageList messages={messages} />

            {/* Message input component */}
            <MessageInput
                message={message}
                onMessageChange={handleInputChange}
                onSendMessage={handleSendMessage}
            />
        </AppContainer>
    );
}

export default UseCase5Final;