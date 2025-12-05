import { Link } from 'wouter-preact';

import config from '~/core/config';
import { images, Image } from '~/shared';

function Header() {
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
