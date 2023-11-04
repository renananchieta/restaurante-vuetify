import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: false,
});

api.defaults.timeout = 50000;

export default api;