import type { CommentStoreState } from '$lib/types';

function createCommentStore() {
	let state = $state<CommentStoreState>({
		activeVideoId: null,
	});

	return {
		get activeVideoId() {
			return state.activeVideoId;
		},
		setActiveVideoId(id: number | null) {
			state.activeVideoId = id;
		},
		close() {
			state.activeVideoId = null;
		},
		isOpen(videoId: number) {
			return state.activeVideoId === videoId;
		},
	};
}

export const commentStore = createCommentStore();
