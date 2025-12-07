<script lang="ts">
	import { Image, LoadingOverlay } from '$lib/components';
	import { commentStore } from '$lib/stores';
	import { UI } from '$lib/constants';
	import images from '$lib/assets/images';

	let loading = $state(false);

	function handleLogoClick(e: MouseEvent) {
		e.preventDefault();
		loading = true;

		commentStore.close();
		(window as any).closeCommentDrawer?.();

		setTimeout(() => {
			window.location.href = '/';
		}, UI.LOADING_DELAY);
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
