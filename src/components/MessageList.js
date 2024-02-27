import React from 'react';
import styled from '@emotion/styled';
import { Box, Paper, Typography } from '@mui/material';

import { COLOR_SECONDARY, GRAY_COLORS} from "../constants/colors";

const MessageContainer = styled(Paper)(({ isuser }) => ({
    backgroundColor: isuser ? COLOR_SECONDARY : GRAY_COLORS.GRAY_100,
    alignSelf: isuser ? 'end' : 'start',
    width: 'fit-content',
    maxWidth: '80%',
    padding: 8,
    marginTop: 12,
}));

const MessageListContainer = styled(Box)`
    min-height: 250px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow: scroll;
`;

const Message = ({ text, isUser }) => {
    return (
        <MessageContainer elevation={3} isuser={isUser ? 1 : 0}>
            <Typography variant="body1" component="p">
                {text}
            </Typography>
        </MessageContainer>
    );
}

const MessageList = ({ messages }) => {
    return (
        <MessageListContainer>
            {messages?.map((message, index) => (
                <Message key={index} text={message.text} isUser={message.isUser} />
            ))}
        </MessageListContainer>
    );
}

export default MessageList;
