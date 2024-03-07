import React, { useState } from "react";
import styled from "@emotion/styled";
import { Container } from "@mui/material";

// Importing custom components
import MessageList from "../components/MessageList";
import MessageInput from "../components/Input";
import Settings from "../components/Settings";
import CommandStatement from "../components/CommandStatement";
import TestCaseStatement from "../components/TestCaseStatement";
import CodeConvertion from "../components/CodeConvertion";

// Importing constant colors
import { GRAY_COLORS } from "../constants/colors";

// Styled component for the main application container
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
const UseCase5Sample = () => {
  // ? State variables
  // ! Declares a state variable 'message' initialized to an empty string, along with a function 'setMessage' to update its value
  const [message, setMessage] = useState("");
  // ! Declares a state variable 'messages' initialized to an empty array, along with a function 'setMessages' to update its value
  const [messages, setMessages] = useState([]);
  // ! Declares a state variable 'selectedOption' initialized to an empty string, along with a function 'setSelectedOption' to update its value
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedStatement, setSelectedStatement] = useState("");
  const [selectedCommand, setSelectedCommand] = useState("");

  // Function to handle sending a message
  const handleSendMessage = () => {
    // Check if message is empty
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Add user message to messages state
    setMessages([...messages, { text: message, isUser: true }]);

    // Clear message input
    setMessage("");

    // Mock AI response after a delay
    setTimeout(() => {
      const aiResponse = "This is a mock response from AI.";
      setMessages((messages) => [
        ...messages,
        { text: aiResponse, isUser: false },
      ]);
    }, 1000); // Mock response delay
  };

  // Function to handle the change in option
  const handleOptionChange = (event) => {
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
    <>
      {/* Main application container */}
      <AppContainer>
        <h1>Code Assistant</h1>
        {/* Settings component */}
        <Settings
          handleOptionChange={handleOptionChange}
          selectedOption={selectedOption}
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
    </>
  );
};

// ! Export the UseCase5Final component for use in the application
export default UseCase5Sample;
