import { useState } from 'preact/hooks';
import { useCurrentUser } from '~/shared/hooks';
import { AuthLayout } from '~/features/Modals';
import Login from './Login';
import Register from './Register';
import Options from './Options';

type View = 'options' | 'login' | 'register';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialView?: View;
}

const VIEW_CONFIG = {
    options: {
        title: 'Log in to TikTok',
        footerText: "Don't have an account?",
        footerAction: 'Sign up',
        footerView: 'register' as View,
    },
    login: {
        title: 'Log in',
        footerText: "Don't have an account?",
        footerAction: 'Sign up',
        footerView: 'register' as View,
    },
    register: {
        title: 'Sign up for TikTok',
        footerText: 'Already have an account?',
        footerAction: 'Log in',
        footerView: 'login' as View,
    },
};

function AuthModal({ isOpen, onClose, initialView = 'options' }: AuthModalProps) {
    const { setUser } = useCurrentUser();
    const [view, setView] = useState<View>(initialView);

    const config = VIEW_CONFIG[view];

    const resetAndClose = () => {
        setView('options');
        onClose();
    };

    const handleSuccess = (userData?: any) => {
        if (userData) setUser(userData);
        resetAndClose();
    };

    const renderContent = () => {
        switch (view) {
            case 'login':
                return <Login onSuccess={handleSuccess} />;
            case 'register':
                return <Register onSuccess={handleSuccess} />;
            default:
                return (
                    <Options
                        onLoginClick={() => setView('login')}
                        onSuccess={handleSuccess}
                    />
                );
        }
    };

    const renderFooter = () => (
        <p className="flex items-center justify-center gap-4">
            <span>{config.footerText}</span>
            <button
                onClick={() => setView(config.footerView)}
                className="text-[var(--primary)] font-normal"
            >
                {config.footerAction}
            </button>
        </p>
    );

    return (
        <AuthLayout
            isOpen={isOpen}
            onClose={resetAndClose}
            onBack={view === 'login' ? () => setView('options') : undefined}
            title={config.title}
            footerAction={renderFooter()}
        >
            {renderContent()}
        </AuthLayout>
    );
}

export default AuthModal;
