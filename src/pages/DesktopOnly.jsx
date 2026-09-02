// Restricts this interface to supported screen sizes.
const DesktopOnly = () => {
  return (
    <div className="bg-page flex min-h-dvh w-full items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="flex flex-col items-center justify-center">
          {" "}
          <img src="/inlineqrpilotlogo.png" alt="" className="h-30" />
          <div className="flex">
            <p className="subheading font-bold">QR</p>
            <p className="subheading from-brand bg-linear-to-r to-purple-600 bg-clip-text font-bold text-transparent">
              Pilot
            </p>
          </div>
        </div>


        <div className="mt-6">
          <h2 className="text-lg font-semibold">Mobile version coming soon</h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            We're currently optimizing QRPilot for mobile devices. For the best
            experience, please open QRPilot on a desktop or laptop.
          </p>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Desktop version available
        </div>

        <p className="mt-8 text-xs text-gray-400">
          QRPilot · QR codes made simple
        </p>
      </div>
    </div>
  );
};

export default DesktopOnly;
