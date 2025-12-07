<script lang="ts">
	import { IconPlay, IconMute, IconVolume } from '~/lib/components/icons';

	interface Props {
		src: string;
		aspectRatio: { class: string; isWide: boolean };
		isAnyCommentOpen: boolean;
		videoState: { isPlaying: boolean; isMuted: boolean };
		onTogglePlayPause: () => void;
		onToggleMute: () => void;
		onVideoMount?: (el: HTMLVideoElement) => void;
	}

	let { src, aspectRatio, isAnyCommentOpen, videoState, onTogglePlayPause, onToggleMute, onVideoMount }: Props = $props();

	let videoEl = $state<HTMLVideoElement>();

	$effect(() => {
		if (videoEl && onVideoMount) {
			onVideoMount(videoEl);
		}
	});
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video
	bind:this={videoEl}
	class="{aspectRatio.class} rounded-2xl object-cover {isAnyCommentOpen && aspectRatio.isWide
		? 'h-[85vh] max-w-[50vw]'
		: 'h-[95vh] max-w-[60vw]'} cursor-pointer"
	loop
	autoplay
	playsinline
	{src}
	onclick={onTogglePlayPause}
></video>

{#if !videoState.isPlaying}
	<div class="absolute inset-0 flex items-center justify-center pointer-events-none">
		<div class="bg-black/50 rounded-full p-4">
			<IconPlay class="w-12 h-12 text-white" />
		</div>
	</div>
{/if}

<button
	onclick={onToggleMute}
	aria-label={videoState.isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
	class="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
>
	{#if videoState.isMuted}
		<IconMute class="w-6 h-6 text-white" />
	{:else}
		<IconVolume class="w-6 h-6 text-white" />
	{/if}
</button>
