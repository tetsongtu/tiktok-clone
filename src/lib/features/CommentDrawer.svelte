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

	const comments: Comment[] = [
		{ id: 1, user: 'user1', text: 'Great video!', likes: 10, createdAt: new Date(Date.now() - 3600000) },
		{ id: 2, user: 'user2', text: 'Amazing content 🔥', likes: 5, createdAt: new Date(Date.now() - 7200000) },
	];

	const isLoggedIn = $derived(userStore.isLoggedIn());
	const canSubmit = $derived(commentText.trim().length > 0 && !isSubmitting);

	function handleClose() {
		commentStore.close();
		replaceState('/', {});
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!canSubmit) return;
		isSubmitting = true;
		await new Promise((r) => setTimeout(r, 500));
		commentText = '';
		isSubmitting = false;
	}

	async function handleShare() {
		if (!post) return;
		try {
			if (navigator.share) await navigator.share({ title: post.description, url: location.href });
			else await navigator.clipboard.writeText(location.href);
		} catch {}
	}
</script>

{#if post}
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div
		class="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300"
		style="transform: translateX({isOpen ? '0' : '100%'})"
		role="dialog"
		onkeydown={(e) => e.key === 'Escape' && handleClose()}
	>
		<header class="p-4 border-b flex justify-between items-center">
			<h2 class="text-lg font-semibold">{formatCount(post.comments_count || 0)} bình luận</h2>
			<button onclick={handleClose} class="p-1 hover:bg-gray-100 rounded-full">
				<IconClose class="w-6 h-6" />
			</button>
		</header>

		<div class="p-4 border-b flex items-start gap-4">
			<UserAvatar user={post.user} size={10} />
			<div class="flex-1 min-w-0">
				<button onclick={() => post.user && goto(`/@${post.user.nickname}`)} class="font-semibold hover:underline">
					@{post.user?.nickname}
				</button>
				<p class="text-gray-600 text-sm mt-1 line-clamp-2">{post.description}</p>
			</div>
		</div>

		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#each comments as comment (comment.id)}
				<article class="flex items-start gap-3">
					<div class="w-8 h-8 bg-gray-200 rounded-full shrink-0"></div>
					<div class="flex-1 min-w-0">
						<div class="flex items-center gap-2">
							<p class="font-semibold text-sm">{comment.user}</p>
							{#if comment.createdAt}
								<time class="text-xs text-gray-400">{formatRelativeTime(comment.createdAt)}</time>
							{/if}
						</div>
						<p class="text-gray-700 text-sm mt-1">{comment.text}</p>
						<div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
							<button onclick={() => inputRef?.focus()} class="hover:text-gray-700">Trả lời</button>
							<span>{formatCount(comment.likes)} lượt thích</span>
						</div>
					</div>
					<button class="text-gray-400 hover:text-red-500 p-1">
						<IconHeart class="w-4 h-4" />
					</button>
				</article>
			{/each}
			{#if !comments.length}
				<div class="text-center py-8 text-gray-500">
					<p class="font-medium">Chưa có bình luận nào</p>
				</div>
			{/if}
		</div>

		<footer class="border-t p-4">
			<div class="flex items-center gap-4 mb-4">
				<button onclick={() => isLoggedIn && (isLiked = !isLiked)} disabled={!isLoggedIn} class="disabled:opacity-50">
					<IconHeart class="w-7 h-7 {isLiked ? 'text-red-500' : 'text-gray-700'}" />
				</button>
				<button onclick={handleShare}>
					<IconShare class="w-7 h-7 text-gray-700" />
				</button>
			</div>
			<p class="font-semibold text-sm mb-4">{formatCount(post.likes_count || 0)} lượt thích</p>

			{#if isLoggedIn}
				<form onsubmit={handleSubmit} class="flex gap-2 items-center">
					<button type="button" class="text-gray-500 hover:text-gray-700">
						<IconSmiley class="w-6 h-6" />
					</button>
					<input
						bind:this={inputRef}
						bind:value={commentText}
						placeholder="Thêm bình luận..."
						disabled={isSubmitting}
						class="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-primary disabled:bg-gray-100"
					/>
					<button type="submit" disabled={!canSubmit} class="text-primary font-semibold text-sm px-4 disabled:opacity-50">
						{#if isSubmitting}<IconSpinner class="w-5 h-5 animate-spin" />{:else}Đăng{/if}
					</button>
				</form>
			{:else}
				<p class="text-center text-gray-500 text-sm py-2">Đăng nhập để bình luận</p>
			{/if}
		</footer>
	</div>
{/if}
