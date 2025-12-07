<script lang="ts">
	interface Props {
		activeTab: 'videos' | 'liked';
		onTabChange: (tab: 'videos' | 'liked') => void;
	}

	let { activeTab, onTabChange }: Props = $props();
</script>

<div class="w-full flex items-center pt-8 border-b-2 border-gray-200 relative">
	<button
		onclick={() => onTabChange('videos')}
		class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === 'videos'
			? 'text-black'
			: 'text-gray-500'}"
	>
		Video
	</button>
	<button
		onclick={() => onTabChange('liked')}
		class="w-60 text-center py-3 text-base font-normal cursor-pointer {activeTab === 'liked'
			? 'text-black'
			: 'text-gray-500'}"
	>
		Đã thích
	</button>
	<div
		class="absolute bottom-0 left-0 h-[3px] bg-black transition-transform duration-300"
		style="width: 240px; transform: translateX({activeTab === 'videos' ? '0%' : '100%'})"
	></div>
</div>
