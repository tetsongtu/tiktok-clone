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
	let showPlayIcon = $state(false);
	let playIconTimeout: ReturnType<typeof setTimeout>;

	function togglePlayPause() {
		if (!videoEl) return;

		clearTimeout(playIconTimeout);

		if (videoEl.paused) {
			videoEl.play().catch(() => {});
			videoState.isPlaying = true;
		} else {
			videoEl.pause();
			videoState.isPlaying = false;
		}

		// Show play/pause icon briefly
		showPlayIcon = true;
		playIconTimeout = setTimeout(() => {
			showPlayIcon = false;
		}, 500);
	}

	function toggleMute() {
		if (!videoEl) return;
		videoEl.muted = !videoEl.muted;
		videoState.isMuted = videoEl.muted;
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === ' ' || e.key === 'k') {
			e.preventDefault();
			togglePlayPause();
		} else if (e.key === 'm') {
			e.preventDefault();
			toggleMute();
		}
	}

	$effect(() => {
		if (videoEl && onVideoMount) {
			onVideoMount(videoEl);
		}
	});

	$effect(() => {
		return () => clearTimeout(playIconTimeout);
	});
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<div
	class="relative"
	role="button"
	tabindex="0"
	onkeydown={handleKeyDown}
	aria-label="Video player - Press space to play/pause, M to mute"
>
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

	<!-- Play/Pause indicator -->
	{#if showPlayIcon || !videoState.isPlaying}
		<div
			class="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 {showPlayIcon
				? 'opacity-100'
				: 'opacity-70'}"
		>
			<div class="bg-black/50 rounded-full p-4">
				<IconPlay class="w-12 h-12 text-white {videoState.isPlaying ? 'hidden' : ''}" />
			</div>
		</div>
	{/if}

	<!-- Mute button -->
	<button
		onclick={toggleMute}
		aria-label={videoState.isMuted ? 'Unmute video' : 'Mute video'}
		aria-pressed={videoState.isMuted}
		class="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
	>
		{#if videoState.isMuted}
			<IconMute class="w-6 h-6 text-white" />
		{:else}
			<IconVolume class="w-6 h-6 text-white" />
		{/if}
	</button>
</div>
