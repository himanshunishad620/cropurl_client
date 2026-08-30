import axiosApi from "@/config/axios";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState(null);
  const setAuth = (boolean, user) => {
    setUser(user);
    setIsAuthenticated(boolean);
  };
  const verifyToken = async () => {
    setIsChecking(true);
    try {
      const res = await axiosApi.get("/auth/verifyToken");
      setAuth(true, res.data.user);
    } catch (error) {
      setAuth(false, null);
    }
    setIsChecking(false);
  };
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{ user, verifyToken, isAuthenticated, setAuth, isChecking }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
