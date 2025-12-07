<script lang="ts">
	import HomePage from '../../../+page.svelte';
	import { page } from '$app/state';

	const videoId = $derived(Number(page.params.id));
</script>

<HomePage initialVideoId={videoId} />
