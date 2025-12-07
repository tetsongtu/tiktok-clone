<script lang="ts">
	import { IconPlay, IconMute, IconVolume } from '$lib/components/icons';
	import type { AspectRatio, VideoState } from '$lib/types';

	interface Props {
		src: string;
		aspectRatio: AspectRatio;
		isAnyCommentOpen: boolean;
		onVideoMount?: (el: HTMLVideoElement) => void;
	}

	let { src, aspectRatio, isAnyCommentOpen, onVideoMount }: Props = $props();

	let videoEl = $state<HTMLVideoElement>();
	let videoState = $state<VideoState>({ isPlaying: true, isMuted: true });

	const togglePlayPause = () => {
		if (!videoEl) return;
		if (videoEl.paused) {
			videoEl.play();
			videoState.isPlaying = true;
		} else {
			videoEl.pause();
			videoState.isPlaying = false;
		}
	};

	const toggleMute = () => {
		if (!videoEl) return;
		const newMutedState = !videoEl.muted;
		videoEl.muted = newMutedState;
		videoState.isMuted = newMutedState;
	};

	$effect(() => {
		if (videoEl && onVideoMount) {
			onVideoMount(videoEl);
		}
	});
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<!-- svelte-ignore a11y_media_has_caption -->
<video
	bind:this={videoEl}
	class="{aspectRatio.class} rounded-2xl object-cover {isAnyCommentOpen && aspectRatio.isWide
		? 'h-[85vh] max-w-[50vw]'
		: 'h-[95vh] max-w-[60vw]'} cursor-pointer"
	loop
	autoplay
	playsinline
	muted
	{src}
	onclick={togglePlayPause}
></video>

{#if !videoState.isPlaying}
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
		<div class="bg-black/50 rounded-full p-4">
			<IconPlay class="w-12 h-12 text-white" />
		</div>
	</div>
{/if}

<button
	onclick={toggleMute}
	aria-label={videoState.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
	class="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
>
	{#if videoState.isMuted}
		<IconMute class="w-6 h-6 text-white" />
	{:else}
		<IconVolume class="w-6 h-6 text-white" />
	{/if}
</button>
