import React, { useState } from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/Input';
import styled from '@emotion/styled';
import { Container, Button, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom/dist';

import { GRAY_COLORS } from '../constants/colors';

import Settings from '../components/Settings';
import CommandStatement from '../components/CommandStatement';
import TestCaseStatement from '../components/TestCaseStatement';
import CodeConvertion from '../components/CodeConvertion';
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

const CodeingAssistantSample = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [selectedStatement, setSelectedStatement] = useState('');
    const [selectedCommand, setSelectedCommand] = useState('');
    const navigate = useNavigate();

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

    const handleAssistant = () => {
        navigate('/UseCase5/final')
    }

    return (
        <>
            <Box display="flex" justifyContent="flex-end" margin={2}>
                <Button onClick={handleAssistant} variant="contained" color="primary">Codeing Assistant Main</Button>
            </Box>

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
        </>
    );
}

export default CodeingAssistantSample;