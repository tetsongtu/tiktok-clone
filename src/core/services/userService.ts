import * as httpRequest from '~/utils/httpRequest';

interface GetSuggestedParams {
    page: number;
    perPage: number;
}

export async function getSuggested({
    page,
    perPage,
}: GetSuggestedParams): Promise<any[]> {
    try {
        const data = await httpRequest.get(`users/suggested`, {
            params: {
                page,
                per_page: perPage,
            },
        });
        // httpRequest.get already returns response.data
        // API returns { data: [...users] }
        return data?.data || data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
