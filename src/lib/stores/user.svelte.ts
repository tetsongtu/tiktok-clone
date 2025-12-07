import { browser } from '$app/environment';
import { GUEST_USER } from '$lib/constants';
import type { User, GuestUser } from '$lib/types';

type UserState = User | GuestUser | null;

const STORAGE_KEY = 'user';

function createUserStore() {
	const stored = browser ? localStorage.getItem(STORAGE_KEY) : null;
	let user = $state<UserState>(stored ? JSON.parse(stored) : null);

	// Sync to localStorage
	$effect.root(() => {
		$effect(() => {
			if (!browser) return;
			if (user) {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
			} else {
				localStorage.removeItem(STORAGE_KEY);
			}
		});
	});

	// Ctrl+L shortcut to toggle guest user
	if (browser) {
		window.addEventListener('keydown', (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
				e.preventDefault();
				user = user ? null : GUEST_USER;
			}
		});
	}

	return {
		get current() {
			return user;
		},
		set(newUser: UserState) {
			user = newUser;
		},
		login(userData: User | GuestUser) {
			user = userData;
		},
		logout() {
			user = null;
		},
		isLoggedIn() {
			return user !== null;
		},
	};
}

export const userStore = createUserStore();
