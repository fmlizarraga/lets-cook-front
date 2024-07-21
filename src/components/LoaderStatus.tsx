import { useEffect, useRef } from 'react';
import { useUIStore } from '../hooks/useUIStore';
import { Toast } from 'primereact/toast';

const REMOVE_DELAY = 300;
const SHOW_DELAY = 3000;

export function LoaderStatus() {
    const { messages, popOldMessage } = useUIStore();
    const { info, success, error } = messages;

    const toastRef = useRef<Toast>(null);

    useEffect(() => {
        if (info.length > 0) {
            toastRef.current?.show({ severity: 'info', summary: 'Info', detail: info[0], life: SHOW_DELAY });
        }
    }, [info]);

    useEffect(() => {
        if (success.length > 0) {
            toastRef.current?.show({ severity: 'success', summary: 'Success', detail: success[0], life: SHOW_DELAY });
        }
    }, [success]);

    useEffect(() => {
        if (error.length > 0) {
            toastRef.current?.show({ severity: 'error', summary: 'Error', detail: error[0], life: SHOW_DELAY });
        }
    }, [error]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (info.length > 0) popOldMessage('info');
            if (success.length > 0) popOldMessage('success');
            if (error.length > 0) popOldMessage('error');
        }, REMOVE_DELAY);
        return () => clearInterval(timer);
    }, [info, success, error, popOldMessage]);

    return (
        <Toast ref={toastRef} position="top-right" />
    );
};
