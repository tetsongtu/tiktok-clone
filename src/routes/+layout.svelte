<script lang="ts">
	import '~/global.css';
	import ZoomWarning from '~/lib/components/ZoomWarning.svelte';
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
