// Import necessary React hooks and components
import React, { useState } from "react";
// Import custom components for displaying messages and input
import MessageList from "./components/MessageList";
import MessageInput from "./components/Input";
// Import styled-components for custom styling
import styled from "@emotion/styled";
import { Box, Container, IconButton, Tooltip } from "@mui/material"; // Material UI container for layout, Box (which is a simple div) and Tooltip
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep"; //  Material UI icon
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
  height: fit-content;
`;

// Main App component
const App = () => {
  // State hooks for managing the message, message list, AI model, and API settings
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState(
    SupportedModels[0].value,
  );
  const [selectedProvider, setSelectedProvider] = useState(
    SupportedModels[0].provider,
  );
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);

  // Function to send request data to the API for AI response
  const getAiResponse = (requestData) => {
    return api.post("/conversations/avm-completion", requestData);
  };

  console.log("messages ------------------->> ", messages);
  // Function to handle sending a message and receiving an AI response
  const handleResetState = () => {
    setMessage("");
    setMessages([]);
    setSelectedOption(SupportedModels[0].value);
    setSelectedProvider(SupportedModels[0].provider);
  };

  // Function to handle sending a message and receiving an AI response
  const handleSendMessage = async () => {
    if (!message) return; // Prevent sending empty messages

    // Add the user's message to the messages list
    const newMessagesArray = [...messages];
    newMessagesArray.push({ text: message, isUser: true });
    setMessages([...newMessagesArray]);

    // Clear the input
    setMessage("");

    // Prepare request data for the API call
    const requestData = {
      providerName: selectedProvider,
      modelVersion: selectedOption,
      messages: newMessagesArray.map((message) => {
        return {
          content: message.text,
          role: message.isUser ? "user" : "system",
        };
      }),
      settings: {
        maxTokens: maxTokens,
        temperature: temperature,
      },
    };

    // Add the loading message, this is for the loading state, this is optional
    newMessagesArray.push({ text: "", isUser: false, loading: true });
    setMessages([...newMessagesArray]);

    // Get AI response and add it to the messages list
    const aiResponse = await getAiResponse(requestData);
    const {
      data: { message: aiMessage },
    } = aiResponse;

    // We override the loading message, with the one we got from the API Request
    // Only needed because we used the loading state, otherwise we could've simply used this:
    // setMessages((messages) => [
    //   ...messages,
    //   { text: aiMessage, isUser: false },
    // ]);
    newMessagesArray[newMessagesArray.length - 1] = {
      text: aiMessage,
      isUser: false,
    };

    // setting the latest state
    setMessages([...newMessagesArray]);
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>avm-genai-starter</h1>
        <Tooltip title={"Clear State"}>
          <IconButton onClick={handleResetState}>
            <DeleteSweepIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
