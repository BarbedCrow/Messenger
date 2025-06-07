import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://localhost:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth tokens (if needed later)
api.interceptors.request.use(
  (config) => {
    // Add auth token to requests if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Types
export interface UserRegistration {
  login: string;
  password: string;
}

export interface UserLogin {
  login: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  id: number;
  login: string;
}

// API Methods
export const apiService = {
  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await api.get('/health');
    return response.data;
  },

  // User registration
  async register(userData: UserRegistration): Promise<ApiResponse<User>> {
    const response = await api.post('/register', userData);
    return response.data;
  },

  // User login
  async login(userData: UserLogin): Promise<ApiResponse<User & { token: string }>> {
    const response = await api.post('/login', userData);
    return response.data;
  },

  // Get current user (placeholder for future implementation)
  async getCurrentUser(): Promise<ApiResponse<User>> {
    const response = await api.get('/user/me');
    return response.data;
  },
};

export default api;