import { createContext } from 'preact';
import { useContext, useState } from 'preact/hooks';

interface CommentContextType {
    activeVideoId: string | null;
    setActiveVideoId: (id: string | null) => void;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export function CommentProvider({ children }: { children: any }) {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    return (
        <CommentContext.Provider value={{ activeVideoId, setActiveVideoId }}>
            {children}
        </CommentContext.Provider>
    );
}

export function useCommentContext() {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error('useCommentContext must be used within CommentProvider');
    }
    return context;
}
