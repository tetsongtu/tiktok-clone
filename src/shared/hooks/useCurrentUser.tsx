import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
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
        return saved ? JSON.parse(saved) : GUEST_USER;
    });

    useEffect(() => {
        user
            ? localStorage.setItem('user', JSON.stringify(user))
            : localStorage.removeItem('user');
    }, [user]);

    return (
        <CurrentUserContext.Provider value={{ user, setUser }}>
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
