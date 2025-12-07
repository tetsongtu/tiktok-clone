<script lang="ts">
	type TabType = 'videos' | 'liked';

	interface Props {
		activeTab: TabType;
		onTabChange: (tab: TabType) => void;
		videosCount?: number;
		likedCount?: number;
	}

	let { activeTab, onTabChange, videosCount = 0, likedCount = 0 }: Props = $props();

	const TABS = $derived([
		{ id: 'videos' as TabType, label: 'Video', count: videosCount },
		{ id: 'liked' as TabType, label: 'Đã thích', count: likedCount },
	]);

	const activeIndex = $derived(TABS.findIndex((t) => t.id === activeTab));

	function handleKeyDown(e: KeyboardEvent, tab: TabType) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onTabChange(tab);
		}
	}
</script>

<nav class="w-full pt-8 border-b-2 border-gray-200 relative" aria-label="Profile tabs">
	<div class="flex" role="tablist">
		{#each TABS as tab (tab.id)}
			{@const isActive = activeTab === tab.id}
			<button
				role="tab"
				aria-selected={isActive}
				aria-controls="tabpanel-{tab.id}"
				tabindex={isActive ? 0 : -1}
				onclick={() => onTabChange(tab.id)}
				onkeydown={(e) => handleKeyDown(e, tab.id)}
				class="w-60 flex items-center justify-center gap-2 py-3 text-base font-medium cursor-pointer transition-colors {isActive
					? 'text-black'
					: 'text-gray-500 hover:text-gray-700'}"
			>
				<span>{tab.label}</span>
				{#if tab.count > 0}
					<span class="text-sm text-gray-400">({tab.count})</span>
				{/if}
			</button>
		{/each}
	</div>
	<div
		class="absolute bottom-0 left-0 h-[3px] bg-black transition-transform duration-300 ease-out"
		style="width: 240px; transform: translateX({activeIndex * 100}%)"
		aria-hidden="true"
	></div>
</nav>
