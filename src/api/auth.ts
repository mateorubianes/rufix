import { api, saveAuthToken, removeAuthToken, ApiError } from './apiHandler';
import { API_ROUTES } from './routes';

/**
 * Tipos para autenticación
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    lastName?: string;
  };
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

/**
 * Servicio de autenticación
 */
export const authService = {
  /**
   * Inicia sesión con email y password
   *
   * @param credentials - Email y password del usuario
   * @returns Token JWT y datos del usuario
   */
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<LoginResponse>(
        API_ROUTES.AUTH.LOGIN,
        credentials,
        { requiresAuth: false }, // El login no requiere token previo
      );

      if (response.success && response.data?.token) {
        await saveAuthToken(response.data.token);
      }

      return response;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  /**
   * Cierra la sesión del usuario
   * Elimina el token del storage local
   */
  logout: async () => {
    try {
      // TODO llamar al endpoint de logout
      // await api.post(API_ROUTES.AUTH.LOGOUT);

      await removeAuthToken();

      return {
        success: true,
        message: 'Sesión cerrada correctamente',
      };
    } catch (error) {
      console.error('Error en logout:', error);
      await removeAuthToken();
      throw error;
    }
  },

  /**
   * Verifica si el token actual es válido
   */
  verifyToken: async () => {
    try {
      const response = await api.get(API_ROUTES.AUTH.VERIFY);
      return response;
    } catch (error) {
      console.error('Error al verificar token:', error);
      throw error;
    }
  },

  /**
   * Refresca el token de autenticación
   */
  refreshToken: async () => {
    try {
      const response = await api.post<LoginResponse>(API_ROUTES.AUTH.REFRESH);

      if (response.success && response.data?.token) {
        await saveAuthToken(response.data.token);
      }

      return response;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      throw error;
    }
  },
};
