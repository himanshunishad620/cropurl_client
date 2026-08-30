import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Counter from "./Counter";
import Skeleton from "./skeleton";

const GrowthCard = (props) => {
  if (props.isLoading) return <LoaderSkeleton />;
  const Icon = props.icon;
  return (
    <div className="bg-surface flex h-full w-full flex-col justify-around rounded-lg p-2 px-5 shadow-sm">
      <p className="bold-label text-body pl-13">{props.title}</p>
      <div className="flex items-center justify-start gap-3">
        <div className={`center ${props.bgColor} h-10 w-10 rounded-md`}>
          <Icon className={`${props.color} text-xl`} />
        </div>

        <p className="subheading text-body">
          <Counter duration={1500} end={props.currValue} />
        </p>

        {!!props.currValue && (
          <div
            className={`flex h-5 items-center gap-1 rounded-sm bg-red-50 px-1 ${props.isGrowth ? "bg-success-bg" : "bg-error-bg"}`}
          >
            {props.isGrowth ? (
              <FaArrowTrendUp
                className={`${props.isGrowth ? "text-success" : "text-error"}`}
              />
            ) : (
              <FaArrowTrendDown
                className={`${props.isGrowth ? "text-success" : "text-error"}`}
              />
            )}
            <p
              className={`label ${props.isGrowth ? "text-success" : "text-error"}`}
            >
              <Counter
                end={props.percentage}
                suffix={props.isPercentage ? " %" : " new"}
                duration={1500}
              />
            </p>
          </div>
        )}
      </div>
      <span className="text-disabled label pl-13">{props.caption}</span>
    </div>
  );
};

export default GrowthCard;

const LoaderSkeleton = () => {
  return (
    <div className="bg-surface flex h-full w-full flex-col justify-around rounded-lg p-2 shadow-sm">
      <Skeleton className={"h-4 w-full rounded-lg bg-gray-200/70"} />
      <div className="flex gap-2">
        <Skeleton className={"h-10 w-1/4 rounded-lg bg-gray-200/70"} />
        <Skeleton className={"h-10 w-3/4 rounded-lg bg-gray-200/70"} />
      </div>
      <Skeleton className={"h-4 w-full rounded-lg bg-gray-200/70"} />
    </div>
  );
};
