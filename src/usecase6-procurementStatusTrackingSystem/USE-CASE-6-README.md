# Use Case 6 : Procurement Status Agent

**Overview:**
The objective of this challenge is to create an interactive solution that streamlines the process of checking the status of procurement within an organization.

Participants will develop an application that takes input from a CSV file containing procurement numbers and their current statuses, and then utilizes a Large Language Model (LLM) API to determine actions or updates needed based on the current status of each procurement.

The technologies used will be leveraging a LLM and employing RAG to to augment the response from LLM's using data that is local.

A future evolution would be directly integratign with the Ariba system via API's instead of uploading a CSV

**Resources:**
Documentation for the LLM API.
Sample CSV files for testing your application.
Source code of the initial application.

**Input:**
Your application should accept a CSV file as input. The CSV file will have at least two fields:
You can add additional fields to increase the richness of the response.

Procurement Number: A unique identifier for each procurement.
Status: The current status of the procurement (e.g., "Pending", "Approved", "Denied", "In Progress", etc.).
Additional fields could be added to increase the fidelity and completeness of the response.

**Functionality:**
API Integration: Integrate with the provided LLM API to send requests and receive responses. 
Output Results: The application should output the results answering the question posed about the status given an procurement number. 
Recommended actions could be asked of the LLM based on the status of procurement

**Evaluation Criteria:**
Functionality: Does the application accurately parse the input CSV and interact with the LLM API as expected?
Usability: Is the output user-friendly and easy to understand?
Innovation: How creatively does the solution use the LLM's responses to add value beyond the basic status information?
Code Quality: Is the code well-organized, documented, and easy to read?

**Submission Requirements:**
Source code for your application.
A brief documentation explaining how to set up and use your application.
Where would you take this type of functionality.



