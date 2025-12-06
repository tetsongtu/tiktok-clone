<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		post: any;
	}

	let { post }: Props = $props();

	onMount(() => {
		const video = document.getElementById(`video${post?.id}`) as HTMLVideoElement;
		if (!video) return;

		const handleMouseEnter = () => video.play();
		const handleMouseLeave = () => video.pause();

		setTimeout(() => {
			video.addEventListener('mouseenter', handleMouseEnter);
			video.addEventListener('mouseleave', handleMouseLeave);
		}, 50);

		return () => {
			video.removeEventListener('mouseenter', handleMouseEnter);
			video.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div class="relative brightness-90 cursor-pointer">
	{#if !post.video_url}
		<div
			class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black"
		>
			<svg class="w-20 h-20 text-white animate-spin" viewBox="0 0 256 256" fill="currentColor">
				<path
					d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Z"
				/>
			</svg>
		</div>
	{:else}
		<a href="/post/{post.id}/{post.user_id}">
			<video
				id="video{post.id}"
				muted
				loop
				class="aspect-[3/4] object-cover rounded-md"
				src={post.video_url}
			/>
		</a>
	{/if}
	<div class="px-1">
		<p class="text-gray-700 text-[15px] pt-1 break-words">{post.text}</p>
		<div class="flex items-center gap-4 -ml-1 text-gray-600 font-normal text-base">
			<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
				<path
					d="M224,200h-8V40a8,8,0,0,0-8-8H152a8,8,0,0,0-8,8V80H96a8,8,0,0,0-8,8v40H48a8,8,0,0,0-8,8v64H32a8,8,0,0,0,0,16H224a8,8,0,0,0,0-16Z"
				/>
			</svg>
			3%
			<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
				<path
					d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"
				/>
			</svg>
		</div>
	</div>
</div>
