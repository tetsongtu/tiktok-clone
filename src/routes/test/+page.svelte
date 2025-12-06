<script lang="ts">
	import { onMount } from 'svelte';
	import { getVideo } from '~/core/services/videoService';

	let video = $state<any>(null);
	let loading = $state(false);
	let error = $state('');

	async function testAPI() {
		loading = true;
		error = '';
		try {
			console.log('Testing API...');
			const result = await getVideo(1);
			console.log('API Result:', result);
			video = result;
		} catch (err: any) {
			console.error('API Error:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		testAPI();
	});
</script>

<div class="p-8">
	<h1 class="text-2xl font-bold mb-4">API Test Page</h1>

	{#if loading}
		<p>Loading...</p>
	{:else if error}
		<p class="text-red-500">Error: {error}</p>
	{:else if video}
		<div class="space-y-4">
			<h2 class="text-xl font-semibold">Video Data:</h2>
			<pre class="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(video, null, 2)}</pre>

			{#if video.file_url}
				<div>
					<h3 class="font-semibold mb-2">Video Player:</h3>
					<video src={video.file_url} controls class="max-w-md"></video>
				</div>
			{:else}
				<p class="text-yellow-600">No file_url found in response</p>
			{/if}
		</div>
	{:else}
		<p>No data</p>
	{/if}

	<button onclick={testAPI} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
		Retry
	</button>
</div>
