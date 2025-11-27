import { useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Buttons/Button';
import { GoogleIcon, FacebookIcon } from '~/components/Icons';
import useCurrentUser from '~/hooks/useCurrentUser';

function Login() {
    const { setCurrentUser } = useCurrentUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev: any) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors: any = {};

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        return newErrors;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length === 0) {
            // Handle login logic here
            console.log('Login data:', formData);
            // TODO: Call API login
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-[45rem] shadow-2xl my-4">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="email"
                            className="text-[1.3rem] font-semibold text-[var(--text-color)]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Nhập email của bạn"
                            className={`p-4 text-[1.5rem] border-2 rounded-xl transition-all ${
                                errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]'
                            } outline-none`}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-[1.2rem]">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="password"
                            className="text-[1.3rem] font-semibold text-[var(--text-color)]"
                        >
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Nhập mật khẩu"
                                className={`w-full p-4 pr-16 text-[1.5rem] border-2 rounded-xl transition-all ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]'
                                } outline-none`}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.8rem] p-1"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.password && (
                            <span className="text-red-500 text-[1.2rem]">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between items-center text-[1.3rem]">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-6 h-6 cursor-pointer" />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <a href="#" className="text-[var(--primary)] font-medium">
                            Quên mật khẩu?
                        </a>
                    </div>

                    <Button type="submit" variant="primary">
                        Đăng nhập
                    </Button>
                </form>

                <div className="flex items-center text-center my-4 text-gray-500">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="px-4 text-[1.3rem]">hoặc</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Button variant="outline" leftIcon={<GoogleIcon />}>
                        <span>Đăng nhập với Google</span>
                    </Button>
                    <Button variant="outline" leftIcon={<FacebookIcon />}>
                        <span>Đăng nhập với Facebook</span>
                    </Button>
                    <Button
                        to={config.routes.home}
                        variant="outline"
                        onClick={() => {
                            setCurrentUser(true);
                        }}
                    >
                        <span>Đăng nhập với Guest</span>
                    </Button>
                </div>

                <div className="text-center mt-4 text-[1.3rem] text-gray-600">
                    Chưa có tài khoản?{' '}
                    <Link
                        to={config.routes.register}
                        className="text-[var(--primary)] font-semibold hover:underline"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
