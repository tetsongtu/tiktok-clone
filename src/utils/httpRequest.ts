import axios, { type AxiosRequestConfig } from 'axios';

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get = async (path: string, options: AxiosRequestConfig = {}) => {
    try {
        const response = await httpRequest.get(path, options);
        return response.data;
    } catch (error) {
        console.error(`❌ GET Error for ${path}:`, error);
        throw error;
    }
};
