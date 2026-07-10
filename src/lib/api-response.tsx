import { NextResponse } from 'next/server';
import type {
  ApiSuccess,
  ApiError,
  ClientApiResponse,
} from './api-response-types';

export type {
  ApiSuccess,
  ApiError,
  ApiResponse,
  ClientApiResponse,
} from './api-response-types';

export function apiSuccess<T>(
  data: T,
  status = 200,
  headers?: Record<string, string>
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json({ success: true, data }, { status, headers });
}

export function apiError(
  error: string,
  status = 500,
  details?: unknown
): NextResponse<ApiError> {
  const body: ApiError = { success: false, error };
  if (details !== undefined) body.details = details;
  return NextResponse.json(body, { status });
}

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ClientApiResponse<T>> {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json.error || 'An unexpected error occurred',
        details: json.details,
      };
    }

    if (json.success !== undefined) {
      return json;
    }

    return { success: true, data: json as T };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Network error. Please check your connection.',
    };
  }
}
