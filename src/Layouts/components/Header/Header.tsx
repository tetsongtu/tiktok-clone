import classNames from 'classnames/bind';
import styles from './Header.module.css';
import { Link } from 'wouter-preact';
import { useEffect } from 'preact/hooks';

import config from '~/core/config';
import images from '~/shared/assets/images';
import Image from '~/shared/components/Image';
import useCurrentUser from '~/shared/hooks/useCurrentUser';

const cx = classNames.bind(styles);

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
            <header className={cx('wrapper')}>
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
