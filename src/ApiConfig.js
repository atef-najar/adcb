import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.addvaluemachine.dev.avm.technology/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': '#YOUR_API_KEY_HERE#'
    },
});

export default api;
