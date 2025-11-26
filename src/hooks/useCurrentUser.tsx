import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

interface CurrentUserContextType {
    currentUser: boolean;
    setCurrentUser: (value: boolean) => void;
}

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

export function CurrentUserProvider({ children }: { children: ComponentChildren }) {
    const [currentUser, setCurrentUser] = useState(false);
    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

function useCurrentUser() {
    const context = useContext(CurrentUserContext);
    if (!context) {
        throw new Error('useCurrentUser must be used within CurrentUserProvider');
    }
    return context;
}

export default useCurrentUser;
