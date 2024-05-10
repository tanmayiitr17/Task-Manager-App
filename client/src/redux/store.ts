import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './taskSlice';
import userReducer from './userSlice';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Redux persist configuration
const persistConfig = {
    key: 'root', // key for the root of the persisted state
    version: 1, // version of the persisted state
    storage, // storage configuration (e.g., localStorage)
}

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, userReducer)

// Configure Redux store
export const store = configureStore({
    reducer: {
        user: persistedReducer, // user slice with persistence
        task: taskReducer, // task slice without persistence
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore actions that are not serializable
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Create persistor for the store
export let persistor = persistStore(store);

// Export the Redux store and persistor
