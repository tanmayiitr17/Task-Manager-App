import { userRequest } from "../requestMethods";

export const uploadTask = async (data: any) => {
    const res = await userRequest.post(`/task`, data);
    return res.data;
};

export const updateTask = async (data: any) => {
    const res = await userRequest.put(`/task/${data.id}`, data);
    return res.data;
};

export const getTask = async (data: any) => {
    const res = await userRequest.get(`/task/${data._id}`, data);
    return res.data;
};

export const getAllTasks = async (userId: any) => {
    const res = await userRequest.get(`/task/${userId}`);
    return res.data;
};

export const deleteTask = async (id: any) => {
    const res = await userRequest.delete(`/task/${id}`);
    return res.data;
};