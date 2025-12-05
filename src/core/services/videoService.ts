import * as httpRequest from '~/utils/httpRequest';

export const getVideo = async (id: number) => {
    try {
        const res = await httpRequest.get(`videos/${id}`);
        return res.data;
    } catch (error) {
        // Handle error silently
    }
};
