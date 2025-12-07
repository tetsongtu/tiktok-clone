<script lang="ts">
	import { IconSpinner, IconUserCircle } from '$lib/components/icons';
	import type { ProfileStatus } from '$lib/types';

	interface Props {
		status: ProfileStatus;
		error?: string;
		nickname: string;
	}

	let { status, error = '', nickname }: Props = $props();
</script>

<div class="px-10 min-h-screen flex items-center justify-center">
	<div class="text-center">
		{#if status === 'loading'}
			<div class="flex flex-col items-center gap-4">
				<IconSpinner class="w-12 h-12 text-primary animate-spin" />
				<p class="text-gray-600 text-base">Đang tải hồ sơ...</p>
			</div>
		{:else}
			<div class="flex flex-col items-center gap-4">
				<IconUserCircle class="w-16 h-16 text-gray-400" />
				<p class="text-red-500 text-base font-normal">{error}</p>
				<p class="text-gray-500">Không tìm thấy người dùng @{nickname}</p>
			</div>
		{/if}
	</div>
</div>
