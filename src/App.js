import React, { useState } from "react";
import MessageList from "./components/MessageList";
import MessageInput from "./components/Input";
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { GRAY_COLORS } from "./constants/colors";

import Settings from "./components/Settings";
import api from "./ApiConfig";
import { SupportedModels } from "./constants/ai-models";

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

const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedProvider, setSelectedProvider] = useState({});
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);

  const getAiResponse = (requestData) => {
    return api.post("/conversations/avm-completion", requestData);
  };

  const handleSendMessage = async () => {
    if (!message) return;

    // Add user message
    setMessages([...messages, { text: message, isUser: true }]);
    setMessage("");

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

    // Mock AI response after a delay
    const aiResponse = await getAiResponse(requestData);

    const {
      data: { message: aiMessage },
    } = aiResponse;

    setMessages((messages) => [
      ...messages,
      { text: aiMessage, isUser: false },
    ]);
  };

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

export default App;
