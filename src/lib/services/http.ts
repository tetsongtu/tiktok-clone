import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
});

export class ApiError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public originalError?: unknown
	) {
		super(message);
		this.name = 'ApiError';
	}
}

export async function get<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		const response = await httpClient.get<T>(path, options);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		throw new ApiError(
			axiosError.message || `GET request failed: ${path}`,
			axiosError.response?.status,
			error
		);
	}
}

export async function post<T>(path: string, data?: unknown, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		const response = await httpClient.post<T>(path, data, options);
		return response.data;
	} catch (error) {
		const axiosError = error as AxiosError;
		throw new ApiError(
			axiosError.message || `POST request failed: ${path}`,
			axiosError.response?.status,
			error
		);
	}
}

export default httpClient;
