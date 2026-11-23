"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication when the app loads
  const refreshUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  // Login
  const login = async (credentials) => {
    const response = await loginUser(credentials);
    setUser(response.user);
    return response;
  };

  // Registration
  const register = async (userData) => {
    const response = await registerUser(userData);

    // If registration also logs the user in:
    if (response.user) {
      setUser(response.user);
    }

    return response;
  };

  // Logout
  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};