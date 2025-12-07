import axios, { type AxiosRequestConfig, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

// ============================================
// Config
// ============================================

const HTTP_CONFIG = {
	timeout: 10000,
	retryAttempts: 3,
	retryDelay: 1000,
	retryStatusCodes: [408, 429, 500, 502, 503, 504] as number[],
} as const;

// ============================================
// HTTP Client
// ============================================

const httpClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: HTTP_CONFIG.timeout,
	headers: {
		'Content-Type': 'application/json',
	},
});

// ============================================
// Request Interceptor
// ============================================

httpClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// Add auth token if available
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('auth_token');
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// ============================================
// Response Interceptor
// ============================================

httpClient.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

		// Check if we should retry
		const shouldRetry =
			config &&
			HTTP_CONFIG.retryStatusCodes.includes(error.response?.status || 0) &&
			(config._retryCount || 0) < HTTP_CONFIG.retryAttempts;

		if (shouldRetry) {
			config._retryCount = (config._retryCount || 0) + 1;
			await sleep(HTTP_CONFIG.retryDelay * config._retryCount);
			return httpClient(config);
		}

		return Promise.reject(error);
	}
);

// ============================================
// Error Class
// ============================================

export class ApiError extends Error {
	constructor(
		message: string,
		public statusCode?: number,
		public originalError?: unknown
	) {
		super(message);
		this.name = 'ApiError';
	}

	static fromAxiosError(error: AxiosError, fallbackMessage: string): ApiError {
		const message = (error.response?.data as { message?: string })?.message
			|| error.message
			|| fallbackMessage;
		return new ApiError(message, error.response?.status, error);
	}

	get isNetworkError(): boolean {
		return !this.statusCode;
	}

	get isServerError(): boolean {
		return !!this.statusCode && this.statusCode >= 500;
	}

	get isClientError(): boolean {
		return !!this.statusCode && this.statusCode >= 400 && this.statusCode < 500;
	}

	get isUnauthorized(): boolean {
		return this.statusCode === 401;
	}

	get isNotFound(): boolean {
		return this.statusCode === 404;
	}
}

// ============================================
// Helper Functions
// ============================================

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================
// HTTP Methods
// ============================================

export async function get<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		const response = await httpClient.get<T>(path, options);
		return response.data;
	} catch (error) {
		throw ApiError.fromAxiosError(error as AxiosError, `GET request failed: ${path}`);
	}
}

export async function post<T>(path: string, data?: unknown, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		const response = await httpClient.post<T>(path, data, options);
		return response.data;
	} catch (error) {
		throw ApiError.fromAxiosError(error as AxiosError, `POST request failed: ${path}`);
	}
}

export async function put<T>(path: string, data?: unknown, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		const response = await httpClient.put<T>(path, data, options);
		return response.data;
	} catch (error) {
		throw ApiError.fromAxiosError(error as AxiosError, `PUT request failed: ${path}`);
	}
}

export async function del<T>(path: string, options: AxiosRequestConfig = {}): Promise<T> {
	try {
		const response = await httpClient.delete<T>(path, options);
		return response.data;
	} catch (error) {
		throw ApiError.fromAxiosError(error as AxiosError, `DELETE request failed: ${path}`);
	}
}

export default httpClient;
