<script lang="ts">
	import NotificationBanner from './NotificationBanner.svelte';
	import { IconSpinner } from '~/lib/components/icons';
</script>

<NotificationBanner type="info">
	<IconSpinner class="w-5 h-5 animate-spin" />
	<span>Đang tải video mới...</span>
</NotificationBanner>
