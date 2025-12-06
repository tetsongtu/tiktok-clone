<script lang="ts">
	import { onMount } from 'svelte';

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

	onMount(() => {
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
				class="flex justify-center items-center rounded-full bg-white/90 disabled:cursor-not-allowed"
			>
				<svg class="w-12 h-12 text-purple-600" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-101.66a8,8,0,0,1-11.32,11.32L136,107.31V168a8,8,0,0,1-16,0V107.31l-18.34,18.35a8,8,0,0,1-11.32-11.32l32-32a8,8,0,0,1,11.32,0Z"
					/>
				</svg>
			</button>
			<button
				onclick={() => handleScroll('down')}
				disabled={!canScrollDown}
				aria-label="Scroll down"
				class="flex justify-center items-center rounded-full bg-white/90 disabled:cursor-not-allowed"
			>
				<svg class="w-12 h-12 text-purple-600" viewBox="0 0 256 256" fill="currentColor">
					<path
						d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm37.66-109.66-32,32a8,8,0,0,1-11.32,0l-32-32a8,8,0,0,1,11.32-11.32L120,116.69V56a8,8,0,0,1,16,0v60.69l18.34-18.35a8,8,0,0,1,11.32,11.32Z"
					/>
				</svg>
			</button>
		</div>
	</div>
{/if}
