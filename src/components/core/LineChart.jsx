import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Empty from "../UI/Empty";

const seriesColors = {
  clicks: "#10b981",
  scans: "#6366f1",
  total: "#f43f5e",
};

// Combine all series into chart data
function buildData(clicks, scans, total) {
  const length = Math.max(clicks.length, scans.length, total.length);

  return Array.from({ length }, (_, i) => ({
    index: i + 1,
    clicks: clicks[i] ?? null,
    scans: scans[i] ?? null,
    total: total[i] ?? null,
  }));
}

// Custom tooltip for chart values
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-page text-body rounded-lg px-3 py-2 text-sm shadow-lg">
        <p className="mb-1 font-semibold">Day {label}</p>

        {payload.map((entry) => (
          <p key={entry.dataKey} style={{ color: seriesColors[entry.dataKey] }}>
            {entry.name}: {entry.value?.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }

  return null;
}

export default function LineChart({ clicks, scans, total }) {
  const data = useMemo(
    () => buildData(clicks, scans, total),
    [clicks, scans, total],
  );

  // Show empty state when there is no chart data
  if (!data.length) {
    return <Empty size={"text-7xl -mt-30"} />;
  }

  return (
    <div className="h-[calc(100%-52px)] w-full rounded-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="clicksFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="scansFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="totalFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e2e8f0"
            vertical={false}
          />

          <XAxis
            dataKey="index"
            tick={false}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
            domain={[1000, "auto"]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="clicks"
            name="Clicks"
            stroke="#10b981"
            strokeWidth={0.5}
            fill="url(#clicksFill)"
          />

          <Area
            type="monotone"
            dataKey="scans"
            name="Scans"
            stroke="#6366f1"
            strokeWidth={0.5}
            fill="url(#scansFill)"
          />

          <Area
            type="monotone"
            dataKey="total"
            name="Total"
            stroke="#f43f5e"
            strokeWidth={0.5}
            fill="url(#totalFill)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Chart legend */}
      <div className="center -mt-5 ml-8 w-full gap-3">
        {Object.entries(seriesColors).map(([key, color]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="bold-label text-disabled capitalize">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
