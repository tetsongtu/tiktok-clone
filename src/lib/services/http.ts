import axios, { type AxiosRequestConfig, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const RETRY_STATUS = [408, 429, 500, 502, 503, 504];

const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
});

// Auto-retry on server errors
httpClient.interceptors.response.use(
	(res) => res,
	async (error: AxiosError) => {
		const config = error.config as InternalAxiosRequestConfig & { _retry?: number };
		if (config && RETRY_STATUS.includes(error.response?.status || 0) && (config._retry || 0) < 3) {
			config._retry = (config._retry || 0) + 1;
			await new Promise((r) => setTimeout(r, 1000 * config._retry!));
			return httpClient(config);
		}
		return Promise.reject(error);
	}
);

export class ApiError extends Error {
	constructor(message: string, public statusCode?: number) {
		super(message);
		this.name = 'ApiError';
	}
}

function handleError(error: unknown, path: string): never {
	const e = error as AxiosError;
	throw new ApiError(e.message || `Request failed: ${path}`, e.response?.status);
}

export async function get<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		return (await httpClient.get<T>(path, options)).data;
	} catch (error) {
		handleError(error, path);
	}
}
