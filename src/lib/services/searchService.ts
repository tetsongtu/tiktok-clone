import * as httpRequest from '~/lib/utils/httpRequest';
import type { User } from '~/lib/types/user';

export const search = async (q: string, type = 'less'): Promise<User[]> => {
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
