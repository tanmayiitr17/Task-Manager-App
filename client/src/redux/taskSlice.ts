import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action: any) => {
            state.tasks = [];
            state.tasks = action.payload;
        },
        logoutTask: (state) => {
            state.tasks = [];
        }
    }
})

export const { addTask, logoutTask } = taskSlice.actions;
export default taskSlice.reducer;