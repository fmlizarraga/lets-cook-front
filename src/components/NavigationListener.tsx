import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUIStore } from '../hooks/useUIStore';

export const NavigationListener = () => {
    const location = useLocation();
    const { clearMessages } = useUIStore();

    useEffect(() => {
        clearMessages();
    }, [location]);

    return null;
};
