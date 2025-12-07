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
</script>

<nav class="w-full pt-8 border-b-2 border-gray-200 relative">
	<div class="flex">
		{#each TABS as tab (tab.id)}
			<button onclick={() => onTabChange(tab.id)}
				class="w-60 flex items-center justify-center gap-2 py-3 font-medium {activeTab === tab.id ? 'text-black' : 'text-gray-500'}">
				{tab.label}
				{#if tab.count > 0}<span class="text-sm text-gray-400">({tab.count})</span>{/if}
			</button>
		{/each}
	</div>
	<div class="absolute bottom-0 left-0 h-[3px] bg-black transition-transform duration-300" style="width: 240px; transform: translateX({activeTab === 'videos' ? '0' : '100'}%)"></div>
</nav>
