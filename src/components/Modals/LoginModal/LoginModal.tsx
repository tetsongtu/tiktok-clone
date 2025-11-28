import { XIcon } from '@phosphor-icons/react';

import Button from '~/components/Buttons/Button';
import { GoogleIcon, FacebookIcon } from '~/components/Icons';
import config from '~/config';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed flex justify-center pt-14 md:pt-[70px] z-50 top-0 left-0 w-full h-full bg-black/50 overflow-auto">
            <div className="relative bg-white w-full max-w-[385px] max-h-[515px] p-8 rounded-lg">
                <header className="absolute flex justify-end w-full p-5 left-0 top-0">
                    <button
                        onClick={onClose}
                        className="hover:bg-gray-200 p-2 rounded-full"
                    >
                        <XIcon size="19" />
                    </button>
                </header>
                <main className="max-w-md mx-auto text-center pt-13">
                    <h1 className="pb-6">Log in to TikTok</h1>
                    <div className="flex flex-col gap-3">
                        <Button className="h-[35px]" size="small" variant="outline">
                            Use QR code
                        </Button>
                        <Button
                            className="h-[35px]"
                            to={config.routes.login}
                            size="small"
                            variant="outline"
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
                        <Button className="h-[35px]" size="small" variant="outline">
                            Continue with Apple
                        </Button>
                    </div>
                </main>

                <footer>
                    <p className="max-w-md mx-auto pt-5 pb-5 text-center text-neutral-400 text-[10px]">
                        By continuing with an account located in{' '}
                        <a className="text-[var(--black)]">Vietnam</a>, you agree to our{' '}
                        <a className="text-[var(--black)]">Terms of Service</a> and
                        acknowledge that you have read our{' '}
                        <a className="text-[var(--black)]">Privacy Policy</a>.
                    </p>
                    <p className="text-center pt-5 border-t border-neutral-300">
                        Don't have an account?{' '}
                        <a className="text-[var(--primary)] font-semibold">Sign up</a>
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default LoginModal;
