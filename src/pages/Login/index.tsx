import { useState } from 'preact/hooks';
import { Link } from 'react-router-dom';
import config from '~/config';
import Button from '~/components/Buttons/Button';
import useCurrentUser from '~/hooks/useCurrentUser';

function Login() {
    const { setCurrentUser } = useCurrentUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
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
        <>
            <div className="min-h-[100dvh] grid grid-rows-[auto_1fr_auto] bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50">
                <div className="mx-auto pt-16">
                    <div className="bg-white rounded-3xl p-8 min-w-[45rem] shadow-2xl">
                        <h1 className="text-center pb-4">Log in</h1>
                        <form onSubmit={handleSubmit}>
                            <p className="font-semibold mb-1"> Email or username</p>
                            <div className="flex flex-col gap-2 mb-2">
                                <input
                                    type="text"
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

                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Nhập mật khẩu"
                                        className={`w-full p-4  text-[1.5rem] border-2 rounded-xl transition-all ${
                                            errors.password
                                                ? 'border-red-500'
                                                : 'border-gray-300 focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(254,44,85,0.1)]'
                                        } outline-none`}
                                    />
                                </div>
                                {errors.password && (
                                    <span className="text-red-500 text-[1.2rem]">
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <a
                                href="#"
                                className="block text-neutral-500 hover:underline hover:text-black "
                            >
                                Quên mật khẩu?
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
                            onClick={() => {
                                setCurrentUser(true);
                            }}
                        >
                            <span>Đăng nhập với Guest</span>
                        </Button>

                        <div className="text-center mt-4 text-[1.3rem] text-gray-600">
                            Chưa có tài khoản?
                            <Link
                                to={config.routes.register}
                                className="text-[var(--primary)] font-semibold hover:underline"
                            >
                                Đăng ký ngay
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
