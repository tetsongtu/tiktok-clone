import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { GUEST_USER } from '~/lib/constants/guestUser';

function createUserStore() {
    const stored = browser ? localStorage.getItem('user') : null;
    const initial = stored ? JSON.parse(stored) : null;

    const { subscribe, set, update } = writable<any>(initial);

    // Sync with localStorage
    if (browser) {
        subscribe((value) => {
            if (value) {
                localStorage.setItem('user', JSON.stringify(value));
            } else {
                localStorage.removeItem('user');
            }
        });

        // Handle Ctrl + L shortcut
        window.addEventListener('keydown', (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
                e.preventDefault();
                update((currentUser) => (currentUser ? null : GUEST_USER));
            }
        });
    }

    return {
        subscribe,
        set,
        update,
    };
}

export const userStore = createUserStore();
