import { page } from '$app/state';
import { get } from 'svelte/store';
import { userStore } from '~/lib/stores/userStore';
import * as searchService from '~/lib/services/searchService';
import type { User, SuggestedUser } from '~/lib/types/user';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'not_found';

export function useProfile() {
	let rawNickname = $state(page.params.nickname || '');
	let nickname = $derived(rawNickname.replace('@', '').trim());
	let user = $state(get(userStore));
	let isOwnProfile = $derived(user?.nickname === nickname);

	let profileData = $state<SuggestedUser | User | null>(null);
	let status = $state<Status>('idle');
	let error = $state<string>('');
	let lastLoadedNickname = $state<string>('');

	// Update rawNickname when page params change
	$effect(() => {
		rawNickname = page.params.nickname || '';
		user = get(userStore);
	});

	const profileCache = new Map<string, SuggestedUser | User>();

	$effect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		async function loadProfile() {
			// Reset when nickname changes
			if (lastLoadedNickname !== nickname) {
				profileData = null;
				status = 'idle';
			}

			// Validate nickname
			if (!nickname || !/^[a-zA-Z0-9_]+$/.test(nickname) || nickname.length > 30) {
				status = 'error';
				error = 'Invalid username';
				lastLoadedNickname = nickname;
				return;
			}

			// If viewing own profile, use data from userStore
			if (user?.nickname === nickname) {
				profileData = user;
				status = 'success';
				lastLoadedNickname = nickname;
				return;
			}

			// Check memory cache
			if (profileCache.has(nickname)) {
				profileData = profileCache.get(nickname) || null;
				status = 'success';
				lastLoadedNickname = nickname;
				return;
			}

			// Fetch from API with debounce
			clearTimeout(timeoutId);
			status = 'loading';
			lastLoadedNickname = nickname;

			timeoutId = setTimeout(async () => {
				try {
					const results = await searchService.search(nickname, 'less');
					const foundUser = results?.find((u) => u.nickname === nickname) || null;

					if (foundUser) {
						profileData = foundUser;
						profileCache.set(nickname, foundUser);
						status = 'success';
					} else {
						status = 'not_found';
						error = 'User not found';
					}
				} catch (err) {
					status = 'error';
					error = 'Failed to load profile';
				}
			}, 300);
		}

		loadProfile();

		return () => clearTimeout(timeoutId);
	});

	return {
		get nickname() { return nickname; },
		get profileData() { return profileData; },
		get status() { return status; },
		get error() { return error; },
		get isOwnProfile() { return isOwnProfile; }
	};
}
