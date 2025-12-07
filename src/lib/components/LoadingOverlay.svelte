<script lang="ts">
	import { IconSpinner } from '$lib/components/icons';
	import NotificationBanner from './NotificationBanner.svelte';
</script>

<NotificationBanner type="info">
	<IconSpinner class="w-5 h-5 animate-spin" />
	<span>Đang tải video mới...</span>
</NotificationBanner>
