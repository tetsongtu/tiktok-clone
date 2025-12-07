<script lang="ts">
	import { IconArrowUp, IconArrowDown } from '~/lib/components/icons';

	let ready = $state(false);
	let canScrollUp = $state(false);
	let canScrollDown = $state(false);

	function getScrollContainer() {
		return document.getElementById('MainContent')?.querySelector('.overflow-y-auto');
	}

	function checkScroll() {
		const container = getScrollContainer();
		if (!container) return;

		const { scrollTop, scrollHeight, clientHeight } = container;
		ready = true;
		canScrollUp = scrollTop > 5;
		canScrollDown = scrollTop + clientHeight < scrollHeight - 5;
	}

	function handleScroll(direction: 'up' | 'down') {
		getScrollContainer()?.scrollBy({
			top: direction === 'down' ? window.innerHeight : -window.innerHeight,
			behavior: 'smooth'
		});
	}

	$effect(() => {
		const container = getScrollContainer();
		if (!container) return;

		const timer = setTimeout(checkScroll, 300);
		container.addEventListener('scroll', checkScroll);

		return () => {
			clearTimeout(timer);
			container.removeEventListener('scroll', checkScroll);
		};
	});
</script>

{#if ready}
	<div
		class="fixed top-0 right-0 h-screen w-24 flex items-center justify-center pointer-events-none z-30"
	>
		<div class="flex flex-col gap-4 pointer-events-auto">
			<button
				onclick={() => handleScroll('up')}
				disabled={!canScrollUp}
				aria-label="Scroll up"
				class="w-12 h-12 flex justify-center items-center rounded-full bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<IconArrowUp class="w-8 h-8 text-purple-600" />
			</button>
			<button
				onclick={() => handleScroll('down')}
				disabled={!canScrollDown}
				aria-label="Scroll down"
				class="w-12 h-12 flex justify-center items-center rounded-full bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
			>
				<IconArrowDown class="w-8 h-8 text-purple-600" />
			</button>
		</div>
	</div>
{/if}
