import axios from 'axios'; //"axios" libería para hacer peticiones HTTP 

const API_URL = 'http://44.213.57.93:8082/api/v1/auth';  

// Función para decodificar JWT sin verificar la firma (solo para extraer datos)
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
};

// Configurar interceptor para agregar token a todas las peticiones
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Registro de usuario
  register: async (userData) => {

    console.log('userData', userData)
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
      
      // Guardar token y datos del usuario con rol
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userInfo = {
          email: response.data.email || userData.email,
          firstName: response.data.firstName || userData.firstName,
          lastName: response.data.lastName || userData.lastName,
          role: response.data.role || 'CLIENTE'
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // También guardar datos del token decodificado
        const decodedToken = decodeJWT(response.data.token);
        if (decodedToken) {
          localStorage.setItem('tokenData', JSON.stringify(decodedToken));
        }

        // Disparar evento personalizado para notificar registro exitoso
        window.dispatchEvent(new CustomEvent('authStateChanged', { 
          detail: { type: 'register', user: userInfo } 
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error.response?.data || error.message);
      throw error;
    }
  },

  // Login de usuario
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      
      // Guardar token y datos del usuario con rol
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const userInfo = {
          email: response.data.email || email,
          firstName: response.data.firstName || '',
          lastName: response.data.lastName || '',
          role: response.data.role || 'CLIENTE'
        };
        localStorage.setItem('user', JSON.stringify(userInfo));
        
        // También guardar datos del token decodificado
        const decodedToken = decodeJWT(response.data.token);
        if (decodedToken) {
          localStorage.setItem('tokenData', JSON.stringify(decodedToken));
        }

        // Disparar evento personalizado para notificar cambio de estado de autenticación
        window.dispatchEvent(new CustomEvent('authStateChanged', { 
          detail: { type: 'login', user: userInfo } 
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error en login:', error.response?.data || error.message);
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenData');
    localStorage.removeItem('isAdmin'); // Limpiar también esto
    
    // Disparar evento personalizado para notificar logout
    window.dispatchEvent(new CustomEvent('authStateChanged', { 
      detail: { type: 'logout' } 
    }));
  },

  // Verificar si hay sesión activa y el token es válido
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Verificar si el token ha expirado
    const tokenData = localStorage.getItem('tokenData');
    if (tokenData) {
      const decoded = JSON.parse(tokenData);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        // Token expirado, limpiar datos
        authAPI.logout();
        return false;
      }
    }
    
    return true;
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      // Si no tiene rol en el objeto user, intentar obtenerlo del token
      if (!user.role) {
        const tokenData = localStorage.getItem('tokenData');
        if (tokenData) {
          const decoded = JSON.parse(tokenData);
          user.role = decoded.role || 'CLIENTE';
        }
      }
      return user;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Verificar si es admin
  isAdmin: () => {
    const user = authAPI.getCurrentUser();
    return user?.role === 'ADMIN';
  },

  // Obtener datos del token decodificado
  getTokenData: () => {
    const tokenDataStr = localStorage.getItem('tokenData');
    return tokenDataStr ? JSON.parse(tokenDataStr) : null;
  },

  // Refrescar información del usuario desde el token
  refreshUserFromToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const decoded = decodeJWT(token);
    if (decoded) {
      const userInfo = {
        email: decoded.sub,
        firstName: decoded.firstName || '',
        lastName: decoded.lastName || '',
        role: decoded.role || 'CLIENTE'
      };
      localStorage.setItem('user', JSON.stringify(userInfo));
      localStorage.setItem('tokenData', JSON.stringify(decoded));
      return userInfo;
    }
    return null;
  }
};

export default authAPI;