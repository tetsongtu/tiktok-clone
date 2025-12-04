import { Link } from 'wouter-preact';
import { useEffect } from 'preact/hooks';

import config from '~/core/config';
import { images, Image } from '~/shared';
import { useCurrentUser } from '~/shared/hooks';

function Header() {
    const { setCurrentUser } = useCurrentUser();

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
            <div className="fixed pl-4.5 pt-5">
                <Link to={config.routes.home}>
                    <Image className="h-[42px] px-[8px]" src={images.logo} alt="TikTok" />
                </Link>
            </div>
        </>
    );
}

export default Header;
