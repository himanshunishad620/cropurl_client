import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { graphColor } from "../../config/color";
import Empty from "../UI/Empty";
import Skeleton from "../UI/Skeleton";

// Custom tooltip for displaying chart values
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const entry = payload[0];

    return (
      <div className="bg-surface rounded-lg px-3 py-2 text-sm text-white shadow-lg">
        <p style={{ color: entry.payload.fill }}>
          {entry.name}: {entry.value.toLocaleString() + "%"}
        </p>
      </div>
    );
  }

  return null;
}

export default function PieCharts({ datas, title, isLoading, caption }) {
  if (isLoading) return <LoaderSkeleton />;

  // Convert the data object into the format required by Recharts
  const data = useMemo(
    () =>
      Object.entries(datas || {}).map(([name, value]) => ({
        name,
        value,
      })),
    [datas],
  );

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col rounded-2xl bg-white p-6">
      <div className="mb-4 shrink-0">
        <h2 className="body-bold text-body">{title}</h2>

        <p className="text-disabled label">{caption}</p>
      </div>

      {!data.length && <Empty />}

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            cornerRadius={6}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={graphColor[index]} stroke="none" />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            iconType="none"
            formatter={(value, entry) => (
              <div className="items-nowrap flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />

                <span className="caption text-disabled font-bold capitalize">
                  {value}
                </span>
              </div>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const LoaderSkeleton = () => {
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col gap-1 rounded-2xl bg-white p-6">
      <Skeleton className={"h-4 w-25"} />
      <Skeleton className={"h-3.5 w-35"} />
      <Skeleton className={"full"} />

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4].map((ind) => (
          <Skeleton key={ind} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
};
