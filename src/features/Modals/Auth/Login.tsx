import { useState } from 'preact/hooks';
import { Button, GUEST_USER } from '~/shared';
import { EMAIL_REGEX, MIN_PASSWORD_LENGTH } from './constants';

interface LoginProps {
    onSuccess: (userData?: any) => void;
}

const FORM_FIELDS = [
    {
        name: 'email',
        label: 'Email or username',
        placeholder: 'Nhập email của bạn',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Nhập mật khẩu',
        type: 'password',
    },
] as const;

function Login({ onSuccess }: LoginProps) {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: Event) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.email) newErrors.email = 'Email là bắt buộc';
        else if (!EMAIL_REGEX.test(formData.email))
            newErrors.email = 'Email không hợp lệ';

        if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
        else if (formData.password.length < MIN_PASSWORD_LENGTH)
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';

        if (Object.keys(newErrors).length) return setErrors(newErrors);

        onSuccess(GUEST_USER);
    };

    return (
        <form onSubmit={handleSubmit} className="text-left">
            <div className="flex flex-col gap-3">
                {FORM_FIELDS.map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                        <p className="font-semibold mb-1 text-[1.3rem]">{label}</p>
                        <input
                            type={type}
                            name={name}
                            value={formData[name as keyof typeof formData]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className={`p-3 text-[1.4rem] border-2 rounded-lg transition-all outline-none w-full ${
                                errors[name]
                                    ? 'border-red-500'
                                    : 'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]'
                            }`}
                        />
                        {errors[name] && (
                            <span className="text-red-500 text-[1.1rem]">
                                {errors[name]}
                            </span>
                        )}
                    </div>
                ))}
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
    );
}

export default Login;
