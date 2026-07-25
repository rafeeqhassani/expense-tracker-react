import { useCallback, useState, useEffect } from "react";
import { loginUser, getCurrentUser } from "../services/authApi";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/storage";

function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credentials) => {
    setLoading(true);

    try {
      const data = await loginUser(credentials);

      saveToLocalStorage("token", data.token);

      setToken(data.token);
      setUser(data.user);

      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCurrentUser = useCallback(async () => {
    const storedToken = getFromLocalStorage("token");

    if (!storedToken) return;

    setLoading(true);

    try {
      const data = await getCurrentUser(storedToken);

      setToken(storedToken);
      setUser(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCurrentUser();
  }, [loadCurrentUser]);

  const logout = useCallback(() => {
    removeFromLocalStorage("token");

    setToken(null);
    setUser(null);
  }, []);

  return {
    user,
    token,
    loading,
    login,
    logout,
    loadCurrentUser,
  };
}

export default useAuth;
