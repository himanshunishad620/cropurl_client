import { cn } from "@/lib/utils";

const Skeleton = ({ className, ...props }) => {
  // Reuse the pulse base styles with optional custom classes.
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-[#e6eeff]", className)}
      {...props}
    />
  );
};

export default Skeleton;
