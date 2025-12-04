import { useState } from 'preact/hooks';
import { Button } from '~/shared';
import { useCurrentUser } from '~/shared/hooks';
import { AuthModalLayout } from '~/features/Modals';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
}

const EMAIL_REGEX = /\S+@\S+\.\S+/;
const MIN_PASSWORD_LENGTH = 6;

function LoginModal({ isOpen, onClose, onBack }: LoginModalProps) {
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
        setCurrentUser(true);
        onClose();
        // TODO: Call API login
    };

    const getInputClassName = (hasError: boolean) => {
        const baseClass =
            'p-3 text-[1.4rem] border-2 rounded-lg transition-all outline-none w-full';
        const errorClass = 'border-red-500';
        const normalClass =
            'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]';
        return `${baseClass} ${hasError ? errorClass : normalClass}`;
    };

    const handleBack = () => {
        setFormData({ email: '', password: '' });
        setErrors({});
        onBack?.();
    };

    return (
        <AuthModalLayout
            isOpen={isOpen}
            onClose={onClose}
            onBack={handleBack}
            title="Log in"
        >
            <form onSubmit={handleSubmit} className="text-left">
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="font-semibold mb-1 text-[1.3rem]">
                            Email or username
                        </p>
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email của bạn"
                            className={getInputClassName(!!errors.email)}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-[1.1rem]">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div>
                        <p className="font-semibold mb-1 text-[1.3rem]">Password</p>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu"
                            className={getInputClassName(!!errors.password)}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-[1.1rem]">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <a
                        href="#"
                        className="text-gray-500 hover:underline hover:text-black text-[1.2rem]"
                    >
                        Forgot password?
                    </a>

                    <Button className="w-full mt-2" type="submit" variant="primary">
                        Đăng nhập
                    </Button>
                </div>
            </form>

            <div className="flex items-center text-center my-4 text-gray-500">
                <div className="flex-1 border-b border-gray-300"></div>
                <span className="px-4 text-[1.3rem]">hoặc</span>
                <div className="flex-1 border-b border-gray-300"></div>
            </div>

            <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                    setCurrentUser(true);
                    onClose();
                }}
            >
                <span>Đăng nhập với Guest</span>
            </Button>
        </AuthModalLayout>
    );
}

export default LoginModal;
