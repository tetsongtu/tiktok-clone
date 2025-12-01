import { useState } from 'preact/hooks';
import { Link } from 'wouter-preact';
import config from '~/core/config';
import { Button, useCurrentUser } from '~/shared';

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const MIN_PASSWORD_LENGTH = 6;

function Login() {
    const { setCurrentUser } = useCurrentUser();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateEmail = (email: string) => {
        if (!email) return 'Email là bắt buộc';
        if (!EMAIL_REGEX.test(email)) return 'Email không hợp lệ';
        return '';
    };

    const validatePassword = (password: string) => {
        if (!password) return 'Mật khẩu là bắt buộc';
        if (password.length < MIN_PASSWORD_LENGTH)
            return 'Mật khẩu phải có ít nhất 6 ký tự';
        return '';
    };

    const validate = () => {
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        const newErrors: Record<string, string> = {};
        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;

        return newErrors;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Login data:', formData);
        // TODO: Call API login
    };

    const getInputClassName = (hasError: boolean) => {
        const baseClass =
            'p-4 text-[1.5rem] border-2 rounded-xl transition-all outline-none';
        const errorClass = 'border-red-500';
        const normalClass =
            'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]';
        return `${baseClass} ${hasError ? errorClass : normalClass}`;
    };

    const handleGuestLogin = () => setCurrentUser(true);

    return (
        <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
            <div className="mx-auto pt-16">
                <div className="bg-white rounded-3xl p-8 min-w-[45rem] shadow-2xl">
                    <h1 className="text-center pb-4">Log in</h1>

                    <form onSubmit={handleSubmit}>
                        <p className="font-semibold mb-1">Email or username</p>
                        <div className="flex flex-col gap-2 mb-2">
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập email của bạn"
                                className={getInputClassName(!!errors.email)}
                            />
                            {errors.email && (
                                <span className="text-red-500 text-[1.2rem]">
                                    {errors.email}
                                </span>
                            )}

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu"
                                className={`w-full ${getInputClassName(
                                    !!errors.password,
                                )}`}
                            />
                            {errors.password && (
                                <span className="text-red-500 text-[1.2rem]">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <a
                            href="#"
                            className="block text-gray-500 hover:underline hover:text-black"
                        >
                            Forgot password?
                        </a>

                        <Button className="w-full" type="submit" variant="primary">
                            Đăng nhập
                        </Button>
                    </form>

                    <div className="flex items-center text-center my-4 text-gray-500">
                        <div className="flex-1 border-b border-gray-300"></div>
                        <span className="px-4 text-[1.3rem]">hoặc</span>
                        <div className="flex-1 border-b border-gray-300"></div>
                    </div>

                    <Button
                        className="w-full"
                        to={config.routes.home}
                        variant="outline"
                        onClick={handleGuestLogin}
                    >
                        <span>Đăng nhập với Guest</span>
                    </Button>

                    <footer>
                        <p className="max-w-md mx-auto pt-5 pb-5 text-center text-neutral-400 text-[10px]">
                            By continuing with an account located in{' '}
                            <a className="text-[var(--black)]">Vietnam</a>, you agree to
                            our <a className="text-[var(--black)]">Terms of Service</a>{' '}
                            and acknowledge that you have read our{' '}
                            <a className="text-[var(--black)]">Privacy Policy</a>.
                        </p>
                        <p className="text-center pt-5 border-t border-neutral-300">
                            Don't have an account?{' '}
                            <Link
                                to={config.routes.register}
                                className="text-[var(--primary)] font-semibold hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Login;
