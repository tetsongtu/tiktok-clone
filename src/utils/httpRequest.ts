import axios, { type AxiosRequestConfig } from 'axios';

console.log('🌐 API Base URL:', import.meta.env.VITE_API_URL);

const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const get = async (path: string, options: AxiosRequestConfig = {}) => {
    console.log(`🌐 GET Request: ${import.meta.env.VITE_API_URL}${path}`, options);
    try {
        const response = await httpRequest.get(path, options);
        console.log(`✅ GET Response for ${path}:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`❌ GET Error for ${path}:`, error);
        throw error;
    }
};

export default httpRequest;
