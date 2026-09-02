import { IoQrCodeOutline, IoSettingsOutline } from "react-icons/io5";
import { LuList } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { NavLink } from "react-router-dom";

// Sidebar navigation routes
const routes = [
  { path: "/dashboard", text: "Overview", icon: TbBrandGoogleAnalytics },
  { path: "/dashboard/allqrs", text: "AllQRs", icon: LuList },
  { path: "/dashboard/create", text: "Create QR", icon: IoQrCodeOutline },
  { path: "/dashboard/settings", text: "Setting", icon: IoSettingsOutline },
];

const SideBar = () => {
  return (
    <div className="bg-surface flex flex-col justify-between px-5">
      {/* Sidebar navigation */}
      <div className="flex flex-col items-center gap-1">
        {/* Application logo */}
        {/* <img
          src="/qrpilotlogo.png"
          alt=""
          className="bg-brand-light my-5 h-50 w-50 rounded-lg p-5"
        /> */}
        <span className="bg-brand-light flex w-full items-center gap-2 rounded-2xl px-8 py-8">
          <MdOutlineSpaceDashboard className="text-brand text-4xl" />
          <p className="subheading text-brand w-full text-left">Dashboard</p>
        </span>
        {/* Navigation links */}
        {routes.map((route) => (
          <NavLink
            key={route.text}
            to={route.path}
            end={route.path === "/dashboard"}
            replace
            className={({ isActive }) =>
              `body-sm flex w-full gap-2 rounded-md p-3 px-8 font-semibold duration-100 ${
                isActive ? "bg-brand-light text-brand" : "bg-surface text-body"
              }`
            }
          >
            <route.icon className="text-xl" />
            {route.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
