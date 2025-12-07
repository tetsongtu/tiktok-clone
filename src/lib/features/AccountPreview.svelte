<script lang="ts">
	import { UserAvatar } from '$lib/components';
	import type { User, SuggestedUser } from '$lib/types';

	interface Props {
		user: User | SuggestedUser;
	}

	let { user }: Props = $props();
</script>

<div class="w-full p-4">
	<a 
		href="/@{user.nickname}"
		data-sveltekit-preload-data="tap"
	>
		<header class="flex justify-between items-start">
			<UserAvatar {user} />
			<button
				class="rounded-md py-4 px-6 text-base text-white font-normal bg-primary"
			>
				Follow
			</button>
		</header>
	</a>
	<section class="mt-4 text-[#161823]">
		<p class="text-base">
			<strong>{user.nickname}</strong>
		</p>
		<p class="text-base text-gray-600">
			{user.first_name}
			{user.last_name}
		</p>
		<p class="mt-4.5 text-base">
			<strong class="mr-1">{user.followers_count}</strong>
			<span class="text-gray-500 mr-5">Followers</span>
			<strong class="mr-1">{user.likes_count}</strong>
			<span class="text-gray-500">Likes</span>
		</p>
	</section>
</div>
