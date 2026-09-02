import axiosApi from "@/config/axios";
import useAuthHook from "@/hooks/useAuthHook";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdLogIn } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import CustomToast from "../UI/CustomToast";
import LightButton from "../UI/LightButton";

const Navbar = () => {
  let { isAuthenticated, setAuth, user } = useAuthHook();

  user = typeof user !== "object" ? JSON.parse(user) : user;

  const storageUser = JSON.parse(localStorage.getItem("user"));
  user = user || storageUser;

  const [logingOut, setLogingOut] = useState(false);

  // Logout user and clear authentication state
  const doLogout = async () => {
    setLogingOut(true);

    try {
      await axiosApi.get("/auth/logout");
    } catch (error) {
      console.log(error);
      localStorage.setItem("wasLoggedOut", true);
    } finally {
      setAuth(false, null);
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("user", null);
      setLogingOut(false);

      toast.custom(
        <CustomToast type={"success"} description={"Logout Successfull!"} />,
      );

      window.location.replace("/auth");
    }
  };

  return (
    <div className="bg-surface flex h-15 w-full items-center justify-between px-50">
      <Link to="/" replace>
        <span className="flex items-center">
          <img src="/inlineqrpilotlogo.png" alt="" className="h-10" />

          <p className="subheading font-bold">QR</p>

          <p className="subheading from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
            Pilot
          </p>
        </span>
      </Link>

      <div className="flex gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="h-11 w-11">
                  <Avatar name={user?.firstName + " " + user?.lastName} />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="bold-label">
                    {user?.firstName + " " + user?.lastName}
                  </p>

                  <p className="caption">{user?.email}</p>
                </div>
              </div>
            )}

            <div className="w-30">
              <LightButton
                label="Logout"
                icon={IoMdLogIn}
                onClick={doLogout}
                isLoading={logingOut}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-30">
              <Link to="/auth">
                <LightButton label="Login" icon={IoMdLogIn} />
              </Link>
            </div>

            <div className="w-30">
              <Button label="Register" icon={MdOutlineAccountCircle} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
