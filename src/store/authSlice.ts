import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '../interfaces';

const DEFAULT_USER: User = {
    id: "",
    name: "Guest",
    email: "",
    group: "guest"
};

const INITIAL_STATE: AuthState = {
    user: DEFAULT_USER,
    authStatus: 'unauthenticated'
};

interface LoginAction {
    user: User;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        onLogin: (state, action: PayloadAction<LoginAction>) => {
            state.user = action.payload.user;
            state.authStatus = 'authenticated';
        },
        onLogout: (state) => {
            state.user = DEFAULT_USER;
            state.authStatus = 'unauthenticated';
        }
    }
});

export const { onLogin, onLogout } = authSlice.actions;