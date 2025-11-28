import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import config from '~/config';
import images from '~/assets/images';
import Image from '~/components/Image';
import useCurrentUser from '~/hooks/useCurrentUser';
import LoginModal from '~/components/Modals/LoginModal';

function Header() {
    const { setCurrentUser } = useCurrentUser();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                setCurrentUser((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [setCurrentUser]);

    return (
        <>
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />

            <header className="fixed h-[100px] py-[20px] px-[16px] hidden lg:flex justify-between">
                <div className="h-full">
                    <Link to={config.routes.home}>
                        <Image
                            className="h-[42px] px-[8px]"
                            src={images.logo}
                            alt="TikTok"
                        />
                    </Link>
                </div>
            </header>
        </>
    );
}

export default Header;
