<script lang="ts">
	import { IconChartBar } from '~/lib/components/icons';

	interface Props {
		post: any;
	}

	let { post }: Props = $props();

	function handleMouseEnter() {
		const video = document.getElementById(`video${post.id}`) as HTMLVideoElement;
		if (video) video.play();
	}

	function handleMouseLeave() {
		const video = document.getElementById(`video${post.id}`) as HTMLVideoElement;
		if (video) video.pause();
	}
</script>

<div class="relative cursor-pointer">
	<a href="/post/{post.id}/{post.user_id}" aria-label="View video post">
		<div 
			role="button"
			tabindex="0"
			class="aspect-[3/4] bg-gray-200 rounded-md flex items-center justify-center"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			{#if post?.file_url}
				<video
					id="video{post.id}"
					muted
					loop
					class="w-full h-full object-cover rounded-md"
					src={post.file_url}
				></video>
			{:else}
				<span class="text-gray-400 text-sm">No video</span>
			{/if}
		</div>
	</a>
	<div class="px-1 mt-2">
		<p class="text-gray-700 text-[15px] break-words line-clamp-2">
			{post?.description || ''}
		</p>
		<div class="flex items-center gap-2 text-gray-600 text-sm mt-1">
			<IconChartBar class="w-4 h-4" />
			<span>{post?.likes_count || 0}</span>
		</div>
	</div>
</div>
