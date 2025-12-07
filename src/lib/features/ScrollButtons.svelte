<script lang="ts">
	import { IconArrowUp, IconArrowDown } from '$lib/components/icons';

	let ready = $state(false);
	let canScrollUp = $state(false);
	let canScrollDown = $state(false);

	function getContainer() {
		return document.getElementById('MainContent')?.querySelector('.overflow-y-auto');
	}

	function checkScroll() {
		const el = getContainer();
		if (!el) return;
		ready = true;
		canScrollUp = el.scrollTop > 5;
		canScrollDown = el.scrollTop + el.clientHeight < el.scrollHeight - 5;
	}

	function scroll(dir: 'up' | 'down') {
		getContainer()?.scrollBy({ top: dir === 'down' ? window.innerHeight : -window.innerHeight, behavior: 'smooth' });
	}

	$effect(() => {
		const el = getContainer();
		if (!el) return;
		const timer = setTimeout(checkScroll, 300);
		el.addEventListener('scroll', checkScroll, { passive: true });
		return () => { clearTimeout(timer); el.removeEventListener('scroll', checkScroll); };
	});
</script>

{#if ready}
	<div class="fixed top-0 right-0 h-screen w-24 flex items-center justify-center pointer-events-none z-30">
		<div class="flex flex-col gap-4 pointer-events-auto">
			<button onclick={() => scroll('up')} disabled={!canScrollUp} aria-label="Scroll up"
				class="w-12 h-12 flex justify-center items-center rounded-full bg-white/90 shadow-md disabled:opacity-50">
				<IconArrowUp class="w-8 h-8 text-primary" />
			</button>
			<button onclick={() => scroll('down')} disabled={!canScrollDown} aria-label="Scroll down"
				class="w-12 h-12 flex justify-center items-center rounded-full bg-white/90 shadow-md disabled:opacity-50">
				<IconArrowDown class="w-8 h-8 text-primary" />
			</button>
		</div>
	</div>
{/if}
