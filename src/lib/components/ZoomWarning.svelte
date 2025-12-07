<script lang="ts">
	import { page } from '$app/state';
	import NotificationBanner from './NotificationBanner.svelte';

	let showWarning = $state(false);
	let isZoomCorrect = $state(true);

	function checkZoom() {
		const zoomLevel = Math.round((window.devicePixelRatio || 1) * 100);
		isZoomCorrect = zoomLevel === 100;
	}

	// Check zoom on mount and resize
	$effect(() => {
		checkZoom();
		window.addEventListener('resize', checkZoom);
		return () => window.removeEventListener('resize', checkZoom);
	});

	// Show warning when route changes and zoom is not 100%
	$effect(() => {
		page.url.pathname;

		if (!isZoomCorrect) {
			showWarning = true;
			const timer = setTimeout(() => {
				showWarning = false;
			}, 5000);
			return () => clearTimeout(timer);
		} else {
			showWarning = false;
		}
	});
</script>

{#if showWarning}
	<NotificationBanner type="warning">
		<span class="text-xl">⚠️</span>
		<div class="flex flex-col gap-1">
			<h1 class="m-0 text-base font-semibold">Zoom không đúng 100%</h1>
			<span class="opacity-95">Vui lòng đặt zoom trình duyệt về 100%</span>
		</div>
	</NotificationBanner>
{/if}
