import { useState } from 'preact/hooks';
import { Link } from 'wouter-preact';
import config from '~/core/config';
import { images, Image } from '~/shared';
import { useHomeReset } from '~/shared/hooks/useHomeReset';
import { LoadingOverlay } from '~/Layouts/components';

function Header() {
    const [loading, setLoading] = useState(false);
    const resetHome = useHomeReset();

    const handleLogoClick = (e: Event) => {
        e.preventDefault();

        setLoading(true);
        resetHome();

        // Hide loading after 800ms
        setTimeout(() => setLoading(false), 800);
    };

    return (
        <>
            <div className="fixed pl-3 pt-4 flex z-50">
                <Link to={config.routes.home} onClick={handleLogoClick}>
                    <div className="cursor-pointer">
                        <Image
                            className="h-[39px] px-[8px]"
                            src={images.logo}
                            alt="TikTok"
                        />
                    </div>
                </Link>
            </div>

            {loading && <LoadingOverlay />}
        </>
    );
}

export default Header;
