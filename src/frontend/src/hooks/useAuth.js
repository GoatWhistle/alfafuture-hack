import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Проверяем сохраненные данные при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      // TODO: Заменить на реальный вызов API
      console.log("Login attempt:", credentials);

      // Имитация API запроса
      const userData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: 1,
            name: "User",
            email: credentials.email,
          });
        }, 1000);
      });

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    try {
      // TODO: Заменить на реальный вызов API
      console.log("Signup attempt:", userData);

      const newUser = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            name: userData.name,
            email: userData.email,
          });
        }, 1000);
      });

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return {
    user,
    login,
    signup,
    logout,
    isLoading,
  };
};
