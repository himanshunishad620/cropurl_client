import { lazy, Suspense, useState } from "react";
import SelectInput from "../UI/SelectInput";
import Skeleton from "../UI/Skeleton";

// Lazy-load chart to reduce the initial bundle size
const LineChart = lazy(() => import("./LineChart"));

const LineChartSection = ({ data, title, isLoading }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = ["7 days", "30 days", "90 days"];

  // Update the selected time range
  const handleChange = (index) => {
    setSelectedIndex(index);
  };

  if (isLoading) return <LoaderSkeleton />;

  return (
    <div className="bg-surface row-span-6 h-full w-full rounded-lg pr-8 shadow-sm">
      <div className="center bg-surface h-13 w-full items-start justify-between rounded-lg pt-5 pl-8">
        <p className="body-bold text-body">{title}</p>

        <div>
          <SelectInput
            options={options}
            label={"Last:"}
            width={"w-30"}
            selectedIndex={selectedIndex}
            onChange={handleChange}
          />
        </div>
      </div>

      <Suspense fallback={null}>
        <LineChart
          clicks={data?.[selectedIndex]?.clicks ?? []}
          scans={data?.[selectedIndex]?.scans ?? []}
          total={data?.[selectedIndex]?.total ?? []}
        />
      </Suspense>
    </div>
  );
};

export default LineChartSection;

const LoaderSkeleton = () => {
  return (
    <div className="bg-surface row-span-6 flex h-full w-full flex-col gap-2 rounded-lg p-4 shadow-sm">
      <Skeleton className={"h-6 w-50"} />
      <Skeleton className={"h-39 w-full"} />
    </div>
  );
};
