<script lang="ts">
	import { onMount } from 'svelte';
	import UserAvatar from '~/lib/components/UserAvatar.svelte';

	interface Comment {
		id: number;
		user: {
			nickname: string;
			avatar?: string;
		};
		text: string;
		likes: number;
	}

	interface Props {
		post: any;
		isOpen: boolean;
		onClose: () => void;
	}

	let { post, isOpen, onClose }: Props = $props();

	let comments = $state<Comment[]>([]);
	let comment = $state('');
	let shouldRender = $state(false);

	onMount(() => {
		shouldRender = true;
	});

	$effect(() => {
		if (isOpen) {
			comments = [
				{
					id: 1,
					user: { nickname: 'user1', avatar: '' },
					text: 'Great video!',
					likes: 10
				},
				{
					id: 2,
					user: { nickname: 'user2', avatar: '' },
					text: 'Amazing content 🔥',
					likes: 5
				}
			];
		}
	});

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!comment.trim()) return;

		comments = [
			...comments,
			{
				id: Date.now(),
				user: { nickname: 'currentUser', avatar: '' },
				text: comment,
				likes: 0
			}
		];
		comment = '';
	}
</script>

{#if !post}
	<div class="fixed top-0 right-0 h-full w-[450px] z-50" style="transform: translateX(100%)" />
{:else}
	<div
		data-comment-drawer
		class="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col"
		style="transform: {isOpen && shouldRender ? 'translateX(0)' : 'translateX(100%)'}; transition: transform 0.3s ease-in-out;"
	>
		<!-- Header -->
		<div class="p-4 border-b">
			<h2 class="text-base font-normal">{post.comments_count || 0} bình luận</h2>
		</div>

		<!-- Post Info -->
		<div class="p-4 border-b flex items-center gap-4">
			<a href="/@{post.user?.nickname}" onclick={onClose}>
				<UserAvatar user={post.user} size={10} />
			</a>
			<div class="flex-1">
				<a href="/@{post.user?.nickname}" onclick={onClose} class="font-normal">
					{post.user?.nickname}
				</a>
				<p class="text-base text-gray-600 line-clamp-4">{post.description}</p>
			</div>
		</div>

		<!-- Comments List -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#if comments.length === 0}
				<div class="text-center py-8 text-gray-500">
					<p>Chưa có bình luận nào</p>
					<p class="text-base mt-4">Hãy là người đầu tiên bình luận!</p>
				</div>
			{:else}
				{#each comments as c (c.id)}
					<div class="flex gap-4">
						<UserAvatar user={c.user} size={8} />
						<div class="flex-1">
							<p class="font-normal text-base">{c.user.nickname}</p>
							<p class="text-base text-gray-700 mt-4">{c.text}</p>
							<div class="flex items-center gap-4 mt-4 text-base text-gray-500">
								<button>Trả lời</button>
								{#if c.likes > 0}
									<span>{c.likes} lượt thích</span>
								{/if}
							</div>
						</div>
						<button class="text-gray-400">
							<svg class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
								<path
									d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"
								/>
							</svg>
						</button>
					</div>
				{/each}
			{/if}
		</div>

		<!-- Actions & Input -->
		<div class="border-t p-4">
			<div class="flex items-center gap-4 mb-4">
				<button>
					<svg class="w-7 h-7" viewBox="0 0 256 256" fill="currentColor">
						<path
							d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"
						/>
					</svg>
				</button>
				<button>
					<svg class="w-7 h-7" viewBox="0 0 256 256" fill="currentColor">
						<path
							d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35Z"
						/>
					</svg>
				</button>
			</div>
			<p class="font-normal text-base mb-4">
				{post.likes_count?.toLocaleString() || 0} lượt thích
			</p>

			<form onsubmit={handleSubmit} class="flex gap-4 items-center">
				<input
					type="text"
					bind:value={comment}
					placeholder="Thêm bình luận..."
					class="flex-1 border rounded-full px-4 py-2 text-base outline-none"
				/>
				<button
					type="submit"
					disabled={!comment.trim()}
					class="text-blue-500 font-normal text-base px-4 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Đăng
				</button>
			</form>
		</div>
	</div>
{/if}
