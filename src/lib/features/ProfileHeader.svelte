<script lang="ts">
	import { IconPencil } from '$lib/components/icons';
	import { UserAvatar } from '$lib/components';
	import type { User, SuggestedUser } from '$lib/types';

	interface Props {
		profileData: User | SuggestedUser;
		isOwnProfile: boolean;
		onEditProfile: () => void;
	}

	let { profileData, isOwnProfile, onEditProfile }: Props = $props();
</script>

<div class="flex flex-row gap-4">
	<div class="flex justify-start">
		<UserAvatar size={30} class="ring-4 ring-purple-200 shadow-lg" user={profileData} />
	</div>

	<div class="flex-1 text-left">
		<div class="mb-4">
			<h1 class="text-base font-normal truncate text-gray-900">
				{profileData.nickname}
			</h1>
			<p class="text-base text-gray-600 truncate mt-4">
				{profileData.first_name} {profileData.last_name}
			</p>
		</div>

		{#if isOwnProfile}
			<button
				onclick={onEditProfile}
				class="inline-flex items-center justify-center rounded-lg py-2.5 px-4 font-normal border-2 border-gray-300"
			>
				<IconPencil class="w-4 h-4 mr-2" />
				<span>Edit profile</span>
			</button>
		{:else}
			<button
				class="inline-flex items-center justify-center rounded-lg py-2.5 px-6 text-base text-white font-normal bg-primary shadow-md"
			>
				Theo dõi
			</button>
		{/if}
	</div>
</div>
