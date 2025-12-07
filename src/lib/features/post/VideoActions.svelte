<script lang="ts">
	import ActionButton from '~/lib/components/ActionButton.svelte';
	import { IconHeart, IconComment, IconShare } from '~/lib/components/icons';

	interface Props {
		videoId: number;
		likesCount: number;
		commentsCount: number;
		sharesCount: number;
		hasClickedLike: boolean;
		onLike: () => void;
		onComment: () => void;
		onShare: () => void;
	}

	let { videoId, likesCount, commentsCount, sharesCount, hasClickedLike, onLike, onComment, onShare }: Props = $props();
</script>

<div id="post-likes-{videoId}">
	<ActionButton
		count={likesCount}
		onclick={onLike}
		disabled={hasClickedLike}
		isActive={hasClickedLike}
		isLoading={hasClickedLike}
	>
		<IconHeart class="w-6 h-6 {hasClickedLike ? 'text-[#ff2626]' : 'text-gray-700'}" />
	</ActionButton>

	<ActionButton count={commentsCount} onclick={onComment}>
		<IconComment class="w-6 h-6 text-gray-700" />
	</ActionButton>

	<ActionButton count={sharesCount} onclick={onShare}>
		<IconShare class="w-6 h-6 text-gray-700" />
	</ActionButton>
</div>
