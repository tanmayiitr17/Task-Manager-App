import { publicRequest } from "../requestMethods";

// Function to login user
export const login = async (data: any) => {
    // Send POST request to login endpoint with provided data
    const res = await publicRequest.post(`/auth/login`, data);
    // Store the received access token in local storage
    localStorage.setItem("token", res.data.accessToken);
    // Return the response data
    return res.data;
};

// Function to sign up user
export const signup = async (data: any) => {
    // Send POST request to signup endpoint with provided data
    const res = await publicRequest.post(`/auth/register`, data);
    // Return the response data
    return res.data;
};
