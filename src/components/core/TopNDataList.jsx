import Counter from "../UI/Counter";
import Empty from "../UI/Empty";
import Skeleton from "../UI/Skeleton";
import { graphColor } from "./../../config/color";
const TopNDataList = ({ title, caption, data, isLoading }) => {
  if (isLoading) return <LoaderSkeleton />;
  return (
    <div className="bg-surface h-full w-full rounded-lg px-6 pt-4 shadow-sm">
      <div className="mb-1 shrink-0">
        <h2 className="body-bold text-body">{title}</h2>
        <p className="text-disabled label">{caption}</p>
      </div>
      <div className="flex max-h-full flex-col justify-between">
        {!Object.keys(data).length && <Empty size={"text-5xl"} />}
        {Object.entries(data || []).map((pair, ind) => (
          <div key={ind} className="my-0.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: graphColor[ind] }}
              ></div>
              <p className="label text-body">{pair[0]}</p>
            </span>
            <p className="bold-label text-body">
              <Counter end={pair[1]} duration={1500} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNDataList;

const LoaderSkeleton = () => {
  return (
    <div className="bg-surface flex h-full w-full flex-col gap-1 rounded-lg px-6 pt-4 shadow-sm">
      <Skeleton className={"h-4 w-20"} />
      <Skeleton className={"h-3 w-50"} />
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className={"my-0.5 h-3.5 w-full"} />
      ))}
    </div>
  );
};
