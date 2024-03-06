import React from "react";
import styled from "@emotion/styled";
import { Box, Paper, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { BeatLoader } from "react-spinners";

import { COLOR_SECONDARY, GRAY_COLORS } from "../constants/colors";

// Styled component for message container with conditional styles based on the message sender
const MessageContainer = styled(Paper)(({ isuser }) => ({
  backgroundColor: isuser ? COLOR_SECONDARY : GRAY_COLORS.GRAY_100, // Background color changes based on sender
  alignSelf: isuser ? "end" : "start", // Aligns message to right for user, left for AI
  width: "fit-content", // Width adjusts to fit content
  maxWidth: "80%", // Limits maximum width to 80% of parent container
  padding: 8, // Padding inside the container
  marginTop: 12, // Top margin
}));

// Styled component for the container that holds all messages
const MessageListContainer = styled(Box)`
  min-height: 250px; // Minimum height
  margin-top: 20px; // Top margin
  display: flex; // Uses flexbox layout
  flex-direction: column; // Aligns children in a column
  padding: 20px; // Padding around the content
  overflow: scroll; // Enables scrolling if content overflows
`;

// Styled ReactMarkdown component for custom styling of markdown-rendered elements
const StyledReactMarkdown = styled(ReactMarkdown)`
  // Custom styles for tables within markdown content
  table {
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    border-color: inherit !important;
    display: block !important;
    width: auto !important;
    max-width: 100% !important;
    overflow: auto !important;
  }

  // Custom styles for table cells
  td,
  th {
    padding: 8px 16px !important;
  }

  // Ensure all table elements use consistent border and width styles
  tbody,
  td,
  tfoot,
  th,
  thead,
  tr {
    width: auto !important;
    border-color: inherit !important;
    border-style: solid !important;
    border-width: 1.5px !important;
  }
`;

// Message component for rendering individual messages with markdown support
const Message = ({ text, isUser, loading, provider }) => {
  return (
    <MessageContainer elevation={3} isuser={isUser ? 1 : 0}>
      {/* Render the spinner if the message is loading */}
      {/* Render the image if the message is coming from stability Ai */}
      {loading ? (
        <BeatLoader />
      ) : provider === "stability" && !isUser ? (
        <img src={`data:image/jpeg;base64,${text}`} alt={"generated-image"} />
      ) : (
        <Typography variant="body1" component="p">
          {/* Render markdown content from message text */}
          <StyledReactMarkdown>{text}</StyledReactMarkdown>
        </Typography>
      )}
    </MessageContainer>
  );
};

// MessageList component for rendering a list of messages
const MessageList = ({ messages, provider }) => {
  return (
    <MessageListContainer>
      {/* Map over each message in the messages array and render a Message component */}
      {messages?.map((message, index) => (
        <Message
          provider={provider}
          key={index}
          text={message.text}
          isUser={message.isUser}
          loading={message.loading}
        />
      ))}
    </MessageListContainer>
  );
};

// Export the MessageList component for use in other parts of the application
export default MessageList;
