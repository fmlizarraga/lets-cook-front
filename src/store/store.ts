import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice, blogSlice } from "./";


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    blog: blogSlice.reducer
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootStore = ReturnType<typeof rootReducer>;