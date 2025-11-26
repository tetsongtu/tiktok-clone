import { useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Buttons/Button';
import { GoogleIcon, FacebookIcon } from '~/components/Icons';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [agreedToTerms, setAgreedToTerms] = useState(false);

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

        if (!formData.fullName) {
            newErrors.fullName = 'Họ và tên là bắt buộc';
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
        }

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        if (!agreedToTerms) {
            newErrors.terms = 'Bạn phải đồng ý với điều khoản sử dụng';
        }

        return newErrors;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length === 0) {
            // Handle register logic here
            console.log('Register data:', formData);
            // TODO: Call API register
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-[45rem] shadow-2xl my-4">
                <div className="text-center mb-6">
                    <h1 className="text-[2.8rem] font-bold text-[var(--text-color)] mb-2">
                        Đăng ký
                    </h1>
                    <p className="text-[1.4rem] text-gray-600">
                        Tạo tài khoản mới để bắt đầu
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="fullName"
                            className="text-[1.3rem] font-semibold text-[var(--text-color)]"
                        >
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Nhập họ và tên của bạn"
                            className={`p-4 text-[1.5rem] border-2 rounded-xl transition-all ${
                                errors.fullName
                                    ? 'border-red-500'
                                    : 'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]'
                            } outline-none`}
                        />
                        {errors.fullName && (
                            <span className="text-red-500 text-[1.2rem]">
                                {errors.fullName}
                            </span>
                        )}
                    </div>

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

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="confirmPassword"
                            className="text-[1.3rem] font-semibold text-[var(--text-color)]"
                        >
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Nhập lại mật khẩu"
                                className={`w-full p-4 pr-16 text-[1.5rem] border-2 rounded-xl transition-all ${
                                    errors.confirmPassword
                                        ? 'border-red-500'
                                        : 'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]'
                                } outline-none`}
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.8rem] p-1"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <span className="text-red-500 text-[1.2rem]">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="flex items-start gap-3 cursor-pointer text-[1.3rem]">
                            <input
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e: any) => {
                                    setAgreedToTerms(e.target.checked);
                                    if (errors.terms) {
                                        setErrors((prev: any) => ({
                                            ...prev,
                                            terms: '',
                                        }));
                                    }
                                }}
                                className="w-6 h-6 cursor-pointer mt-0.5 flex-shrink-0"
                            />
                            <span>
                                Tôi đồng ý với{' '}
                                <a
                                    href="#"
                                    className="text-[var(--primary)] font-medium hover:underline"
                                >
                                    Điều khoản sử dụng
                                </a>{' '}
                                và{' '}
                                <a
                                    href="#"
                                    className="text-[var(--primary)] font-medium hover:underline"
                                >
                                    Chính sách bảo mật
                                </a>
                            </span>
                        </label>
                        {errors.terms && (
                            <span className="text-red-500 text-[1.2rem]">
                                {errors.terms}
                            </span>
                        )}
                    </div>

                    <Button variant="primary">Đăng ký</Button>
                </form>

                <div className="flex items-center text-center my-4 text-gray-500">
                    <div className="flex-1 border-b border-gray-300"></div>
                    <span className="px-4 text-[1.3rem]">hoặc</span>
                    <div className="flex-1 border-b border-gray-300"></div>
                </div>

                <div className="flex flex-col gap-3 w-full">
                    <Button variant="outline" leftIcon={<GoogleIcon />}>
                        <span>Đăng ký với Google</span>
                    </Button>
                    <Button variant="outline" leftIcon={<FacebookIcon />}>
                        <span>Đăng ký với Facebook</span>
                    </Button>
                </div>

                <div className="text-center mt-4 text-[1.3rem] text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link
                        to={config.routes.login}
                        className="text-[var(--primary)] font-semibold hover:underline"
                    >
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
