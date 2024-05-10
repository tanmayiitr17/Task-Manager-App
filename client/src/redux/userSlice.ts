import { createSlice } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
    currentUser: any; // Current user information 
}

// Define the initial state of the user slice
const initialState: UserState = {
    currentUser: null, // Initially no user is logged in 
};

// Create a user slice
const userSlice = createSlice({
    name: 'user', // Name of the slice
    initialState, // Initial state
    reducers: {
        // Reducer function for successful login
        loginSuccess: (state, action) => {
            // Update state with the current user 
            state.currentUser = action.payload;
        },
        // Reducer function for logout
        logout: (state) => {
            // Reset state to initial values and remove token from local storage 
            state.currentUser = null;
            localStorage.removeItem("token");
        },
        // Reducer function for successful registration
        registerSuccess: (state, action) => {
            // Update state with the current user 
            state.currentUser = action.payload;
        },
    }
});

// Export actions and reducer from the user slice
export const {
    loginSuccess,
    logout,
    registerSuccess,
} = userSlice.actions;

export default userSlice.reducer;
