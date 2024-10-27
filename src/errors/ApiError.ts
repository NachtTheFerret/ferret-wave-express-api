export const API_ERROR_MESSAGES = {
  NOT_FOUND: { status: 404, message: 'Not found' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  FORBIDDEN: { status: 403, message: 'Forbidden' },
  BAD_REQUEST: { status: 400, message: 'Bad request' },
  INTERNAL_SERVER_ERROR: { status: 500, message: 'Internal server error' },
  SERVICE_UNAVAILABLE: { status: 503, message: 'Service unavailable' },
  TOO_MANY_REQUESTS: { status: 429, message: 'Too many requests' },
  CONFLICT: { status: 409, message: 'Conflict' },
};

export const API_ERROR_CODES = Object.keys(API_ERROR_MESSAGES) as ApiErrorCode[];
export const API_ERROR_CODE_PREFIX = 'APPLICATION_GIT';

export type ApiErrorCode = keyof typeof API_ERROR_MESSAGES;
export type ApiErrorCallback = (message?: string) => ApiError;

export interface ApiErrorOptions {
  message?: string | null;
}

export class ApiError extends Error {
  public code: ApiErrorCode;
  public status: number;

  constructor(code: ApiErrorCode, options: ApiErrorOptions) {
    super(options.message || API_ERROR_MESSAGES[code].message);
    this.code = code;
    this.status = API_ERROR_MESSAGES[code].status;
  }
}

export const ApiErrors = API_ERROR_CODES.reduce((errors, code) => {
  const callback: ApiErrorCallback = (message) => {
    return new ApiError(code, { message });
  };

  errors[code] = callback;

  return errors;
}, {} as Record<ApiErrorCode, ApiErrorCallback>);
