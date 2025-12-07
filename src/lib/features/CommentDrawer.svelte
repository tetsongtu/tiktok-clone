<script lang="ts">
	import { IconClose, IconHeart, IconShare, IconSmiley, IconSpinner } from '$lib/components/icons';
	import { UserAvatar } from '$lib/components';
	import { commentStore, userStore } from '$lib/stores';
	import { formatCount, formatRelativeTime } from '$lib/utils';
	import { goto, replaceState } from '$app/navigation';
	import type { Video, Comment } from '$lib/types';

	interface Props {
		post: Video | null;
		isOpen: boolean;
	}

	let { post, isOpen }: Props = $props();
	let commentText = $state('');
	let isSubmitting = $state(false);
	let isLiked = $state(false);
	let inputRef = $state<HTMLInputElement>();

	// Mock comments - in real app, fetch from API
	const comments: Comment[] = [
		{ id: 1, user: 'user1', text: 'Great video!', likes: 10, createdAt: new Date(Date.now() - 3600000) },
		{ id: 2, user: 'user2', text: 'Amazing content 🔥', likes: 5, createdAt: new Date(Date.now() - 7200000) },
	];

	const formattedLikes = $derived(formatCount(post?.likes_count || 0));
	const formattedComments = $derived(formatCount(post?.comments_count || 0));
	const isLoggedIn = $derived(userStore.isLoggedIn());
	const canSubmit = $derived(commentText.trim().length > 0 && !isSubmitting);

	function handleClose() {
		commentStore.close();
		replaceState('/', {});
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			handleClose();
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!canSubmit) return;

		isSubmitting = true;
		try {
			// TODO: Submit comment to API
			await new Promise((resolve) => setTimeout(resolve, 500));
			commentText = '';
		} finally {
			isSubmitting = false;
		}
	}

	function handleLikeVideo() {
		if (!isLoggedIn) return;
		isLiked = !isLiked;
		// TODO: Call API to like/unlike video
	}

	async function handleShare() {
		if (!post) return;

		const shareData = {
			title: `Video by @${post.user?.nickname}`,
			text: post.description,
			url: window.location.href,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
			} else {
				await navigator.clipboard.writeText(shareData.url);
				// TODO: Show toast notification
			}
		} catch {
			// User cancelled or error
		}
	}

	function focusInput() {
		inputRef?.focus();
	}
</script>

{#if post}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		class="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300"
		style="transform: translateX({isOpen ? '0' : '100%'})"
		role="dialog"
		aria-modal="true"
		aria-label="Comments"
		onkeydown={handleKeyDown}
	>
		<!-- Header -->
		<header class="p-4 border-b flex justify-between items-center">
			<h2 class="text-lg font-semibold">{formattedComments} bình luận</h2>
			<button
				aria-label="Close comments"
				onclick={handleClose}
				class="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
			>
				<IconClose class="w-6 h-6" />
			</button>
		</header>

		<!-- Post Info -->
		<div class="p-4 border-b flex items-start gap-4">
			<UserAvatar user={post.user} size={10} />
			<div class="flex-1 min-w-0">
				<button
					type="button"
					onclick={() => post.user && goto(`/@${post.user.nickname}`)}
					class="font-semibold hover:underline text-left truncate block focus:outline-none focus-visible:underline"
				>
					@{post.user?.nickname}
				</button>
				<p class="text-gray-600 text-sm mt-1 line-clamp-2">{post.description}</p>
			</div>
		</div>

		<!-- Comments List -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4" role="list" aria-label="Comments list">
			{#each comments as comment (comment.id)}
				<article class="flex items-start gap-3" role="listitem">
					<div class="w-8 h-8 bg-gray-200 rounded-full shrink-0" aria-hidden="true"></div>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-2">
							<p class="font-semibold text-sm">{comment.user}</p>
							{#if comment.createdAt}
								<time class="text-xs text-gray-400" datetime={new Date(comment.createdAt).toISOString()}>
									{formatRelativeTime(comment.createdAt)}
								</time>
							{/if}
						</div>
						<p class="text-gray-700 text-sm mt-1">{comment.text}</p>
						<div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
							<button
								class="hover:text-gray-700 transition-colors focus:outline-none focus-visible:underline"
								onclick={focusInput}
							>
								Trả lời
							</button>
							<span>{formatCount(comment.likes)} lượt thích</span>
						</div>
					</div>
					<button
						aria-label="Like comment"
						class="text-gray-400 hover:text-red-500 transition-colors p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
					>
						<IconHeart class="w-4 h-4" />
					</button>
				</article>
			{/each}

			{#if comments.length === 0}
				<div class="text-center py-8 text-gray-500">
					<p class="font-medium">Chưa có bình luận nào</p>
					<p class="text-sm mt-1">Hãy là người đầu tiên bình luận!</p>
				</div>
			{/if}
		</div>

		<!-- Actions & Input -->
		<footer class="border-t p-4">
			<div class="flex items-center gap-4 mb-4">
				<button
					aria-label={isLiked ? 'Unlike video' : 'Like video'}
					aria-pressed={isLiked}
					onclick={handleLikeVideo}
					disabled={!isLoggedIn}
					class="hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
				>
					<IconHeart class="w-7 h-7 {isLiked ? 'text-red-500 fill-red-500' : 'text-gray-700'}" />
				</button>
				<button
					aria-label="Share video"
					onclick={handleShare}
					class="hover:scale-110 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
				>
					<IconShare class="w-7 h-7 text-gray-700" />
				</button>
			</div>
			<p class="font-semibold text-sm mb-4">{formattedLikes} lượt thích</p>

			{#if isLoggedIn}
				<form onsubmit={handleSubmit} class="flex gap-2 items-center">
					<button
						type="button"
						aria-label="Add emoji"
						class="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
					>
						<IconSmiley class="w-6 h-6" />
					</button>
					<input
						bind:this={inputRef}
						type="text"
						bind:value={commentText}
						placeholder="Thêm bình luận..."
						disabled={isSubmitting}
						class="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-primary transition-colors disabled:bg-gray-100"
					/>
					<button
						type="submit"
						disabled={!canSubmit}
						class="text-primary font-semibold text-sm px-4 hover:text-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:underline"
					>
						{#if isSubmitting}
							<IconSpinner class="w-5 h-5 animate-spin" />
						{:else}
							Đăng
						{/if}
					</button>
				</form>
			{:else}
				<p class="text-center text-gray-500 text-sm py-2">
					Đăng nhập để bình luận
				</p>
			{/if}
		</footer>
	</div>
{/if}
