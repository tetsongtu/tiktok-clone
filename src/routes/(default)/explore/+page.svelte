<script lang="ts">
	import { IconSearch } from '$lib/components/icons';

	interface Category {
		id: string;
		name: string;
		icon: string;
		color: string;
	}

	const CATEGORIES: Category[] = [
		{ id: 'trending', name: 'Thịnh hành', icon: '🔥', color: 'bg-red-100' },
		{ id: 'music', name: 'Âm nhạc', icon: '🎵', color: 'bg-purple-100' },
		{ id: 'dance', name: 'Nhảy múa', icon: '💃', color: 'bg-pink-100' },
		{ id: 'comedy', name: 'Hài hước', icon: '😂', color: 'bg-yellow-100' },
		{ id: 'food', name: 'Ẩm thực', icon: '🍜', color: 'bg-orange-100' },
		{ id: 'sports', name: 'Thể thao', icon: '⚽', color: 'bg-green-100' },
		{ id: 'gaming', name: 'Game', icon: '🎮', color: 'bg-blue-100' },
		{ id: 'beauty', name: 'Làm đẹp', icon: '💄', color: 'bg-pink-100' },
		{ id: 'fashion', name: 'Thời trang', icon: '👗', color: 'bg-indigo-100' },
		{ id: 'travel', name: 'Du lịch', icon: '✈️', color: 'bg-cyan-100' },
		{ id: 'education', name: 'Giáo dục', icon: '📚', color: 'bg-teal-100' },
		{ id: 'pets', name: 'Thú cưng', icon: '🐶', color: 'bg-amber-100' }
	];

	let selectedCategory = $state<string | null>(null);
	const selectedCategoryData = $derived(CATEGORIES.find((c) => c.id === selectedCategory));
</script>

<div class="max-w-7xl mx-auto py-6 px-4">
	<header class="mb-8">
		<div class="flex items-center gap-3 mb-4">
			<IconSearch class="w-6 h-6 text-gray-600" />
			<h1 class="text-2xl font-semibold text-gray-800">Khám phá</h1>
		</div>
		<p class="text-gray-600">Tìm kiếm nội dung theo danh mục yêu thích của bạn</p>
	</header>

	<section>
		<h2 class="text-lg font-medium text-gray-700 mb-4">Danh mục</h2>
		<div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
			{#each CATEGORIES as category (category.id)}
				<button
					onclick={() => (selectedCategory = selectedCategory === category.id ? null : category.id)}
					class="{category.color} rounded-xl p-4 shadow-sm transition-all hover:scale-105 {selectedCategory ===
					category.id
						? 'ring-2 ring-primary'
						: ''}"
				>
					<div class="text-3xl mb-2">{category.icon}</div>
					<div class="text-sm font-medium text-gray-800">{category.name}</div>
				</button>
			{/each}
		</div>
	</section>

	{#if selectedCategory && selectedCategoryData}
		<section class="mt-8 p-6 bg-white rounded-xl shadow-sm">
			<div class="flex items-center gap-3 mb-4">
				<span class="text-2xl">{selectedCategoryData.icon}</span>
				<h2 class="text-xl font-semibold text-gray-800">
					{selectedCategoryData.name}
				</h2>
			</div>
			<p class="text-gray-500">Nội dung đang được cập nhật...</p>
		</section>
	{/if}
</div>
