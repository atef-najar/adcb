// Import necessary React hooks and components
import React, { useState } from "react";
// Import custom components for displaying messages and input
import MessageList from "./components/MessageList";
import MessageInput from "./components/Input";
// Import styled-components for custom styling
import styled from "@emotion/styled";
import { Container } from "@mui/material"; // Material UI container for layout
// Import constants for color values
import { GRAY_COLORS } from "./constants/colors";

// Import settings component for AI model selection
import Settings from "./components/Settings";
// Import API configuration for backend communication
import api from "./ApiConfig";
// Import supported AI models for dropdown selection
import { SupportedModels } from "./constants/ai-models";

// Define the main application container with styled-component for specific styling
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

// Main App component
const App = () => {
  // State hooks for managing the message, message list, AI model, and API settings
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedProvider, setSelectedProvider] = useState({});
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);

  // Function to send request data to the API for AI response
  const getAiResponse = (requestData) => {
    return api.post("/conversations/avm-completion", requestData);
  };

  // Function to handle sending a message and receiving an AI response
  const handleSendMessage = async () => {
    if (!message) return; // Prevent sending empty messages

    // Add the user's message to the messages list and clear the input
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");

    // Prepare request data for the API call
    const requestData = {
      providerName: selectedProvider,
      modelVersion: selectedOption,
      roomId: "12345",
      messages: [...messages, { text: message, isUser: true }].map(
        (message) => {
          return {
            content: message.text,
            role: message.isUser ? "user" : "system",
          };
        },
      ),
      settings: {
        maxTokens: maxTokens,
        temperature: temperature,
      },
    };

    // Get AI response and add it to the messages list
    const aiResponse = await getAiResponse(requestData);
    const {
      data: { message: aiMessage },
    } = aiResponse;

    setMessages((messages) => [
      ...messages,
      { text: aiMessage, isUser: false },
    ]);
  };

  // Handlers for changing settings (AI model option, temperature, max tokens)
  const handleOptionChange = (event) => {
    const selectedModel = SupportedModels.find(
      (model) => model.value === event.target.value,
    );
    setSelectedProvider(selectedModel.provider);
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  // Render the app layout with settings, message list, and message input
  return (
    <AppContainer>
      <h1>avm-genai-starter</h1>
      <Settings
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
        includeSliders={true}
        temperature={temperature}
        setTemperature={setTemperature}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
      />
      <MessageList messages={messages} />
      <MessageInput
        message={message}
        onMessageChange={handleInputChange}
        onSendMessage={handleSendMessage}
      />
    </AppContainer>
  );
};

// Export the App component for use in other parts of the application
export default App;
