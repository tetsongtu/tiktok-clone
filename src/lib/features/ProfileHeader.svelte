<script lang="ts">
	import { IconPencil, IconCheckCircle } from '$lib/components/icons';
	import { UserAvatar, Button } from '$lib/components';
	import type { User, SuggestedUser } from '$lib/types';

	interface Props {
		profileData: User | SuggestedUser;
		isOwnProfile: boolean;
		onEditProfile: () => void;
	}

	let { profileData, isOwnProfile, onEditProfile }: Props = $props();

	let isFollowing = $state(false);

	const fullName = $derived(
		[profileData.first_name, profileData.last_name].filter(Boolean).join(' ') || profileData.nickname
	);

	function handleFollow() {
		isFollowing = !isFollowing;
		// TODO: Call API to follow/unfollow
	}
</script>

<header class="flex flex-row gap-6">
	<div class="flex-shrink-0">
		<UserAvatar size={30} class="ring-4 ring-purple-200 shadow-lg" user={profileData} />
	</div>

	<div class="flex-1 min-w-0">
		<div class="mb-4">
			<h1 class="text-2xl font-bold flex items-center gap-2 text-gray-900">
				<span class="truncate">@{profileData.nickname}</span>
				{#if profileData.tick}
					<span title="Verified account">
						<IconCheckCircle class="w-5 h-5 text-blue-500 flex-shrink-0" />
					</span>
				{/if}
			</h1>
			<p class="text-lg text-gray-600 truncate mt-1">
				{fullName}
			</p>
		</div>

		{#if isOwnProfile}
			<Button variant="outline" onclick={onEditProfile}>
				{#snippet children()}
					<IconPencil class="w-4 h-4 mr-2" />
					Edit profile
				{/snippet}
			</Button>
		{:else}
			<Button
				variant={isFollowing ? 'outline' : 'primary'}
				onclick={handleFollow}
			>
				{#snippet children()}
					{isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
				{/snippet}
			</Button>
		{/if}

		{#if profileData.bio}
			<p class="mt-4 text-gray-700 whitespace-pre-wrap">{profileData.bio}</p>
		{/if}
	</div>
</header>
