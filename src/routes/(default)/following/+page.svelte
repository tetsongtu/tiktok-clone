<script lang="ts">
	import { userStore } from '$lib/stores';
	import { Button } from '$lib/components';
	import { IconUserCircle } from '$lib/components/icons';

	const isLoggedIn = $derived(userStore.isLoggedIn());
</script>

<div class="flex items-center justify-center min-h-[60vh]">
	<div class="text-center max-w-md">
		<IconUserCircle class="w-20 h-20 text-gray-300 mx-auto mb-6" />

		<h2 class="text-2xl font-semibold text-gray-800 mb-4">Following</h2>

		{#if isLoggedIn}
			<p class="text-gray-600 mb-6">
				Video từ những tài khoản bạn theo dõi sẽ xuất hiện ở đây
			</p>
			<p class="text-gray-500 text-sm">
				Hãy theo dõi một số tài khoản để xem video của họ
			</p>
		{:else}
			<p class="text-gray-600 mb-6">
				Đăng nhập để xem video từ những người bạn theo dõi
			</p>
			<Button variant="primary" onclick={() => {}}>
				{#snippet children()}
					Đăng nhập
				{/snippet}
			</Button>
		{/if}
	</div>
</div>
