import type { Video } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			video?: {
				file_url: string;
				id: number;
			};
		}
		// interface Platform {}
	}

	// Global window extensions for debugging
	interface Window {
		refreshVideoFeed?: () => void;
		closeCommentDrawer?: () => void;
	}
}

export {};
