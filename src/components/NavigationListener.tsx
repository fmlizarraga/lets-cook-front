import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUIStore } from '../hooks/useUIStore';

export const NavigationListener = () => {
    const location = useLocation();
    const { setEditorAction } = useUIStore();

    useEffect(() => {
        if(location.pathname === '/blog/new') setEditorAction('create');
        else if(location.pathname.includes('edit')) setEditorAction('edit');
    }, [location]);

    return null;
};
