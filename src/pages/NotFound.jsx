import { HiOutlineHome } from "react-icons/hi";
import { TbQrcode } from "react-icons/tb";
import { Link } from "react-router-dom";

// Displays a fallback page for unknown routes.
const NotFound = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-2xl text-center">
        <div className="flex justify-center">
          <img src="/qrpilotlogo.png" className="w-30 py-10" alt="" />
        </div>
        <p className="mb-2 text-7xl font-bold tracking-tight text-blue-600 sm:text-8xl">
          404
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Page not found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-500">
          The page you're looking for doesn't exist or may have been moved.
          Please check the URL or head back to QRPilot.
        </p>


        <Link
          className="body-sm link my-4 flex items-center justify-center gap-2"
          to={"/auth/forgotPassword"}
        >
          <HiOutlineHome className="text-lg" /> Go Home
        </Link>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-400">
          <TbQrcode size={18} />
          <span>QRPilot</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
