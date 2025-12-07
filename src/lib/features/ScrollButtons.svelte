<script lang="ts">
	import { IconArrowUp, IconArrowDown } from '$lib/components/icons';

	const SCROLL_THRESHOLD = 5;
	const INIT_DELAY = 300;

	let ready = $state(false);
	let canScrollUp = $state(false);
	let canScrollDown = $state(false);

	function getScrollContainer(): Element | null {
		return document.getElementById('MainContent')?.querySelector('.overflow-y-auto') ?? null;
	}

	function checkScroll() {
		const container = getScrollContainer();
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		ready = true;
		canScrollUp = scrollTop > SCROLL_THRESHOLD;
		canScrollDown = scrollTop + clientHeight < scrollHeight - SCROLL_THRESHOLD;
	}

	function handleScroll(direction: 'up' | 'down') {
		const container = getScrollContainer();
		if (!container) return;

		container.scrollBy({
			top: direction === 'down' ? window.innerHeight : -window.innerHeight,
			behavior: 'smooth',
		});
	}

	function handleKeyDown(e: KeyboardEvent, direction: 'up' | 'down') {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleScroll(direction);
		}
	}

	$effect(() => {
		const container = getScrollContainer();
		if (!container) return;

		const timer = setTimeout(checkScroll, INIT_DELAY);
		container.addEventListener('scroll', checkScroll, { passive: true });

		return () => {
			clearTimeout(timer);
			container.removeEventListener('scroll', checkScroll);
		};
	});
</script>

{#if ready}
	<nav
		class="fixed top-0 right-0 h-screen w-24 flex items-center justify-center pointer-events-none z-30"
		aria-label="Page scroll controls"
	>
		<div class="flex flex-col gap-4 pointer-events-auto" role="group">
			<button
				onclick={() => handleScroll('up')}
				onkeydown={(e) => handleKeyDown(e, 'up')}
				disabled={!canScrollUp}
				aria-label="Scroll to previous video"
				class="w-12 h-12 flex justify-center items-center rounded-full bg-white/90 shadow-md hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				<IconArrowUp class="w-8 h-8 text-primary" />
			</button>
			<button
				onclick={() => handleScroll('down')}
				onkeydown={(e) => handleKeyDown(e, 'down')}
				disabled={!canScrollDown}
				aria-label="Scroll to next video"
				class="w-12 h-12 flex justify-center items-center rounded-full bg-white/90 shadow-md hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				<IconArrowDown class="w-8 h-8 text-primary" />
			</button>
		</div>
	</nav>
{/if}
