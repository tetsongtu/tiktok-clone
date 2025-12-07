<script lang="ts">
	import { IconClose, IconHeart, IconShare } from '~/lib/components/icons';
	import { commentStore } from '~/lib/stores/commentStore';
	import { goto, replaceState } from '$app/navigation';
	import type { Video } from '~/lib/types/user';

	interface Props {
		post: Video | null;
		isOpen: boolean;
	}

	let { post, isOpen }: Props = $props();

	const comments = [
		{ user: 'user1', text: 'Great video!', likes: 10 },
		{ user: 'user2', text: 'Amazing content 🔥', likes: 5 }
	];
</script>

{#if post}
	<div 
		class="fixed top-0 right-0 h-full w-[450px] bg-white shadow-2xl z-50 flex flex-col"
		style="transform: translateX({isOpen ? '0' : '100%'})"
	>
		<!-- Header -->
		<div class="p-4 border-b flex justify-between items-center">
			<h2 class="text-lg font-semibold">{post.comments_count || 0} bình luận</h2>
			<button 
				aria-label="Close comments"
				onclick={() => {
					commentStore.setActiveVideoId(null);
					replaceState('/', {});
				}} 
				class="text-gray-500 hover:text-gray-700"
			>
				<IconClose class="w-6 h-6" />
			</button>
		</div>

		<!-- Post Info -->
		<div class="p-4 border-b flex items-start gap-4">
			<img src={post.user?.avatar || '/default-avatar.png'} alt={post.user?.nickname} class="w-10 h-10 rounded-full" />
			<div class="flex-1">
				<button
					type="button"
					onclick={() => {
						if (post.user) {
							goto(`/@${post.user.nickname}`);
						}
					}}
					class="font-semibold hover:underline text-left"
				>
					{post.user?.nickname}
				</button>
				<p class="text-gray-600 text-sm mt-1">{post.description}</p>
			</div>
		</div>

		<!-- Comments List -->
		<div class="flex-1 overflow-y-auto p-4 space-y-4">
			{#each comments as comment}
				<div class="flex items-start gap-4">
					<img src="/default-avatar.png" alt={comment.user} class="w-8 h-8 rounded-full" />
					<div class="flex-1">
						<p class="font-semibold text-sm">{comment.user}</p>
						<p class="text-gray-700 text-sm mt-1">{comment.text}</p>
						<div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
							<button class="hover:text-gray-700">Trả lời</button>
							<span>{comment.likes} lượt thích</span>
						</div>
					</div>
					<button aria-label="Like comment" class="text-gray-400 hover:text-red-500">
						<IconHeart class="w-4 h-4" />
					</button>
				</div>
			{/each}
		</div>

		<!-- Actions & Input -->
		<div class="border-t p-4">
			<div class="flex items-center gap-4 mb-4">
				<button aria-label="Like video" class="hover:text-red-500">
					<IconHeart class="w-7 h-7" />
				</button>
				<button aria-label="Share video" class="hover:text-blue-500">
					<IconShare class="w-7 h-7" />
				</button>
			</div>
			<p class="font-semibold text-sm mb-4">
				{post.likes_count?.toLocaleString() || 0} lượt thích
			</p>

			<form class="flex gap-2 items-center">
				<input 
					type="text" 
					placeholder="Thêm bình luận..." 
					class="flex-1 border rounded-full px-4 py-2 text-sm outline-none focus:border-blue-500"
				/>
				<button 
					type="submit" 
					class="text-blue-500 font-semibold text-sm px-4 hover:text-blue-600"
				>
					Đăng
				</button>
			</form>
		</div>
	</div>
{/if}
