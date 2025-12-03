// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUserApi,
  registerUserApi,
  getUserProfileApi,
} from "../api/auth.api.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("accessToken")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Checking your session...");

  // Check existing token on mount (session restore)
  useEffect(() => {
    const checkUserSession = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getUserProfileApi(token);
        setUser(profile);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Session validation failed:", error);
        logout(); // Clears token and user
      } finally {
        setIsLoading(false);
        setLoadingMessage("Loading...");
      }
    };

    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Login: email + password
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setLoadingMessage("Signing you in securely...");

      const data = await loginUserApi(email, password);
      // Expecting: { token: "...", user: { ... } }
      const sessionToken = data.token;

      localStorage.setItem("accessToken", sessionToken);
      setToken(sessionToken);
      setUser(data.user);
      setIsAuthenticated(true);

      return data.user;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoadingMessage("Loading...");
    }
  };

  // Register: donor / institution / supplier / admin
  const register = async (userData) => {
    try {
      setIsLoading(true);
      setLoadingMessage("Creating your SahayChain account...");

      const response = await registerUserApi(userData);
      // You can choose to auto-login after registration later if desired
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
      setLoadingMessage("Loading...");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    loadingMessage,
    login,
    register,
    logout,
    setUser, // optional: can be handy for profile updates
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
