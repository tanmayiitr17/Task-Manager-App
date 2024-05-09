import { userRequest } from "../requestMethods";

export const login = async (data: any) => {
    const res = await userRequest.post(`/auth/login`, data);
    localStorage.setItem("token", res.data.accessToken);
    return res.data;
};

export const signup = async (data: any) => {
    const res = await userRequest.post(`/auth/register`, data);
    return res.data;
};