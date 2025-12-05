import { Link } from 'wouter-preact';
import config from '~/core/config';
import { images, Image } from '~/shared';
import { resetToHome } from '~/shared/utils/urlHelper';

function Header() {
    const handleLogoClick = (e: Event) => {
        e.preventDefault();

        // Hide drawer immediately
        const drawer = document.querySelector('[data-comment-drawer]') as HTMLElement;
        if (drawer) {
            drawer.style.transition = 'none';
            drawer.style.transform = 'translateX(100%)';
        }

        // Show loading indicator
        const loading = document.createElement('div');
        loading.className =
            'fixed top-24 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-8 py-4 rounded-full z-[60] text-lg font-semibold shadow-lg';
        loading.textContent = 'Đang tải...';
        loading.style.opacity = '0';
        loading.style.transition = 'opacity 200ms ease-out';
        document.body.appendChild(loading);

        // Fade in
        setTimeout(() => {
            loading.style.opacity = '1';
        }, 10);

        // Close drawer state
        if ((window as any).closeCommentDrawer) {
            (window as any).closeCommentDrawer();
        }

        resetToHome();

        // Refresh videos
        if ((window as any).refreshVideoFeed) {
            (window as any).refreshVideoFeed();
        }

        // Remove loading indicator after a short delay
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => loading.remove(), 200);
        }, 600);
    };

    return (
        <>
            <div className="fixed pl-4.5 pt-5 hidden lg:flex">
                <Link to={config.routes.home} onClick={handleLogoClick}>
                    <Image className="h-[42px] px-[8px]" src={images.logo} alt="TikTok" />
                </Link>
            </div>
        </>
    );
}

export default Header;
