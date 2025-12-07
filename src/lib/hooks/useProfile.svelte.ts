import { page } from '$app/state';
import { userStore } from '$lib/stores';
import { searchService } from '$lib/services';
import { VALIDATION, UI } from '$lib/constants';
import type { User, SuggestedUser, ProfileStatus } from '$lib/types';

export function useProfile() {
	let rawNickname = $state(page.params.nickname || '');
	let nickname = $derived(rawNickname.replace('@', '').trim());
	let isOwnProfile = $derived(userStore.current?.nickname === nickname);

	let profileData = $state<SuggestedUser | User | null>(null);
	let status = $state<ProfileStatus>('idle');
	let error = $state('');
	let lastLoadedNickname = $state('');

	const profileCache = new Map<string, SuggestedUser | User>();

	$effect(() => {
		rawNickname = page.params.nickname || '';
	});

	$effect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		async function loadProfile() {
			if (lastLoadedNickname !== nickname) {
				profileData = null;
				status = 'idle';
			}

			// Validate nickname
			if (
				!nickname ||
				!VALIDATION.NICKNAME_PATTERN.test(nickname) ||
				nickname.length > VALIDATION.NICKNAME_MAX_LENGTH
			) {
				status = 'error';
				error = 'Invalid username';
				lastLoadedNickname = nickname;
				return;
			}

			// Own profile - use store data
			const currentUser = userStore.current;
			if (currentUser?.nickname === nickname) {
				profileData = currentUser;
				status = 'success';
				lastLoadedNickname = nickname;
				return;
			}

			// Check cache
			if (profileCache.has(nickname)) {
				profileData = profileCache.get(nickname)!;
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
					const foundUser = await searchService.findByNickname(nickname);
					if (foundUser) {
						profileData = foundUser;
						profileCache.set(nickname, foundUser);
						status = 'success';
					} else {
						status = 'not_found';
						error = 'User not found';
					}
				} catch {
					status = 'error';
					error = 'Failed to load profile';
				}
			}, UI.DEBOUNCE_DELAY);
		}

		loadProfile();
		return () => clearTimeout(timeoutId);
	});

	return {
		get nickname() {
			return nickname;
		},
		get profileData() {
			return profileData;
		},
		get status() {
			return status;
		},
		get error() {
			return error;
		},
		get isOwnProfile() {
			return isOwnProfile;
		},
	};
}
