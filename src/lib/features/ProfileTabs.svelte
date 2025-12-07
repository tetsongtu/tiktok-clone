<script lang="ts">
	type TabType = 'videos' | 'liked';

	interface Props {
		activeTab: TabType;
		onTabChange: (tab: TabType) => void;
	}

	let { activeTab, onTabChange }: Props = $props();

	const TABS: { id: TabType; label: string }[] = [
		{ id: 'videos', label: 'Video' },
		{ id: 'liked', label: 'Đã thích' }
	];
</script>

<div class="w-full flex items-center pt-8 border-b-2 border-gray-200 relative">
	{#each TABS as tab (tab.id)}
		<button
			onclick={() => onTabChange(tab.id)}
			class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === tab.id
				? 'text-black'
				: 'text-gray-500'}"
		>
			{tab.label}
		</button>
	{/each}
	<div
		class="absolute bottom-0 left-0 h-[3px] bg-black transition-transform duration-300"
		style="width: 240px; transform: translateX({activeTab === 'videos' ? '0%' : '100%'})"
	></div>
</div>
