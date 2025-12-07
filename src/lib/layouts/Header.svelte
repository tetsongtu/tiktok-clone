<script lang="ts">
	import { commentStore } from '~/lib/stores/commentStore';
	import Image from '~/lib/components/Image.svelte';
	import LoadingOverlay from '~/lib/components/LoadingOverlay.svelte';
	import images from '~/lib/assets/images';

	let loading = $state(false);

	function handleLogoClick(e: MouseEvent) {
		e.preventDefault();
		loading = true;

		commentStore.setActiveVideoId(null);
		(window as any).closeCommentDrawer?.();

		setTimeout(() => {
			window.location.href = '/';
		}, 300);
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
