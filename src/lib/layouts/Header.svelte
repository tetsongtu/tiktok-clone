<script lang="ts">
	import { goto } from '$app/navigation';
	import Image from '~/lib/components/Image.svelte';
	import LoadingOverlay from '~/lib/components/LoadingOverlay.svelte';
	import images from '~/lib/assets/images';

	let loading = $state(false);

	function handleLogoClick(e: MouseEvent) {
		e.preventDefault();
		loading = true;

		// Close comment drawer
		const drawer = document.querySelector('[data-comment-drawer]') as HTMLElement;
		if (drawer) {
			drawer.style.transform = 'translateX(100%)';
		}

		if ((window as any).closeCommentDrawer) {
			(window as any).closeCommentDrawer();
		}

		// Refresh video feed
		if ((window as any).refreshVideoFeed) {
			(window as any).refreshVideoFeed();
		}

		// Navigate to home
		goto('/').then(() => {
			setTimeout(() => {
				loading = false;
			}, 300);
		});
	}
</script>

<div class="fixed pl-3 pt-4 flex z-50">
	<a href="/" onclick={handleLogoClick}>
		<div class="cursor-pointer">
			<Image class="h-[39px] px-[8px]" src={images.logo} alt="TikTok" />
		</div>
	</a>
</div>

{#if loading}
	<LoadingOverlay />
{/if}
