import LoadingPage from "@/pages/LoadingPage";
import { Navigate } from "react-router-dom";
import useAuthHook from "./../hooks/useAuthHook";

const GuestRoutes = ({ children }) => {
  const { isAuthenticated, isChecking } = useAuthHook();
  if (isChecking) return <LoadingPage />;
  if (isAuthenticated) return <Navigate to={"/dashboard"} replace />;
  return <>{children}</>;
};

export default GuestRoutes;
