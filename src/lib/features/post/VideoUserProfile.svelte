<script lang="ts">
	import UserAvatar from '~/lib/components/UserAvatar.svelte';
	import { IconPlus } from '~/lib/components/icons';
	import type { User } from '~/lib/types/user';

	interface Props {
		user?: User;
		onUserClick: () => void;
		onFollowClick: (e: MouseEvent) => void;
	}

	let { user, onUserClick, onFollowClick }: Props = $props();
</script>

<div class="flex justify-center mb-4 group relative">
	<button type="button" onclick={onUserClick} class="flex justify-center">
		<UserAvatar {user} size={18} />
	</button>
	<button
		aria-label="Follow"
		onclick={onFollowClick}
		class="text-white flex justify-center items-center absolute size-8 rounded-full top-14 bg-[var(--primary)]"
	>
		<IconPlus class="w-3 h-3" />
	</button>
</div>
