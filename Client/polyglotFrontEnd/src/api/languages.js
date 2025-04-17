import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5173',
    headers: 'Access-Control-Allow-Origin'
});