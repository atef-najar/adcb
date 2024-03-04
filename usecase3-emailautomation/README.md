# USE Case 3 : Email Automation

**Overview:**
The goal of this challenge is to create an application that takes a CSV file as input and generates personalized emails for each entry. 
The CSV contains details such as names, email addresses, and a personalized blurb. 
Your task is to use the LLM to craft personalized emails. 

The technologies used will be leveraging a LLM and employing RAG to to augment the response from LLM's using data that is local.

A future evolution would be directly integratign with the CDP system via API's instead of uploading a CSV

**Resources:**
Documentation for the LLM API.
Sample CSV files for testing your application.
Source code of the initial application.

**Input:**
Your application should accept a CSV file as input. The CSV file will have at least three fields:
You can add additional fields to increase the richness of the response.

Name: Name of the Person
Email: Email of the Person
Note : Something personal about the person

**Functionality:**
API Integration: Integrate with the provided LLM API to send requests and receive responses. 
Output Results: The application should output personalized emails for each person.
Recommended actions could be asked of the LLM to further enrich the email

**Evaluation Criteria:**
Functionality: Does the application accurately generate email and interact with the LLM API as expected?
Usability: Is the output user-friendly and easy to understand?
Innovation: How creatively does the solution use the LLM's responses to add value beyond the basic status information?
Code Quality: Is the code well-organized, documented, and easy to read?

**Submission Requirements:**
Source code for your application.
A brief documentation explaining how to set up and use your application.
Where would you take this type of functionality.
