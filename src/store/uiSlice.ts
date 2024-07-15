import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormActionType } from '../interfaces';

type UIState = {
    messages: {
        info: string[];
        success: string[];
        error: string[];
    };
    formAction: FormActionType;
};

const INITIAL_STATE: UIState = {
    messages: {
        info: [],
        success: [],
        error: [],
    },
    formAction: 'create'
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
        onSetFormAction: (state, action: PayloadAction<FormActionType>) => {
            state.formAction = action.payload;
        }
    }
});

export const {onSetMessages, onClearMessages, onSetFormAction} = uiSlice.actions;