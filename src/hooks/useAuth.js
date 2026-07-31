import { useCallback, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  demoLoginUser,
} from "../services/authApi";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/storage";

function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getFromLocalStorage("token"));
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState(null);

  const login = useCallback(async (credentials) => {
    setLoading(true);

    try {
      const response = await loginUser(credentials);
      setError(null);
      const { token, user } = response;

      saveToLocalStorage("token", token);

      setToken(token);
      setUser(user);

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);

    try {
      const response = await registerUser(userData);
      setError(null);
      const { token, user } = response;

      saveToLocalStorage("token", token);

      setToken(token);
      setUser(user);

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const demoLogin = useCallback(async () => {
    setLoading(true);

    try {
      const response = await demoLoginUser();
      setError(null);
      const { token, user } = response;

      saveToLocalStorage("token", token);

      setToken(token);
      setUser(user);

      return response;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCurrentUser = useCallback(async () => {
    const storedToken = getFromLocalStorage("token");

    if (!storedToken) {
      setLoading(false);
      setInitializing(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentUser(storedToken);

      setToken(storedToken);
      setUser(data.user);
    } catch (error) {
      console.error("Load current user failed:", error);
      setError(error.message);

      if (error.status === 401) {
        removeFromLocalStorage("token");
        setToken(null);
        setUser(null);
      }
    } finally {
      setLoading(false);
      setInitializing(false);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const logout = useCallback(() => {
    removeFromLocalStorage("token");

    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    token,
    loading,
    initializing,
    error,
    login,
    register,
    demoLogin,
    logout,
    loadCurrentUser,
  };
}

export default useAuth;
