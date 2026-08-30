import Navbar from "@/components/core/Navbar";
import SideBar from "@/components/core/SideBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="full relative">
      <Navbar />
      <div className="bg-page grid h-[calc(100vh-60px)] grid-cols-4 gap-3">
        <SideBar />
        <div className="col-span-3 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
