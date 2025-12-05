import { createContext } from 'preact';
import { useContext, useState, useEffect, useMemo } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { GUEST_USER } from '../constants/guestUser';

interface CurrentUserContextType {
    user: any;
    setUser: (value: any) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: ComponentChildren }) {
    const [user, setUser] = useState<any>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    // Sync with localStorage
    useEffect(() => {
        user
            ? localStorage.setItem('user', JSON.stringify(user))
            : localStorage.removeItem('user');
    }, [user]);

    // Handle Ctrl + L shortcut
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                setUser((currentUser: any) => (currentUser ? null : GUEST_USER));
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, []);

    const value = useMemo(() => ({ user, setUser }), [user]);

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser() {
    const context = useContext(CurrentUserContext);
    if (!context) {
        throw new Error('useCurrentUser must be used within CurrentUserProvider');
    }
    return context;
}
