import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/authService";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Загружаем пользователя и токен из localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Сохраняем пользователя и токен в localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      // Подставляем токен для всех будущих запросов axios
      if (user.access_token) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${user.access_token}`;
      }
    } else {
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("[AuthProvider] Logging in with credentials:", credentials);

      const { user: loggedUser, access_token } =
        await authService.login(credentials);
      console.log("[AuthProvider] Login response:", loggedUser, access_token);

      setUser({ ...loggedUser, access_token });
      console.log("[AuthProvider] User state after login:", user);
      return loggedUser;
    } catch (err) {
      console.error(
        "[AuthProvider] Login error:",
        err.response?.data || err.message,
      );
      setError(err.response?.data?.detail || "Ошибка входа");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("[AuthProvider] Signing up with userData:", userData);

      const { user: newUser, access_token } =
        await authService.signup(userData);
      console.log("[AuthProvider] Signup response:", newUser, access_token);

      setUser({ ...newUser, access_token });
      console.log("[AuthProvider] User state after signup:", user);
      return newUser;
    } catch (err) {
      console.error(
        "[AuthProvider] Signup error:",
        err.response?.data || err.message,
      );
      setError(err.response?.data?.detail || "Ошибка регистрации");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem("user");
    localStorage.removeItem("chats");
    window.location.href = "/login";
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
