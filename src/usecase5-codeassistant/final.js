import React, { useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";

// Importing constant colors
import { GRAY_COLORS } from "../constants/colors";

// Importing custom components
import MessageList from "../components/MessageList";
import MessageInput from "../components/Input";
import Settings from "../components/Settings";
import CommandStatement from "../components/CommandStatement";
import TestCaseStatement from "../components/TestCaseStatement";
import CodeConvertion from "../components/CodeConvertion";
import api from "../ApiConfig";
import { SupportedModels } from "../constants/ai-models";

// * Styled component for the main application container
const AppContainer = styled(Container)`
// ! The height of the container will adjust to fit its content
  height: fit-content; 
  // ! Adds a margin of 120 pixels on the top
  margin-top: 120px; 
  // ! Sets the container to use flexbox layout
  display: flex;
  // ! Items inside the container will be stacked vertically 
  flex-direction: column; 
  // ! Sets the maximum width of the container to 700 pixels
  max-width: 700px; 
  // ! Applies a border radius of 30 pixels to the corners of the container
  border-radius: 30px; 
  // ! Adds a 1 pixel solid border with the color defined in GRAY_COLORS.GRAY_300
  border: 1px solid ${GRAY_COLORS.GRAY_300}; 
  // ! Any content that exceeds the dimensions of the container will be hidden
  overflow: hidden;
`;

// * Main component
const UseCase5Final = () => {
  // ? State variables
  // ! Declares a state variable 'message' initialized to an empty string, along with a function 'setMessage' to update its value
  const [message, setMessage] = useState("");
  // ! Declares a state variable 'messages' initialized to an empty array, along with a function 'setMessages' to update its value
  const [messages, setMessages] = useState([]);
  // ! Declares a state variable 'selectedOption' initialized to an empty string, along with a function 'setSelectedOption' to update its value
  const [selectedOption, setSelectedOption] = useState("");
  // ! Declares a state variable 'selectedProvider' initialized to an empty string, along with a function 'setSelectedProvider' to update its value
  const [selectedProvider, setSelectedProvider] = useState("");
  // ! Declares a state variable 'selectedStatement' initialized to an empty string, along with a function 'setSelectedStatement' to update its value
  const [selectedStatement, setSelectedStatement] = useState("");
  // ! Declares a state variable 'selectedCommand' initialized to an empty string, along with a function 'setSelectedCommand' to update its value
  const [selectedCommand, setSelectedCommand] = useState("");
  // ! Declares a state variable 'temperature' initialized to 0.7, along with a function 'setTemperature' to update its value
  const [temperature, setTemperature] = useState(0.7);
  // ! Declares a state variable 'maxTokens' initialized to 1024, along with a function 'setMaxTokens' to update its value
  const [maxTokens, setMaxTokens] = useState(1024);

  //  Function to send request data to the API for AI response
  const getAiResponse = (requestData) => {
    return api.post("/conversations/avm-completion", requestData);
  };

  //  Function to handle sending a message
  const handleSendMessage = async () => {

    // Check if message is empty
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Check if selected option is empty
    if (selectedOption === "") return;

    // Check if selected statement requires a command and if it's empty
    if (
      selectedStatement === "Generate Test Case in" ||
      selectedStatement === "Convert To"
    ) {
      if (selectedCommand === "") return;
    }

    // Prepare final statement
    let statement = message + " " + selectedStatement + " " + selectedCommand;

    // Add user message to messages state
    const newMessagesArray = [...messages];
    newMessagesArray.push({ text: statement, isUser: true });
    setMessages([...newMessagesArray]);

    // Clear message input
    setMessage("");

    // Prepare data for API request
    const requestData = {
      providerName: selectedProvider,
      modelVersion: selectedOption,
      roomId: "12345",
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

    newMessagesArray[newMessagesArray.length - 1] = {
      text: aiMessage,
      isUser: false,
    };

    // setting the latest state
    setMessages([...newMessagesArray]);
  };

  // Function to handle the change in option
  const handleOptionChange = (event) => {
    const selectedModel = SupportedModels.find(
      (model) => model.value === event.target.value,
    );
    setSelectedProvider(selectedModel.provider);
    setSelectedOption(event.target.value);
  };

  // Function to handle the change in statement
  const handleStatementChange = (event) => {
    setSelectedCommand("");
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
      <Settings
        handleOptionChange={handleOptionChange}
        selectedOption={selectedOption}
        includeSliders={true}
        temperature={temperature}
        setTemperature={setTemperature}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
      />
      <br />
      {/* Command statement component */}
      <CommandStatement
        handleStatementChange={handleStatementChange}
        selectedStatement={selectedStatement}
      />
      {selectedStatement === "Generate Test Case in" ? ( // Check if the selected statement is "Generate Test Case in"
        <>
          <br />
          {/* Render the Test Case Statement component */}
          <TestCaseStatement
            handleCommandChange={handleCommandChange}
            selectedCommand={selectedCommand}
          />
        </>
      ) : null}{" "}
      {/* If the selected statement is not "Generate Test Case in", render nothing */}
      {selectedStatement === "Convert To" ? ( // Check if the selected statement is "Convert To"
        <>
          <br />
          {/* Render the Code Conversion component */}
          <CodeConvertion
            handleCommandChange={handleCommandChange}
            selectedCommand={selectedCommand}
          />
        </>
      ) : null}{" "}
      {/* If the selected statement is not "Convert To", render nothing */}
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
};
// ! Export the UseCase5Final component for use in the application
export default UseCase5Final;
