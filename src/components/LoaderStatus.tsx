import { useEffect } from 'react';
import { useUIStore } from '../hooks/useUIStore';
import styles from './LoaderStatus.module.css';

const REMOVE_DELAY = 3000;

export function LoaderStatus() {
    const { messages, popOldMessage } = useUIStore();
    const { info, success, error } = messages;

    useEffect(() => {
        if (info.length > 0) {
            const timer = setTimeout(() => {
                popOldMessage('info');
            }, REMOVE_DELAY);
            return () => clearTimeout(timer);
        }
    }, [info, popOldMessage]);

    useEffect(() => {
        if (success.length > 0) {
            const timer = setTimeout(() => {
                popOldMessage('success');
            }, REMOVE_DELAY);
            return () => clearTimeout(timer);
        }
    }, [success, popOldMessage]);

    useEffect(() => {
        if (error.length > 0) {
            const timer = setTimeout(() => {
                popOldMessage('error');
            }, REMOVE_DELAY);
            return () => clearTimeout(timer);
        }
    }, [error, popOldMessage]);

    const renderMessages = (messages: string[], className: string) => (
        <ul className={className}>
            {messages.map((msg, index) => (
                <li key={index}><span>{msg}</span></li>
            ))}
        </ul>
    );

    return (
        <div className={styles.messageBanner}>
            {error.length > 0 && renderMessages(error, styles.errorList)}
            {success.length > 0 && renderMessages(success, styles.successList)}
            {info.length > 0 && renderMessages(info, styles.infoList)}
        </div>
    );
};
