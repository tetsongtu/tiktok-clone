<script lang="ts">
	import HomePage from '../../../+page.svelte';
	
	interface Props {
		data: { videoId: number; username: string };
	}
	
	let { data }: Props = $props();
</script>

<HomePage initialVideoId={data.videoId} />
