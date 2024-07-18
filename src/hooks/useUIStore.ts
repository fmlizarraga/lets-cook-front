import { useDispatch, useSelector } from "react-redux";
import { RootStore, onSetMessages, onClearMessages, onSetFormAction } from "../store";
import { FormActionType } from "../interfaces";

type MessagesParams = {
    info?: string[];
    success?: string[];
    error?: string[];
};

type MsgType = 'info' | 'success' | 'error';

export const useUIStore = () => {
    const { messages, formAction } = useSelector((state: RootStore) => state.ui);
    const dispatch = useDispatch();

    const setMessages = ({ info, success, error }: MessagesParams) => {
        dispatch(onSetMessages({
            info: info || messages.info,
            success: success || messages.success,
            error: error || messages.error
        }));
    };

    const clearMessages = () => {
        dispatch(onClearMessages());
    };

    const pushMessage = (msgType: MsgType, value: string) => {
        const updatedMessages = [...messages[msgType], value];
        dispatch(onSetMessages({ ...messages, [msgType]: updatedMessages }));
    };

    const popOldMessage = (msgType: MsgType) => {
        const updatedMessages = [...messages[msgType]];
        updatedMessages.shift();
        dispatch(onSetMessages({ ...messages, [msgType]: updatedMessages }));
    };

    const setEditorAction = (action: FormActionType) => {
        dispatch(onSetFormAction(action));
    };

    return {
        // Properties
        messages,
        formAction,
        // Methods
        setMessages,
        clearMessages,
        pushMessage,
        popOldMessage,
        setEditorAction,
    };
};
