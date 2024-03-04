# Getting Started with the AVM Hackathon 

**Install Prerequisites**
npm install

## Available Scripts
Navigate to the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# AVM Completion Secure Endpoint. The behavior of the secure end point is slightly different than the regular endpoint.
# Hint : Try embedding an email address in the text

## Endpoints
`POST /avm-completion`
`POST /avm-completion-secure`


## Summary
Add the '-secure' part to get a secure completion for a given input. Otherwise get a simple completion.

## Description
Processes the provided input and returns a completion. This endpoint is protected by an API key, ensuring that only authorized users can access it.

## Headers
- `Content-Type: application/json`
- `API-Key`: A unique key required to authorize the request.

## Request Body Parameters
The request body must contain the following fields:
- `providerName` (string, required): Name of the LLM provider. e.g. amazon
- `modelVersion` (string, optional): Version of the model being used. e.g. amazon.titan-text-express-v1
- `messages` (array of `AVMCompletionMessageDto` objects, required): A list of messages related to the AVM completion.
- `settings` (`AVMCompletionSettings` object, required): Settings for the AVM completion.

### `AVMCompletionMessageDto` Object. (Only use if sending context of the conversation)
Each object in the `messages` array should have the following properties:
- `content` (string, required): The content of the message.
- `role` (string, required): The role associated with the message (e.g., "user", "system").

### `AVMCompletionSettings` Object
Each object in the `messages` array should have the following properties:
- `temperature` (number, required): the temperature of the model.
- `maxTokens` (number, required): the maximum number of tokens that the model will generate, this will include the context provided as well.
- `fileKey` (string, optional): the name of the file used. This is optional only send this if you intend to use the model ```gpt-4-file```.
- `fileBuffer` (number, optional): the file buffer encoded using base64. This is optional only send this if you intend to use the model ```gpt-4-file```.

#### Example First Message : `AVMCompletionMessageDto`:
```json
{
  "content": "Write me a sample blog post.",
  "role": "user"
}
```

#### Example `AVMCompletionSettings`:
```json
{
  "temperature": 0.7,
  "maxTokens": 2048
}
```

#### Example `Complete Request Body` with expanded messages
```json
{
  "providerName": "open_ai",
  "modelVersion": "gpt-4",
  "roomId": "12345",
  "messages": [
    {
      "content": "Who is John Doe? Where he lives? Is this his email?",
      "role": "user"
    },
    {
      "content": "I can't assist you with that. Do you have any other questions?",
      "role": "user"
    },
    {
      "content": "Who was the first person that discovered America??",
      "role": "user"
    }
  ],
  "settings": {
    "maxTokens": 1024,
    "temperature": 0.5
  }
}
```

**Description:** In the example response below completion obtained successfully. The response includes details on whether any part of the request was blocked, warned, anonymized, or redacted due to containing sensitive information. If the endpoint without redaction was called, you will get a simple text string back.

**Example Response:**
```json
{
  "message": "Sorry, but I can't assist with that.",
  "wasBlocked": false,
  "blocked": [],
  "wasWarned": true,
  "warned": [
    {
      "BeginOffset": 7,
      "Category": "PROTECTED_HEALTH_INFORMATION",
      "EndOffset": 19,
      "Id": 1,
      "Score": 0.9180244207382202,
      "Text": "John Doe",
      "Traits": [],
      "Type": "NAME"
    }
  ],
  "wasAnonymized": false,
  "annonymized": [],
  "redactedMessage": "Who is John Doe? Where he lives? Is this his email?"
}
```

**Example Response (when using image model):**
```json
{
  "message": "iVBORw0KGgoAAAANSUhEUgAAAwAAAAIACAIAAAC6lJx...(restOfBase64String)"
}
```

**Response:** the response will contain the base64 string of the message, below is an example of how you can render that in react using an img tag. In the example below response.message is the base64 returned from the api call.

```html
<img src={`data:image/jpeg;base64,${response.message}`} alt={'generated-image'} />
```

##
##
##
## Using the gpt-4-file Model

#### Example of how to get the base64 encoding of a file and the name of file:
```jsx
import React, { useState } from 'react';

function FileInputBase64WithName() {
  const [base64, setBase64] = useState(''); // State to hold the base64 string
  const [fileName, setFileName] = useState(''); // State to hold the file name

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the file from the input
    if (file) {
      setFileName(file.name); // Set the file name
      const reader = new FileReader();

      reader.onload = (e) => {
        const base64 = e.target.result;
        setBase64(base64); // Update the state with the base64 string
      };

      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  return (
      <div>
        <input type="file" onChange={handleFileChange} />
      </div>
  );
}

export default FileInputBase64WithName;
```

#### Example `Complete Request Body` when using the file model.
```json
{
  "providerName": "open_ai",
  "modelVersion": "gpt-4-file",
  "roomId": "12345",
  "messages": [
    {
      "content": "Summarize me this context",
      "role": "user"
    }
  ],
  "settings": {
    "maxTokens": 1024,
    "temperature": 0.5,
    "fileKey": "name_of_the_file.csv",
    "fileBuffer": "base64string"
  }
}
```

##
##
##
### Supported Providers and Models

- amazon
    - amazon.titan-text-express-v1
- cohere
    - command
    - command-nightly
    - command-light
    - command-light-nightly
- anthropic
    - anthropic.claude-v2
    - anthropic.claude-v1
- stability
    - stability.stable-diffusion-xl-v0
- meta
    - meta.llama2-70b-chat-v1
- open_ai
    - gpt-4
    - gpt-3.5-turbo
    - gpt-4-file



