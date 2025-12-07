<script lang="ts">
	import { ActionButton } from '$lib/components';
	import { IconHeart, IconComment, IconShare } from '$lib/components/icons';
	import { commentStore } from '$lib/stores';
	import { formatCount } from '$lib/utils';
	import { replaceState } from '$app/navigation';
	import type { Video } from '$lib/types';

	interface Props {
		video: Video;
		hasClickedLike: boolean;
		onLike: () => void;
		onShare: () => void;
	}

	let { video, hasClickedLike, onLike, onShare }: Props = $props();

	const showComments = $derived(commentStore.isOpen(video.id));
	const likesCount = $derived(formatCount(video.likes_count));
	const commentsCount = $derived(formatCount(video.comments_count));
	const sharesCount = $derived(formatCount(video.shares_count));

	const handleToggleComments = () => {
		const username = video?.user?.nickname;
		if (showComments) {
			commentStore.close();
		} else {
			commentStore.setActiveVideoId(video.id);
		}
		replaceState(showComments ? '/' : `/@${username}/video/${video.id}`, {});
	};
</script>

<div id="post-likes-{video.id}">
	<ActionButton
		count={likesCount}
		onclick={onLike}
		disabled={hasClickedLike}
		isActive={hasClickedLike}
		isLoading={hasClickedLike}
	>
		<IconHeart class="w-6 h-6 {hasClickedLike ? 'text-red-500' : 'text-gray-700'}" />
	</ActionButton>

	<ActionButton count={commentsCount} onclick={handleToggleComments}>
		<IconComment class="w-6 h-6 text-gray-700" />
	</ActionButton>

	<ActionButton count={sharesCount} onclick={onShare}>
		<IconShare class="w-6 h-6 text-gray-700" />
	</ActionButton>
</div>
