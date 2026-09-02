import { useGetUserQuery } from "@/api/qrApi";
import LineChartSection from "@/components/core/LineChartSection";
import TopNDataList from "@/components/core/TopNDataList";
import CountCard from "@/components/UI/CountCard";
import GrowthCard from "@/components/UI/GrowthCard";
import StatusPage from "@/components/UI/StatusPage";
import { lazy, Suspense } from "react";
import { LuUsers } from "react-icons/lu";
import {
  MdOutlineCalendarMonth,
  MdOutlineQrCode2,
  MdOutlineToday,
} from "react-icons/md";
import { TbCalendarMonthFilled, TbHandClick } from "react-icons/tb";

const PieCharts = lazy(() => import("@/components/core/PieCharts"));
// Loads and displays the user's QR analytics overview.
const Overview = () => {
  // Fetches the summary data used across the dashboard.
  const { data, isLoading, error, isFetching } = useGetUserQuery();
  // Shows an error state when overview data is unavailable.
  if (!data && !isLoading && !isFetching)
    return (
      <div className="full center py-3 pr-3">
        <div className="full center bg-surface rounded-2xl">
          <StatusPage
            type="error"
            title={error?.status}
            description={error.message}
          />
        </div>
      </div>
    );
  return (
    <div className="grid h-full w-full grid-cols-3 gap-3">
      <div className="col-span-2 grid h-full w-full grid-cols-1 grid-rows-16 gap-3 py-3">
        <div className="row-span-6 grid h-full w-full grid-cols-3 grid-rows-2 gap-3">
          <CountCard
            icon={TbHandClick}
            isLoading={isFetching}
            title={"Total Clicks"}
            caption={"in last 30 days"}
            growth={data?.totalClicksInLast30Days}
            suffix={"+"}
            value={data?.totalClicks}
            color={"text-purple-500"}
            bgColor={"bg-purple-500/10"}
          />
          <CountCard
            suffix={"+"}
            icon={MdOutlineQrCode2}
            isLoading={isFetching}
            title={"Total Scans"}
            caption={"in last 30 days"}
            growth={data?.totalScansInLast30Days}
            value={data?.totalScans}
            color={"text-emerald-500"}
            bgColor={"bg-emerald-500/10"}
          />
          <CountCard
            icon={LuUsers}
            suffix={"%"}
            isLoading={isFetching}
            title={"Unique User"}
            caption={"rate of unique user"}
            growth={data?.uniqueVisitorsRate}
            value={data?.uniqueVisitors}
            color={"text-lime-500"}
            bgColor={"bg-lime-500/10"}
          />
          <GrowthCard
            icon={MdOutlineToday}
            isLoading={isFetching}
            title={"Today"}
            caption={"vs last day"}
            {...data?.last1Days}
            color={"text-pink-500"}
            bgColor={"bg-pink-500/10"}
          />
          <GrowthCard
            icon={MdOutlineCalendarMonth}
            isLoading={isFetching}
            title={"Last 7 days"}
            caption={"vs last 7 days"}
            {...data?.last7Days}
            color={"text-amber-500"}
            bgColor={"bg-amber-500/10"}
          />
          <GrowthCard
            isLoading={isFetching}
            icon={TbCalendarMonthFilled}
            title={"Last 30 days"}
            caption={"vs last 30 days"}
            {...data?.last30Days}
            color={"text-blue-500"}
            bgColor={"bg-blue-500/10"}
          />
        </div>
        <LineChartSection
          data={data?.graphData}
          isLoading={isFetching}
          title={"Growth by time"}
        />
        <div className="row-span-4 grid h-full w-full grid-cols-2 gap-3">
          <TopNDataList
            isLoading={isFetching}
            data={data?.topNCities.value}
            title={"Cities"}
            caption={"Top 3 cities by no of request"}
          />
          <TopNDataList
            isLoading={isFetching}
            data={data?.topNBrowsers.value}
            title={"Browsers"}
            caption={"Top 3 browsers by no of request"}
          />
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-1 grid-rows-2 gap-3 py-3 pr-3">
        <div className="bg-surface h-full w-full rounded-lg shadow-sm">
          <Suspense fallback={null}>
            <PieCharts
              isLoading={isFetching}
              datas={data?.topNCities.percentage}
              caption={"Top 3 cities"}
              title="Cities"
            />
          </Suspense>
        </div>
        <div className="bg-surface h-full w-full rounded-lg shadow-sm">
          <Suspense fallback={null}>
            <PieCharts
              isLoading={isFetching}
              datas={data?.topNBrowsers.percentage}
              caption={"Top 3 Browsers used"}
              title="Browsers"
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Overview;
