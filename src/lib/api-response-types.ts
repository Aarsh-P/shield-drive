export type ApiSuccess<T> = { success: true; data: T };
export type ApiError = { success: false; error: string; details?: unknown };
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export type ClientApiSuccess<T> = { success: true; data: T };
export type ClientApiError = { success: false; error: string; details?: unknown };
export type ClientApiResponse<T> = ClientApiSuccess<T> | ClientApiError;
