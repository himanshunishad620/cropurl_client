import Button from "@/components/UI/Button";
import { BsArrowRepeat } from "react-icons/bs";
import { TbWifiOff } from "react-icons/tb";

// Displays the offline state when the connection is unavailable.
const NoInternet = () => {
  // Retries the connection check.
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
              <TbWifiOff size={34} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          No Internet Connection
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-500">
          It looks like you're offline. Please check your internet connection
          and try again.
        </p>

        <div className="my-5 flex w-full justify-center">
          <div className="w-30">
            <Button label="Retry" onClick={handleRetry} icon={BsArrowRepeat} />
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-400">
          <span className="font-medium">QRPilot</span>
        </div>
      </div>
    </div>
  );
};

export default NoInternet;
