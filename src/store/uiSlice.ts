import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UIState = {
    messages: {
        info: string[];
        success: string[];
        error: string[];
    };
};

const INITIAL_STATE: UIState = {
    messages: {
        info: [],
        success: [],
        error: [],
    }
};

interface UpdateMessagesAction {
    info: string[];
    success: string[];
    error: string[];
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {...INITIAL_STATE},
    reducers: {
        onSetMessages: (state, action: PayloadAction<UpdateMessagesAction>) => {
            state.messages = {
                ...state.messages,
                ...action.payload
            };
        },
        onClearMessages: (state) => {
            state.messages = INITIAL_STATE.messages;
        },
    }
});

export const {onSetMessages, onClearMessages} = uiSlice.actions;