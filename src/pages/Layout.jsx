import Navbar from "@/components/core/Navbar";
import SideBar from "@/components/core/SideBar";
import { Outlet } from "react-router-dom";

// Wraps dashboard pages with the shared layout.
const Layout = () => {
  return (
    <div className="full relative">
      <Navbar />
      <div className="bg-page grid h-[calc(100vh-60px)] grid-cols-4 gap-3">
        <SideBar />
        <div className="col-span-3 w-full scrollbar-none overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
