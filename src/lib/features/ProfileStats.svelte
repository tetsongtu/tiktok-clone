<script lang="ts">
	import { formatCount } from '$lib/utils';
	import type { User, SuggestedUser } from '$lib/types';

	interface Props {
		profileData: User | SuggestedUser;
	}

	let { profileData }: Props = $props();

	const stats = $derived([
		{ value: formatCount(profileData?.followings_count || 0), label: 'Đang theo dõi' },
		{ value: formatCount(profileData?.followers_count || 0), label: 'Follower' },
		{ value: formatCount(profileData?.likes_count || 0), label: 'Thích' }
	]);
</script>

<div class="flex items-center justify-start gap-6 pt-6">
	{#each stats as stat, i}
		{#if i > 0}
			<div class="w-px h-8 bg-gray-300"></div>
		{/if}
		<div class="text-left">
			<span class="text-lg font-semibold text-gray-900 block">{stat.value}</span>
			<span class="text-gray-500 text-sm">{stat.label}</span>
		</div>
	{/each}
</div>

{#if profileData?.bio}
	<p class="pt-6 text-gray-700 text-base max-w-[600px] leading-relaxed text-left">
		{profileData.bio}
	</p>
{/if}
