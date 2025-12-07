<script lang="ts">
	import { Image, LoadingOverlay } from '$lib/components';
	import { commentStore } from '$lib/stores';
	import { UI } from '$lib/constants';
	import images from '$lib/assets/images';

	let loading = $state(false);

	function navigateHome(e: Event) {
		e.preventDefault();
		loading = true;
		commentStore.close();
		window.closeCommentDrawer?.();
		setTimeout(() => (window.location.href = '/'), UI.LOADING_DELAY);
	}
</script>

<header class="fixed pl-3 pt-4 flex z-50">
	<a href="/" onclick={navigateHome} aria-label="Go to home" class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">
		<Image class="h-[39px] px-2 cursor-pointer" src={images.logo} alt="TikTok logo" />
	</a>
</header>

{#if loading}<LoadingOverlay />{/if}
