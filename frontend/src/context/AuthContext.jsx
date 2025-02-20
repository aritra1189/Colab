import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get("https://colab-433t.onrender.com/api/auth/me", { withCredentials: true })
          .then(res => setUser(res.data))
          .catch(() => setUser(null));
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    await axios.post("https://colab-433t.onrender.com/api/auth/login", { email, password }, { withCredentials: true });
    await fetchUser(); // Refresh user data after login
  };

  const logout = async () => {
    await axios.post("https://colab-433t.onrender.com/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
