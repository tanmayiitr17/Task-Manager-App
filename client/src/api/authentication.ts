import axios from "axios";

const BASE_URL = "https://ecommerce-server-black.vercel.app";

export const login = async (user: any) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, user);
    localStorage.setItem("token", res.data.accessToken);
    return res.data;
};

export const signup = async (user: any) => {
    const res = await axios.post(`${BASE_URL}/auth/login`, user);
    return res.data;
};