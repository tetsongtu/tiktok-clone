import { createContext } from 'preact';
import { useContext, useState, useEffect } from 'preact/hooks';
import type { ComponentChildren } from 'preact';
import { GUEST_USER } from '../constants/guestUser';

interface CurrentUserContextType {
    currentUser: boolean;
    currentUserData: any;
    setCurrentUser: (value: boolean | ((prev: boolean) => boolean)) => void;
    setCurrentUserData: (value: any) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: ComponentChildren }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem('currentUser');
        return saved ? JSON.parse(saved) : true; // Auto login
    });

    const [currentUserData, setCurrentUserData] = useState<any>(() => {
        const saved = localStorage.getItem('currentUserData');
        return saved ? JSON.parse(saved) : GUEST_USER; // Auto login với GUEST_USER
    });

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        if (currentUserData) {
            localStorage.setItem('currentUserData', JSON.stringify(currentUserData));
        } else {
            localStorage.removeItem('currentUserData');
        }
    }, [currentUserData]);

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, currentUserData, setCurrentUser, setCurrentUserData }}
        >
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
