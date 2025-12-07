<script lang="ts">
	import { truncate, extractHashtags } from '$lib/utils';

	interface Props {
		description?: string;
		maxLength?: number;
	}

	let { description = '', maxLength = 100 }: Props = $props();

	let isExpanded = $state(false);

	const hashtags = $derived(extractHashtags(description));
	const cleanDescription = $derived(description.replace(/#[\w\u00C0-\u024F]+/g, '').trim());
	const isLongDescription = $derived(cleanDescription.length > maxLength);
	const displayDescription = $derived(
		isExpanded ? cleanDescription : truncate(cleanDescription, maxLength)
	);

	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

<div class="absolute bottom-0 left-0 right-0 pointer-events-none">
	<div
		class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b-2xl"
		aria-hidden="true"
	></div>

	<div class="relative p-4 text-white">
		{#if displayDescription}
			<p class="text-base leading-relaxed mb-1">
				{displayDescription}
				{#if isLongDescription}
					<button
						onclick={toggleExpand}
						class="text-gray-300 hover:text-white ml-1 pointer-events-auto font-medium"
					>
						{isExpanded ? 'Thu gọn' : 'Xem thêm'}
					</button>
				{/if}
			</p>
		{/if}

		{#if hashtags.length > 0}
			<div class="flex flex-wrap gap-1 text-sm">
				{#each hashtags as tag (tag)}
					<a
						href="/tag/{tag.slice(1)}"
						class="text-gray-300 hover:text-white pointer-events-auto transition-colors"
					>
						{tag}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>
