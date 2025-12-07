<script lang="ts">
	import { Button, UserAvatar } from '$lib/components';
	import { IconCheckCircle } from '$lib/components/icons';
	import { formatCount } from '$lib/utils';
	import { userStore } from '$lib/stores';
	import type { User, SuggestedUser } from '$lib/types';

	interface Props { user: User | SuggestedUser; }
	let { user }: Props = $props();

	let isFollowing = $state('is_followed' in user && user.is_followed);

	const isLoggedIn = $derived(userStore.isLoggedIn());
	const isOwn = $derived(userStore.current?.nickname === user.nickname);
	const fullName = $derived([user.first_name, user.last_name].filter(Boolean).join(' ') || user.nickname);

	function follow(e: MouseEvent) { e.preventDefault(); e.stopPropagation(); if (isLoggedIn) isFollowing = !isFollowing; }
</script>

<article class="w-full p-4">
	<a href="/@{user.nickname}" class="block">
		<header class="flex justify-between items-start gap-4">
			<UserAvatar {user} size={12} />
			{#if !isOwn}
				<Button variant={isFollowing ? 'outline' : 'primary'} size="small" onclick={follow} disabled={!isLoggedIn}>
					{#snippet children()}{isFollowing ? 'Following' : 'Follow'}{/snippet}
				</Button>
			{/if}
		</header>
	</a>

	<section class="mt-4">
		<a href="/@{user.nickname}" class="hover:underline">
			<p class="font-bold flex items-center gap-1">
				@{user.nickname}
				{#if user.tick}<IconCheckCircle class="w-4 h-4 text-blue-500" />{/if}
			</p>
		</a>
		<p class="text-sm text-gray-600">{fullName}</p>
		<div class="mt-3 flex gap-4 text-sm">
			<div><strong>{formatCount(user.followers_count || 0)}</strong> <span class="text-gray-500">Followers</span></div>
			<div><strong>{formatCount(user.likes_count || 0)}</strong> <span class="text-gray-500">Likes</span></div>
		</div>
		{#if user.bio}<p class="mt-3 text-sm text-gray-700 line-clamp-2">{user.bio}</p>{/if}
	</section>
</article>
