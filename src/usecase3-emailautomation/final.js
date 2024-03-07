import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Container } from "@mui/material";
import { GRAY_COLORS } from '../constants/colors';
import MessageList from '../components/MessageList';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import api from '../ApiConfig';

// Styling the main container using styled components
const AppContainer = styled(Container)`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    max-width: 700px;
    max-height: auto;
    border-radius: 30px;
    border: 1px solid ${GRAY_COLORS.GRAY_300};
    overflow: hidden;
`;

// Styled input for file upload
const StyledFileInput = styled.div`
    text-align: center;
    border: 3px dashed rgb(210, 227, 244);
    padding: 1rem;
    position: relative;
    cursor: pointer;
    margin: 20px 0px;
    border-radius: 20px;
    p {
        font-size: 0.87rem;
        color: #bbcada;
        margin: 0px
    }
    input {
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        cursor: pointer;
    }  
`

/* This is the main component which is used for rendering data */
const UseCase3Final = () => {
    // State to store messages
    const [messages, setMessages] = useState([]); // State variable for the user's message

    /* Function to handle file upload
    Function is used to upload file and extract data from the file like file name, file buffer data (base64 encoded).
    and pass the file to the LLM API and set response accordingly. */
    const onUploadDocument = async (e) => {
        const newMessagesArray = [...messages]; // creating new array for storing messages from state
        setMessages([...newMessagesArray]); //setting updated message array to the state

        // extracting file data from uploaded file
        const files = e?.target?.files; //getting uploaded file from files array
        const file = files && files.length > 0 && files[0];
        if (!file) return; // If the file is empty, return

        // reading the file data
        const reader = new FileReader(); //reading the data of file
        reader.onload = (e) => {
            const base64 = e.target.result.split(',')[1]; // getting the base64 part from the result
            const requestData = {
                "providerName": "file", // using file provider because of file uploading
                "modelVersion": "gpt-4-file", // using file model to use file upload option 
                "roomId": "12345", // static room key
                "messages": [{
                    "content": "create a short personalized email for each person use the Note field to personalize the note", // asking the LLM API to generate the personalized email for each entry in .csv file using note column
                    "role": "user" // role is user because we are asking question to system
                }],
                "settings": {
                    "maxTokens": 1024,
                    "temperature": 0.7,
                    "fileKey": file.name, //name of the .csv file
                    "fileBuffer": base64 //buffer data of .csv file
                }
            };

            // Add the loading message, this is for the loading state, this is optional
            newMessagesArray.push({ text: "", isUser: false, loading: true });
            setMessages([...newMessagesArray]); //setting updated message array to the state

            // calling LLM API
            const aiResponse = api.post('/conversations/avm-completion', requestData);
            aiResponse.then((res) => {
                /* We override the loading message, with the one we got from the API Request
                Only needed because we used the loading state, otherwise we could've simply used this:
                setMessages((messages) => [
                  ...messages,
                  { text: aiMessage, isUser: false },
                ]); */
                newMessagesArray[newMessagesArray.length - 1] = {
                    text: res.data.message,
                    isUser: false,
                };
              
                // setting the latest state
                setMessages([...newMessagesArray]);
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
            <StyledFileInput >
                <AttachFileIcon sx={{ width: '30px', height: '30px' }} />
                <h3>Click box to upload</h3>
                <p>Maximun file size 10mb</p>
                <input type="file" id={'file-input'}
                    name={'file-input'}
                    onChange={onUploadDocument} accept={'.csv'} />
            </StyledFileInput>
        </AppContainer>
    );
}

export default UseCase3Final;