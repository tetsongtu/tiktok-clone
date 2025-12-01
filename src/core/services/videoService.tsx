import * as httpRequest from '~/utils/httpRequest';

export const getVideos = async (page: number, type = 'for-you') => {
    try {
        const res = await httpRequest.get(`videos`, {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
