<script lang="ts">
	import { page } from '$app/state';

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
	<div class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] max-w-[90%] px-10 py-5 rounded-xl shadow-2xl text-center text-white bg-gradient-to-br from-red-400 to-red-500">
		<h1 class="m-0 mb-4.5 text-base font-normal">
			⚠️ Cảnh báo: Zoom không đúng 100%
		</h1>
		<p class="m-0 text-base opacity-95">
			Vui lòng đặt zoom trình duyệt về 100% để có trải nghiệm tốt nhất
		</p>
	</div>
{/if}
