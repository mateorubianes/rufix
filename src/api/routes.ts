const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const API_ROUTES = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    VERIFY: `${BASE_URL}/auth/verify`,
  },
  BUILDINGS: {
    GET_ALL: `${BASE_URL}/buildings`,
    GET_BY_ID: (id: string) => `${BASE_URL}/buildings/${id}`,
    CREATE: `${BASE_URL}/buildings`,
    UPDATE: (id: string) => `${BASE_URL}/buildings/${id}`,
    DELETE: (id: string) => `${BASE_URL}/buildings/${id}`,
  },
  PROVIDERS: {
    GET_ALL: `${BASE_URL}/providers`,
    GET_BY_ID: (id: string) => `${BASE_URL}/providers/${id}`,
    CREATE: `${BASE_URL}/providers`,
    UPDATE: (id: string) => `${BASE_URL}/providers/${id}`,
    DELETE: (id: string) => `${BASE_URL}/providers/${id}`,
  },
  SERVICES: {
    GET_ALL: `${BASE_URL}/services`,
    GET_BY_ID: (id: string) => `${BASE_URL}/services/${id}`,
    CREATE: `${BASE_URL}/services`,
    UPDATE: (id: string) => `${BASE_URL}/services/${id}`,
    DELETE: (id: string) => `${BASE_URL}/services/${id}`,
  },
} as const;

export { BASE_URL };
