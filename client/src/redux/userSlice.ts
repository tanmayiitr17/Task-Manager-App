import { createSlice } from '@reduxjs/toolkit';

interface UserState {
    currentUser: any;
    isFetching: boolean;
    error: boolean;
}

const initialState: UserState = {
    currentUser: null,
    isFetching: false,
    error: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        logout: (state) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = null;
            localStorage.removeItem("token");
        },
        registerSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
    }
});

export const {
    loginSuccess,
    logout,
    registerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
