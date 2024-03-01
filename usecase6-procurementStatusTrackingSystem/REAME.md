Overview:

The objective of this challenge is to create a solution that streamlines the process of checking the status of various procurements. Participants will develop an application that takes input from a CSV file containing procurement numbers and their current statuses, and then utilizes a Large Language Model (LLM) API to determine actions or updates needed based on the current status of each procurement.

Input:
Your application should accept a CSV file as input. The CSV file will have at least two fields:

Procurement Number: A unique identifier for each procurement.
Status: The current status of the procurement (e.g., "Pending", "Approved", "Denied", "In Progress", etc.).
Additional fields could be added to increase the fidelity and completeness of the response.

Functionality:
Process and Pass the Data with the LLM API: For each procurement, the application will call an LLM API, providing it with the procurement number and its current status. The LLM will then generate a response based on the status. This could involve generating recommendations for actions to take next, predicting potential delays, or identifying procurements that require immediate attention.
API Integration: Integrate with the provided LLM API to send requests and receive responses. You'll need to handle API authentication, construct request payloads, and process the responses.
Output Results: The application should output the results in a user-friendly format. This could be a text summary, with recommended actions.

Evaluation Criteria:

Functionality: Does the application accurately parse the input CSV and interact with the LLM API as expected?
Usability: Is the output user-friendly and easy to understand?
Innovation: How creatively does the solution use the LLM's responses to add value beyond the basic status information?
Code Quality: Is the code well-organized, documented, and easy to read?
Submission Requirements:

Source code for your application.
A brief documentation explaining how to set up and use your application.

Resources:
Documentation for the LLM API
Sample CSV files for testing your application.
Note: Ensure that your application handles errors gracefully, especially those related to API limits, network issues, or malformed input files.

