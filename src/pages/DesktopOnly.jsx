// Restricts this interface to supported screen sizes.
const DesktopOnly = () => {
  return (
    <div className="bg-page flex min-h-dvh w-full items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="flex w-full justify-center">
          <p className="subheading text-brand font-bold">Crop</p>
          <p className="subheading text-body font-bold">URL</p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Mobile version coming soon</h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            We're currently optimizing CropURL for mobile devices. For the best
            experience, please open CropURL on a desktop or laptop.
          </p>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-600">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Desktop version available
        </div>

        <p className="mt-8 text-xs text-gray-400">CropURL · Link made simple</p>
      </div>
    </div>
  );
};

export default DesktopOnly;
