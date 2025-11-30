import { Link } from 'wouter-preact';
import config from '~/core/config';
import { Button, GoogleIcon, FacebookIcon } from '~/shared';

function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-[45rem] shadow-2xl my-4">
                <div className="text-center mb-6">
                    <h1 className="text-[2.8rem] font-bold text-[var(--text-color)] mb-2">
                        Sign up for Tiktok
                    </h1>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Button variant="outline">
                        <span>Use phone or email</span>
                    </Button>
                    <Button variant="outline" leftIcon={<FacebookIcon />}>
                        <span>Continue with Facebook</span>
                    </Button>
                    <Button variant="outline" leftIcon={<GoogleIcon />}>
                        <span>Continue with Google</span>
                    </Button>
                    <Button variant="outline">
                        <span>Continue with LINE</span>
                    </Button>
                    <Button variant="outline">
                        <span>Continue with KakaoTalk</span>
                    </Button>
                </div>

                <footer>
                    <p className="max-w-md mx-auto pt-5 pb-5 text-center text-neutral-400 text-[10px]">
                        By continuing with an account located in{' '}
                        <a className="text-[var(--black)]">Vietnam</a>, you agree to our{' '}
                        <a className="text-[var(--black)]">Terms of Service</a> and
                        acknowledge that you have read our{' '}
                        <a className="text-[var(--black)]">Privacy Policy</a>.
                    </p>
                    <p className="text-center pt-5 border-t border-neutral-300">
                        Already have an account?{' '}
                        <Link
                            to={config.routes.login}
                            className="text-[var(--primary)] font-semibold hover:underline"
                        >
                            Log up
                        </Link>
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default Register;
