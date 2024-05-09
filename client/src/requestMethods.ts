import axios from "axios";

// const BASE_URL = "http://localhost:5000/";
const BASE_URL = "http://localhost:5000";

const TOKEN = localStorage.getItem("token");
// Create axios instance for public requests (without authentication)
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
// Create axios instance for user requests (authenticated)
export const userRequest = axios.create({
    baseURL: BASE_URL,
    // Set token in the headers if it exists, otherwise exclude it
    headers: { token: `Bearer ${TOKEN}` }
});
