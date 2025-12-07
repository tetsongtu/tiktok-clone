<script lang="ts">
	import Header from '~/lib/layouts/Header.svelte';
	import Sidebar from '~/lib/layouts/Sidebar.svelte';
	import TopRightActionBar from '~/lib/layouts/TopRightActionBar.svelte';
	import ScrollButtons from '~/lib/features/ScrollButtons.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="relative grid grid-cols-[auto_1fr] min-h-[100dvh]">
	<aside class="w-[250px] bg-gradient-to-b from-purple-100 via-purple-300 z-10">
		<Header />
		<Sidebar />
	</aside>

	<div class="flex h-[100dvh]">
		<div class="w-[8px] bg-gradient-to-b from-purple-300 via-yellow-700"></div>

		<main id="MainContent" class="flex-1">
			<div
				class="h-full overflow-y-auto snap-y snap-mandatory bg-gradient-to-b from-gray-200 to-yellow-200 pr-[258px]"
			>
				<div class="min-h-full py-2 px-4">
					{@render children()}
				</div>
			</div>

			<ScrollButtons />
		</main>

		<div
			class="fixed top-0 right-[250px] h-screen w-[8px] bg-gradient-to-b from-yellow-200 via-cyan-700 to-cyan-50 pointer-events-none z-10"
		></div>
		<aside
			class="fixed top-0 right-0 h-screen w-[250px] bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-50 pointer-events-none z-10"
		></aside>
		<div class="fixed top-10 right-16 z-30">
			<TopRightActionBar />
		</div>
	</div>
</div>
