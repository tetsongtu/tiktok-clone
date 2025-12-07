<script lang="ts">
	import { page } from '$app/state';
	import HomePage from '../../../+page.svelte';

	const videoId = $derived(Number(page.params.id));
</script>

<HomePage initialVideoId={videoId} />
