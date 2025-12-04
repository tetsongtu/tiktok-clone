import { Button, FacebookIcon, GoogleIcon } from '~/shared';
import { useCurrentUser } from '~/shared/hooks';
import { AuthModalLayout } from '~/features/Modals';

interface AuthOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister?: () => void;
    onShowLoginForm?: () => void;
}

function AuthOptionsModal({
    isOpen,
    onClose,
    onSwitchToRegister,
    onShowLoginForm,
}: AuthOptionsModalProps) {
    const { setCurrentUser } = useCurrentUser();

    const handleGuestLogin = () => {
        setCurrentUser(true);
        onClose();
    };

    const footerAction = (
        <p>
            Don't have an account?{' '}
            <button
                onClick={onSwitchToRegister}
                className="text-[var(--primary)] font-semibold hover:underline"
            >
                Sign up
            </button>
        </p>
    );

    return (
        <AuthModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Log in to TikTok"
            footerAction={footerAction}
        >
            <div className="flex flex-col gap-3">
                <Button className="h-[35px]" size="small" variant="outline">
                    Use QR code
                </Button>
                <Button
                    className="h-[35px]"
                    size="small"
                    variant="outline"
                    onClick={onShowLoginForm}
                >
                    Use phone / email / username
                </Button>
                <Button
                    className="h-[35px]"
                    size="small"
                    variant="outline"
                    leftIcon={<FacebookIcon />}
                >
                    Continue with Facebook
                </Button>
                <Button
                    className="h-[35px]"
                    size="small"
                    variant="outline"
                    leftIcon={<GoogleIcon />}
                >
                    Continue with Google
                </Button>
                <Button className="h-[35px]" size="small" variant="outline">
                    Continue with LINE
                </Button>
                <Button className="h-[35px]" size="small" variant="outline">
                    Continue with KakaoTalk
                </Button>
                <Button
                    className="h-[35px]"
                    size="small"
                    variant="outline"
                    onClick={handleGuestLogin}
                >
                    Continue as Guest
                </Button>
            </div>
        </AuthModalLayout>
    );
}

export default AuthOptionsModal;
