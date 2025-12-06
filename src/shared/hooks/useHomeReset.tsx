import { resetToHome } from '~/shared/utils/urlHelper';

export function useHomeReset() {
    return () => {
        // Hide comment drawer
        const drawer = document.querySelector('[data-comment-drawer]') as HTMLElement;
        if (drawer) {
            drawer.style.transition = 'none';
            drawer.style.transform = 'translateX(100%)';
        }

        // Close comment drawer (global callback)
        if ((window as any).closeCommentDrawer) {
            (window as any).closeCommentDrawer();
        }

        // Reset route to home
        resetToHome();

        // Refresh feed (global callback)
        if ((window as any).refreshVideoFeed) {
            (window as any).refreshVideoFeed();
        }
    };
}
