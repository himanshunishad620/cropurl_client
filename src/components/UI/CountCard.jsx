import { HiArrowSmUp } from "react-icons/hi";
import Counter from "./Counter";
import Skeleton from "./Skeleton";

const CountCard = (props) => {
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
          <Counter duration={1500} end={props.value} />
        </p>
        {!!props.growth && (
          <div
            className={`bg-brand-light flex h-5 items-center rounded-sm px-1 pr-2`}
          >
            <HiArrowSmUp className="text-brand" />
            <p className={`label text-brand`}>
              <Counter
                end={props.growth}
                duration={1500}
                suffix={props.suffix}
              />
            </p>
          </div>
        )}
      </div>
      <span className="text-disabled label pl-13">{props.caption}</span>
    </div>
  );
};

export default CountCard;

const LoaderSkeleton = () => {
  return (
    <div className="bg-surface flex h-full w-full flex-col justify-around rounded-lg p-2 shadow-sm">
      <Skeleton className={"h-4 w-full rounded-lg bg-gray-200/70"} />
      <div className="flex gap-2">
        <Skeleton className={"h-8 w-1/4 rounded-lg bg-gray-200/70"} />
        <Skeleton className={"h-8 w-3/4 rounded-lg bg-gray-200/70"} />
      </div>
      <Skeleton className={"h-4 w-full rounded-lg bg-gray-200/70"} />
    </div>
  );
};
