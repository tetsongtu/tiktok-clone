<script lang="ts">
	import { Header } from '$lib/layouts';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div id="HeaderOnly" class="flex bg-[#F8F8F8] h-screen">
	<Header />
	<div class="mt-[70px] w-full max-w-[1140px] mx-auto px-2">
		{@render children?.()}
	</div>
</div>
