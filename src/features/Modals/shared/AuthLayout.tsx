import type { ComponentChildren } from 'preact';
import { Modal } from '~/shared';

interface AuthLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
    title: string;
    children: ComponentChildren;
    footerAction?: ComponentChildren;
}

function AuthLayout({
    isOpen,
    onClose,
    onBack,
    title,
    children,
    footerAction,
}: AuthLayoutProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} onBack={onBack} title={title}>
            {children}

            <footer>
                <p className="max-w-md mx-auto pt-5 pb-5 text-center text-neutral-400 text-base">
                    By continuing with an account located in{' '}
                    <a className="text-[var(--black)]">Vietnam</a>, you agree to our{' '}
                    <a className="text-[var(--black)]">Terms of Service</a> and
                    acknowledge that you have read our{' '}
                    <a className="text-[var(--black)]">Privacy Policy</a>.
                </p>
                {footerAction && (
                    <div className="text-center pt-5 border-t border-neutral-300">
                        {footerAction}
                    </div>
                )}
            </footer>
        </Modal>
    );
}

export default AuthLayout;
