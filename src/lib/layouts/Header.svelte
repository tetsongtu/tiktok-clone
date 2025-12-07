<script lang="ts">
	import { Image, LoadingOverlay } from '$lib/components';
	import { commentStore } from '$lib/stores';
	import { UI, APP_CONFIG } from '$lib/constants';
	import images from '$lib/assets/images';

	let loading = $state(false);

	function handleLogoClick(e: MouseEvent) {
		e.preventDefault();
		navigateHome();
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			navigateHome();
		}
	}

	function navigateHome() {
		loading = true;
		commentStore.close();
		window.closeCommentDrawer?.();

		setTimeout(() => {
			window.location.href = '/';
		}, UI.LOADING_DELAY);
	}
</script>

<header class="fixed pl-3 pt-4 flex z-50">
	<a
		href="/"
		onclick={handleLogoClick}
		onkeydown={handleKeyDown}
		aria-label="Go to {APP_CONFIG.name} home"
		class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
	>
		<Image class="h-[39px] px-2 cursor-pointer" src={images.logo} alt="{APP_CONFIG.name} logo" />
	</a>
</header>

{#if loading}
	<LoadingOverlay />
{/if}
