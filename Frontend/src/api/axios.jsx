import axios from 'axios';

export default axios.create({
    baseURL: 'https://rezk.azurewebsites.net'
});

export const axiosPrivate = axios.create({
    baseURL: "https://rezk.azurewebsites.net",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});