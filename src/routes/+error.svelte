<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components';
	import { IconUserCircle } from '$lib/components/icons';
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
	<div class="text-center px-4">
		<IconUserCircle class="w-24 h-24 text-gray-300 mx-auto mb-6" />

		<h1 class="text-6xl font-bold text-gray-800 mb-4">
			{page.status}
		</h1>

		<p class="text-xl text-gray-600 mb-8">
			{#if page.status === 404}
				Trang bạn tìm kiếm không tồn tại
			{:else}
				Đã xảy ra lỗi
			{/if}
		</p>

		{#if page.error?.message}
			<p class="text-gray-500 mb-8">{page.error.message}</p>
		{/if}

		<Button variant="primary" onclick={() => (window.location.href = '/')}>
			{#snippet children()}
				Về trang chủ
			{/snippet}
		</Button>
	</div>
</div>
