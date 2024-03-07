// Import the axios library
import axios from "axios";

// Create an instance of axios with a custom configuration
const api = axios.create({
  baseURL: "https://api.addvaluemachine.dev.avm.technology/v1", // Base URL for all requests
  headers: {
    "Content-Type": "application/json", // Set content type as JSON for all requests
    "Api-Key": "avm-adcb-hackathon-2024", // Custom API key for authentication
    "Team-Name": "Insert Team Name Here", // Name of the team, Change this with your team name :D
  },
});

// Export the configured axios instance for use in other parts of the application
export default api;
