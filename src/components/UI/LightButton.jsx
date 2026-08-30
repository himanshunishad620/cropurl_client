import { ImSpinner } from "react-icons/im";

const LightButton = ({
  label = "Click",
  onClick,
  icon: Icon,
  left = true,
  isLoading = false,
}) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        className="border-brand hover:bg-brand-light center w-full cursor-pointer gap-2 rounded-md border p-2 duration-100"
      >
        {isLoading ? (
          <ImSpinner className="text-brand animate-spin text-xl" />
        ) : (
          <span className="flex items-center gap-2">
            {Icon && left && <Icon className="text-brand text-xl" />}
            <p className="body-bold text-brand">{label}</p>
            {Icon && !left && <Icon className="text-brand text-xl" />}
          </span>
        )}
      </button>
    </div>
  );
};

export default LightButton;
