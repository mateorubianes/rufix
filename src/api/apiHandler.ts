import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Tipos de respuesta de la API
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Configuración de las llamadas HTTP
 */
export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  requiresAuth?: boolean;
}

/**
 * Clase de error personalizada para las APIs
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Constantes de storage
 */
const TOKEN_KEY = '@rufix_auth_token';

/**
 * Obtiene el token de autenticación del storage
 */
const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return null;
  }
};

/**
 * Guarda el token de autenticación en el storage
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error al guardar el token:', error);
    throw new ApiError('Error al guardar el token de autenticación');
  }
};

/**
 * Elimina el token de autenticación del storage
 */
export const removeAuthToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};

/**
 * Middleware para agregar headers de autenticación
 */
const addAuthHeader = async (headers: HeadersInit): Promise<HeadersInit> => {
  const token = await getAuthToken();

  if (token) {
    return {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return headers;
};

/**
 * Middleware para agregar headers por defecto
 */
const addDefaultHeaders = (headers: HeadersInit = {}): HeadersInit => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...headers,
  };
};

/**
 * Maneja los errores de las respuestas HTTP
 */
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  let data: any;
  const contentType = response.headers.get('content-type');

  try {
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const errorMessage =
      data?.message || data?.error || `Error ${response.status}: ${response.statusText}`;
    throw new ApiError(errorMessage, response.status, data);
  }

  if (data && typeof data === 'object' && 'success' in data) {
    return data;
  }

  return {
    success: true,
    data,
  };
};

/**
 * Handler centralizado para todas las llamadas a la API
 *
 * @param url - URL del endpoint
 * @param config - Configuración de la petición
 * @returns Respuesta de la API
 *
 * @example
 * const response = await apiHandler('/auth/login', {
 *   method: 'POST',
 *   body: JSON.stringify({ email, password })
 * });
 */
export const apiHandler = async <T = any>(
  url: string,
  config: RequestConfig = {},
): Promise<ApiResponse<T>> => {
  try {
    const { params, requiresAuth = true, headers = {}, body, ...restConfig } = config;

    let finalUrl = url;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      finalUrl = `${url}?${queryString}`;
    }

    let finalHeaders = addDefaultHeaders(headers);
    finalHeaders = {
      ...finalHeaders,
      'x-api-key': process.env.EXPO_PUBLIC_API_KEY || '',
    };

    if (requiresAuth) {
      finalHeaders = await addAuthHeader(finalHeaders);
    }

    const response = await fetch(finalUrl, {
      ...restConfig,
      headers: finalHeaders,
      body: body,
    });

    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error en apiHandler:', error);
    throw new ApiError(error instanceof Error ? error.message : 'Error desconocido en la petición');
  }
};

/**
 * Métodos helper para diferentes tipos de peticiones HTTP
 */
export const api = {
  get: <T = any>(url: string, config?: RequestConfig) =>
    apiHandler<T>(url, { ...config, method: 'GET' }),
  post: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    apiHandler<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  put: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    apiHandler<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
  patch: <T = any>(url: string, data?: any, config?: RequestConfig) =>
    apiHandler<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
  delete: <T = any>(url: string, config?: RequestConfig) =>
    apiHandler<T>(url, { ...config, method: 'DELETE' }),
};
