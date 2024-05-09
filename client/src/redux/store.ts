// import { configureStore } from "@reduxjs/toolkit";
// import taskReducer from './taskSlice';
// import userReducer from './userSlice'; 

// export const store = configureStore({
//     reducer: {
//         user: userReducer,
//         task: taskReducer,
//     }, 
// })
// export default store;
import { configureStore} from "@reduxjs/toolkit";
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

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
} 

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer,
        task: taskReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export let persistor = persistStore(store);
