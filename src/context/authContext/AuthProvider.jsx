import axiosApi from "@/config/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") == "true",
  );
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(!isAuthenticated);
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const setAuth = (boolean, user) => {
    setUser(user);
    setIsAuthenticated(boolean);
  };
  const verifyToken = async () => {
    if (isAuthenticated) {
      return;
    }
    if (localStorage.getItem("wasLoggedOut") == "true") {
      navigate("/");
      return;
    }
    console.log("Started");
    setIsChecking(true);
    try {
      const res = await axiosApi.get("/auth/verifyToken");
      setAuth(true, res.data.user);
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (error) {
      console.log(error);
      if (error?.response) {
        console.log("object");
        setAuth(false, null);
        localStorage.setItem("isAuthenticated", false);
        localStorage.setItem("user", null);
      }
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
