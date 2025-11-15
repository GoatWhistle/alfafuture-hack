import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Заглушки для методов авторизации
  const login = async (credentials) => {
    setIsLoading(true);
    try {
      console.log('Login attempt:', credentials);
      // const response = await fetch('/api/auth/login', {...})
      setTimeout(() => {
        setUser({ email: credentials.email, name: 'User' });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      console.log('Signup attempt:', userData);
      setTimeout(() => {
        setUser({ email: userData.email, name: userData.name });
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};