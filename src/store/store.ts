import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice, blogSlice, uiSlice } from "./";


const rootReducer = combineReducers({
    auth: authSlice.reducer,
    blog: blogSlice.reducer,
    ui: uiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootStore = ReturnType<typeof rootReducer>;