import React, { createContext, useState, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const userData = await authService.login(credentials);
      setUser(userData);

      return userData;
    } catch (error) {
      const message = error.response?.data?.detail || 'Ошибка входа';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      const newUser = await authService.register(userData);
      setUser(newUser);

      return newUser;
    } catch (error) {
      const message = error.response?.data?.detail || 'Ошибка регистрации';
      setError(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Просто очищаем состояние
    setUser(null);
    setError(null);
    localStorage.removeItem('token');

    // Перенаправляем на страницу логина
    window.location.href = '/login';
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};