<script lang="ts">
	import '$lib/../global.css';
	import { ZoomWarning } from '$lib/components';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="app">
	<ZoomWarning />
	{@render children()}
</div>
