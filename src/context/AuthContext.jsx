import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { loginUser, registerUser } from "../services/authService";

const AUTH_STORAGE_KEY = "scrapedeck_auth";

const AuthContext = createContext(null);

function parseStoredAuth() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

export function AuthProvider({ children }) {
  const storedAuth = parseStoredAuth();
  const [token, setToken] = useState(storedAuth.token);
  const [user, setUser] = useState(storedAuth.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token, user }));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [token, user]);

  const login = async (payload) => {
    const response = await loginUser(payload);
    if (!response.token) {
      throw new Error("Login succeeded but no token was returned by the backend.");
    }
    setToken(response.token);
    setUser(response.user ?? null);
    return response;
  };

  const register = async (payload) => {
    const response = await registerUser(payload);
    if (!response.token) {
      throw new Error("Registration succeeded but no token was returned by the backend.");
    }
    setToken(response.token);
    setUser(response.user ?? null);
    return response;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    api.setAuthToken(token);
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    }),
    [loading, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
