import { userRequest } from "../requestMethods";

// Function to upload a new task
export const uploadTask = async (data: any) => {
    // Send a POST request to the task endpoint with the provided data
    const res = await userRequest.post(`/task`, data);
    // Return the response data
    return res.data;
};

// Function to update an existing task
export const updateTask = async (data: any) => {
    // Send a PUT request to the task endpoint with the provided data and task ID
    const res = await userRequest.put(`/task/${data.id}`, data);
    // Return the response data
    return res.data;
};

// Function to get a specific task by its ID
export const getTask = async (data: any) => {
    // Send a GET request to the task endpoint with the provided task ID
    const res = await userRequest.get(`/task/${data._id}`, data);
    // Return the response data
    return res.data;
};

// Function to get all tasks associated with a specific user
export const getAllTasks = async (userId: any) => {
    // Send a GET request to the task endpoint with the user ID
    const res = await userRequest.get(`/task/${userId}`);
    // Return the response data
    return res.data;
};

// Function to delete a task by its ID
export const deleteTask = async (id: any) => {
    // Send a DELETE request to the task endpoint with the provided task ID
    const res = await userRequest.delete(`/task/${id}`);
    // Return the response data
    return res.data;
};
