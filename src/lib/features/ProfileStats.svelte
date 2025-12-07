<script lang="ts">
	import type { User, SuggestedUser } from '~/lib/types/user';

	interface Props {
		profileData: User | SuggestedUser;
	}

	let { profileData }: Props = $props();
</script>

<div class="flex items-center justify-start gap-4 pt-6">
	<div class="text-left">
		<span class="text-base font-normal text-gray-900 block">
			{profileData?.followings_count || 0}
		</span>
		<span class="text-gray-500 font-normal text-base">Đang theo dõi</span>
	</div>

	<div class="w-px h-8 bg-gray-300"></div>
	<div class="text-left">
		<span class="text-base font-normal text-gray-900 block">
			{profileData?.likes_count || 0}
		</span>
		<span class="text-gray-500 font-normal text-base">Thích</span>
	</div>
</div>

{#if profileData?.bio}
	<p class="pt-6 text-gray-700 text-base max-w-[600px] leading-relaxed text-left">
		{profileData.bio}
	</p>
{/if}
