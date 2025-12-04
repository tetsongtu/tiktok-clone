import { Button, GoogleIcon, FacebookIcon } from '~/shared';
import { AuthModalLayout } from '~/features';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
}

function RegisterModal({ isOpen, onClose, onSwitchToLogin }: RegisterModalProps) {
    const footerAction = (
        <p>
            Already have an account?{' '}
            <button
                onClick={onSwitchToLogin}
                className="text-[var(--primary)] font-semibold hover:underline"
            >
                Log in
            </button>
        </p>
    );

    return (
        <AuthModalLayout
            isOpen={isOpen}
            onClose={onClose}
            title="Sign up for TikTok"
            footerAction={footerAction}
        >
            <div className="flex flex-col gap-3">
                <Button className="h-[35px]" size="small" variant="outline">
                    Use phone or email
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
            </div>
        </AuthModalLayout>
    );
}

export default RegisterModal;
