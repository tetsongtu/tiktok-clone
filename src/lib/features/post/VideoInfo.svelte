<script lang="ts">
	interface Props {
		description?: string;
		hashtags?: string;
	}

	let { description, hashtags = '#fun #cool #SuperAwesome' }: Props = $props();
</script>

<div class="absolute bottom-0 left-0 right-0 pointer-events-none">
	<div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-b-2xl"></div>

	<div class="relative p-4 text-white">
		<p class="my-1 text-base">{description}</p>
		<p class="text-gray-300">{hashtags}</p>
	</div>
</div>
