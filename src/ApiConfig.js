import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.addvaluemachine.dev.avm.technology/v1',
    headers: {
        'Content-Type': 'application/json',
        'Api-Key': 'avm-adcb-hackathon-2024'
    },
});

export default api;
