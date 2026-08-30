import Button from "@/components/UI/Button";
import { BsArrowRepeat } from "react-icons/bs";
import { TbWifiOff } from "react-icons/tb";

const NoInternet = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25">
              <TbWifiOff size={34} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          No Internet Connection
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-slate-500">
          It looks like you're offline. Please check your internet connection
          and try again.
        </p>

        {/* Retry */}

        <div className="my-5 flex w-full justify-center">
          <div className="w-30">
            <Button label="Retry" onClick={handleRetry} icon={BsArrowRepeat} />
          </div>
        </div>
        {/* <button
          type="button"
          onClick={handleRetry}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
        >
          <FiRefreshCw size={17} />
          Try Again
        </button> */}

        {/* Branding */}
        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-slate-400">
          <span className="font-medium">QRPilot</span>
        </div>
      </div>
    </div>
  );
};

export default NoInternet;
