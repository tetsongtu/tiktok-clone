<script lang="ts">
	import { Button, UserAvatar } from '$lib/components';
	import { IconCheckCircle } from '$lib/components/icons';
	import { formatCount } from '$lib/utils';
	import { userStore } from '$lib/stores';
	import type { User, SuggestedUser } from '$lib/types';

	interface Props {
		user: User | SuggestedUser;
	}

	let { user }: Props = $props();

	const initialFollowState = 'is_followed' in user ? user.is_followed : false;
	let isFollowing = $state(initialFollowState);

	const followersCount = $derived(formatCount(user.followers_count || 0));
	const likesCount = $derived(formatCount(user.likes_count || 0));
	const fullName = $derived(
		[user.first_name, user.last_name].filter(Boolean).join(' ') || user.nickname
	);
	const isLoggedIn = $derived(userStore.isLoggedIn());
	const isOwnProfile = $derived(userStore.current?.nickname === user.nickname);

	function handleFollow(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		if (!isLoggedIn) return;
		isFollowing = !isFollowing;
		// TODO: Call API to follow/unfollow
	}
</script>

<article class="w-full p-4">
	<a href="/@{user.nickname}" data-sveltekit-preload-data="tap" class="block">
		<header class="flex justify-between items-start gap-4">
			<UserAvatar {user} size={12} />
			{#if !isOwnProfile}
				<Button
					variant={isFollowing ? 'outline' : 'primary'}
					size="small"
					onclick={handleFollow}
					disabled={!isLoggedIn}
				>
					{#snippet children()}
						{isFollowing ? 'Following' : 'Follow'}
					{/snippet}
				</Button>
			{/if}
		</header>
	</a>

	<section class="mt-4">
		<a href="/@{user.nickname}" class="hover:underline">
			<p class="text-base font-bold flex items-center gap-1">
				<span>@{user.nickname}</span>
				{#if user.tick}
					<span title="Verified">
						<IconCheckCircle class="w-4 h-4 text-blue-500" />
					</span>
				{/if}
			</p>
		</a>
		<p class="text-sm text-gray-600">{fullName}</p>

		<div class="mt-3 flex items-center gap-4 text-sm">
			<div>
				<strong>{followersCount}</strong>
				<span class="text-gray-500 ml-1">Followers</span>
			</div>
			<div>
				<strong>{likesCount}</strong>
				<span class="text-gray-500 ml-1">Likes</span>
			</div>
		</div>

		{#if user.bio}
			<p class="mt-3 text-sm text-gray-700 line-clamp-2">{user.bio}</p>
		{/if}
	</section>
</article>
