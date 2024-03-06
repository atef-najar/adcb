import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';
import MessageList from '../components/MessageList';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import api from '../ApiConfig';

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

// Styled input for file upload
const MyInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const UseCase3Final = () => {
    // State to store messages
    const [messages, setMessages] = useState([]);

    // Function to handle file upload
    const onUploadDocument = async (e) => {
        const files = e?.target?.files;
        const file = files && files.length > 0 && files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (e) => {
            const base64 = e.target.result.split(',')[1];
            const requestData = {
                "providerName": "file",
                "modelVersion": "gpt-4-file",
                "roomId": "roomId",
                "messages": [{
                    "content": "create a short personalized email for each person use the Note field to personalize the note",
                    "role": "user"
                }],
                "settings": {
                    "maxTokens": 1024,
                    "temperature": 0.7,
                    "fileKey": file.name, //name of the .csv file
                    "fileBuffer": base64 //buffer data of .csv file
                }
            };

            const aiResponse = api.post('/conversations/avm-completion', requestData);
            aiResponse.then((res) => {
                // Add AI response to messages state
                setMessages(messages => [...messages, { text: res.data.message, isUser: false }]);
            })
            .catch((error) => {
                console.log("something went wrong", error)
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <AppContainer>
            <h1>avm-ai-email-automation</h1>
            {/* Component to display messages */}
            <MessageList messages={messages} />
            {/* File upload button */}
            <label htmlFor="file-input">
                <AttachFileIcon sx={{ width: '30px', height: '30px', margin: '10px' }} />
            </label>
            <MyInput
                type="file"
                id={'file-input'}
                name={'file-input'}
                onChange={onUploadDocument}
                style={{ display: 'none' }}
                onClick={(event) => {
                    event.target.value = null;
                }}
                accept={
                    '.csv'
                }
            />
        </AppContainer>
    );
}

export default UseCase3Final;