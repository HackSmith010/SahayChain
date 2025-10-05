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
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    const checkUserSession = async () => {
      if (token) {
        try {
          const profile = await getUserProfileApi(token);
          setUser(profile);
          setIsAuthenticated(true);
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false);
    };
    checkUserSession();
  }, [token]);

  const login = async (email, password) => {
    const data = await loginUserApi(email, password);
    const sessionToken = data.session.access_token;
    localStorage.setItem("accessToken", sessionToken);
    const profile = await getUserProfileApi(sessionToken);
    setUser(profile);
    setToken(sessionToken);
    setIsAuthenticated(true);
    return profile;
  };

  const register = async (userData) => {
    try {
      return await registerUserApi(userData);
    } catch (error) {
      throw error;
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
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
