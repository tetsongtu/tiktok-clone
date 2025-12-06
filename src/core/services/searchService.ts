import * as httpRequest from '~/utils/httpRequest';

export const search = async (q: string, type = 'less') => {
    try {
        const data = await httpRequest.get(`users/search`, {
            params: {
                q,
                type,
            },
        });
        // httpRequest.get already returns response.data
        // API returns { data: [...users] }
        return data?.data || data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
