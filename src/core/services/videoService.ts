import * as httpRequest from '~/utils/httpRequest';

export async function getVideo(id: number): Promise<any> {
    try {
        const res = await httpRequest.get(`videos/${id}`);
        return res; // httpRequest.get already returns response.data
    } catch (error) {
        // Handle error silently
        return null;
    }
}
