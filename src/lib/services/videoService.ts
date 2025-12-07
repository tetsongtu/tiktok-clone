import * as httpRequest from '~/lib/utils/httpRequest';
import type { Video } from '~/lib/types/user';

export async function getVideo(id: number): Promise<{ data: Video } | null> {
    try {
        const res = await httpRequest.get(`videos/${id}`);
        return res; // httpRequest.get already returns response.data
    } catch (error) {
        // Handle error silently
        return null;
    }
}
