<script lang="ts">
	import type { Snippet } from 'svelte';

	type BannerType = 'info' | 'warning' | 'error' | 'success';

	interface Props {
		type?: BannerType;
		children: Snippet;
	}

	let { type = 'info', children }: Props = $props();

	const styles: Record<BannerType, string> = {
		info: 'bg-gradient-to-r from-purple-600 to-pink-600',
		warning: 'bg-gradient-to-br from-red-400 to-red-500',
		error: 'bg-gradient-to-r from-red-600 to-red-700',
		success: 'bg-gradient-to-r from-green-500 to-green-600'
	};
</script>

<div
	class="fixed top-24 left-1/2 -translate-x-1/2 
		{styles[type]}
		text-white px-8 py-4 rounded-full z-[60]
		text-base font-normal shadow-2xl backdrop-blur-sm
		flex items-center gap-4 max-w-[90%]"
>
	{@render children()}
</div>
