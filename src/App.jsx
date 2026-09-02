import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "react-responsive";
import DesktopOnly from "./pages/DesktopOnly";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  if (isMobile) return <DesktopOnly />;
  return (
    <div className="center light-center-gradient h-dvh w-screen scrollbar-none overflow-scroll scroll-smooth">
      <AppRoutes />
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
    </div>
  );
};

export default App;
