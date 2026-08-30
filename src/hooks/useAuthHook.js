import { useContext } from "react";
import AuthContext from "../context/authContext/AuthContext";

const useAuthHook = () => {
  return useContext(AuthContext);
};

export default useAuthHook;
