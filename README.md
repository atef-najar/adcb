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


# AVM Completion Secure Endpoint

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
- `providerName` (string, required): Name of the provider.
- `modelVersion` (string, optional): Version of the model being used.
- `roomId` (string, optional): Identifier for the room, if applicable, this will be used for streaming the response.
- `messages` (array of `AVMCompletionMessageDto` objects, required): A list of messages related to the AVM completion.
- `settings` (`AVMCompletionSettings` object, required): Settings for the AVM completion.

### `AVMCompletionMessageDto` Object
Each object in the `messages` array should have the following properties:
- `content` (string, required): The content of the message.
- `role` (string, required): The role associated with the message (e.g., "user", "system").

### `AVMCompletionSettings` Object
Each object in the `messages` array should have the following properties:
- `temperature` (number, required): the temperature of the model.
- `maxTokens` (number, required): the maximum number of tokens that the model will generate, this will include the context provided as well.

#### Example `AVMCompletionMessageDto`:
```json
{
  "content": "Example message content.",
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

#### Example `Complete Request Body`
```json
{
  "providerName": "open_ai",
  "modelVersion": "gpt-4",
  "roomId": "12345",
  "messages": [
    {
      "content": "Who is John Doe? Where he lives? Is this his email?",
      "role": "user"
    }
  ],
  "settings": {
    "maxTokens": 1024,
    "temperature": 0.5
  }
}
```

**Description:** Completion obtained successfully. The response includes details on whether any part of the request was blocked, warned, anonymized, or redacted due to containing sensitive information. If the endpoint without redaction was called, you will get a simple text string back. 

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




