import { TbMoodEmpty } from "react-icons/tb";

const Empty = ({ size = "text-8xl" }) => {
  return (
    <div className="center full flex-col">
      <TbMoodEmpty className={`text-muted ${size}`} />
      <p className="body-sm text-body">Nothing have to show</p>
    </div>
  );
};

export default Empty;
