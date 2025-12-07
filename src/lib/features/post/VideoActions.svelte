<script lang="ts">
	import ActionButton from '~/lib/components/ActionButton.svelte';
	import { IconHeart, IconComment, IconShare } from '~/lib/components/icons';
	import { commentStore } from '~/lib/stores/commentStore';
	import { replaceState } from '$app/navigation';
	import type { Video } from '~/lib/types/user';

	interface Props {
		video: Video;
		hasClickedLike: boolean;
		onLike: () => void;
		onShare: () => void;
	}

	let { video, hasClickedLike, onLike, onShare }: Props = $props();

	let showComments = $state(false);

	$effect(() => {
		showComments = $commentStore.activeVideoId === video.id;
	});

	const handleToggleComments = () => {
		const username = video?.user?.nickname;
		if (showComments) {
			commentStore.setActiveVideoId(null);
		} else {
			commentStore.setActiveVideoId(video.id);
		}
		replaceState(showComments ? '/' : `/@${username}/video/${video.id}`, {});
	};
</script>

<div id="post-likes-{video.id}">
	<ActionButton
		count={video.likes_count}
		onclick={onLike}
		disabled={hasClickedLike}
		isActive={hasClickedLike}
		isLoading={hasClickedLike}
	>
		<IconHeart class="w-6 h-6 {hasClickedLike ? 'text-[#ff2626]' : 'text-gray-700'}" />
	</ActionButton>

	<ActionButton count={video.comments_count} onclick={handleToggleComments}>
		<IconComment class="w-6 h-6 text-gray-700" />
	</ActionButton>

	<ActionButton count={video.shares_count} onclick={onShare}>
		<IconShare class="w-6 h-6 text-gray-700" />
	</ActionButton>
</div>
