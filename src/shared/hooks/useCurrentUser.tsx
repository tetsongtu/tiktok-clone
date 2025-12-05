import { createContext } from 'preact';
import { useContext, useState, useEffect, useMemo } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

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

    useEffect(() => {
        user
            ? localStorage.setItem('user', JSON.stringify(user))
            : localStorage.removeItem('user');
    }, [user]);

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
