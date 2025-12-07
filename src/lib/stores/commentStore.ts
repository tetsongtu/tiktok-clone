import { writable } from 'svelte/store';

interface CommentStore {
    activeVideoId: number | null;
}

function createCommentStore() {
    const { subscribe, set, update } = writable<CommentStore>({
        activeVideoId: null,
    });

    return {
        subscribe,
        setActiveVideoId: (id: number | null) =>
            update((store) => ({ ...store, activeVideoId: id })),
    };
}

export const commentStore = createCommentStore();
