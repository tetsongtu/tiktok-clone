import { Link } from 'wouter-preact';
import { useEffect } from 'preact/hooks';

import config from '~/core/config';
import { images, Image, GUEST_USER } from '~/shared';
import { useCurrentUser } from '~/shared/hooks';

function Header() {
    const { setCurrentUser, setCurrentUserData } = useCurrentUser();

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                setCurrentUser((prev) => {
                    const newValue = !prev;
                    // Khi login, set GUEST_USER; khi logout, clear data
                    setCurrentUserData(newValue ? GUEST_USER : null);
                    return newValue;
                });
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [setCurrentUser, setCurrentUserData]);

    return (
        <>
            <div className="fixed pl-4.5 pt-5 hidden lg:flex">
                <Link to={config.routes.home}>
                    <Image className="h-[42px] px-[8px]" src={images.logo} alt="TikTok" />
                </Link>
            </div>
        </>
    );
}

export default Header;
