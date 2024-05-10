import { createSlice } from '@reduxjs/toolkit';

// Create a slice for tasks
const taskSlice = createSlice({
    name: 'task', // Name of the slice
    initialState: {
        tasks: [], // Initial state with an empty array of tasks
    },
    reducers: {
        // Reducer function to add tasks
        addTask: (state, action: any) => {
            // Reset tasks array and set it to the payload received
            state.tasks = [];
            state.tasks = action.payload;
        },
        // Reducer function to clear tasks on logout
        logoutTask: (state) => {
            // Reset tasks array to an empty array
            state.tasks = [];
        }
    }
});

// Export actions and reducer from the task slice
export const { addTask, logoutTask } = taskSlice.actions;
export default taskSlice.reducer;
