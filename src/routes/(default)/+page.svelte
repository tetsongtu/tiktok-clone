<script lang="ts">
	import { PostMain, CommentDrawer } from '$lib/features';
	import { useVideoFeed } from '$lib/hooks';
	import { commentStore } from '$lib/stores';

	interface Props {
		initialVideoId?: number;
	}

	let { initialVideoId }: Props = $props();

	const feed = useVideoFeed();
	let refreshKey = $state(0);

	// Load initial video
	$effect(() => {
		if (initialVideoId) {
			feed.loadInitialVideo(initialVideoId);
		}
	});

	// Refresh handler
	$effect(() => {
		if (refreshKey > 0) {
			feed.reset();
		}
	});

	// Scroll & window handlers
	$effect(() => {
		if (feed.videos.length === 0 && !feed.isFetching) feed.fetchVideos();

		const mainEl = document.getElementById('MainContent');
		const scrollEl = (mainEl?.querySelector('.overflow-y-auto') as HTMLElement) || mainEl;
		const cleanup = feed.setupScrollHandler(scrollEl);

		(window as any).refreshVideoFeed = () => {
			commentStore.close();
			refreshKey++;
		};
		(window as any).closeCommentDrawer = () => commentStore.close();

		return () => {
			cleanup?.();
			delete (window as any).refreshVideoFeed;
			delete (window as any).closeCommentDrawer;
		};
	});

	const activeVideoId = $derived(commentStore.activeVideoId);
	const activePost = $derived(feed.videos.find((v) => v.id === activeVideoId) || null);
	const isDrawerOpen = $derived(activeVideoId !== null && feed.videos.length > 0);
</script>

<div>
	{#each feed.videos as video, index (`${video.id}-${index}`)}
		<PostMain {video} />
	{/each}

	<CommentDrawer post={activePost} isOpen={isDrawerOpen} />
</div>
