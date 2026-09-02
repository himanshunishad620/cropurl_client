import { ImSpinner } from "react-icons/im";

const Button = ({
  label = "Click",
  onClick,
  icon: Icon,
  left = true,
  disabled,
  isLoading = false,
}) => {
  // Keep disabled and active button styles separate.
  const disabledClass =
    "border-muted bg-muted center w-full cursor-not-allowed gap-2 rounded-md border p-2 duration-100";
  const enabledClass = `hover:bg-brand-hover border-brand hover:border-brand-hover bg-brand center w-full cursor-pointer gap-2 rounded-md border p-2 duration-100`;
  return (
    <div className="w-full">
      <button
        // Prevent clicks while disabled or loading.
        disabled={disabled || isLoading}
        onClick={onClick}
        className={disabled ? disabledClass : enabledClass}
      >
        {isLoading ? (
          <ImSpinner className="animate-spin text-xl text-white" />
        ) : (
          <span className="flex items-center gap-2">
            {Icon && left && <Icon className="text-xl text-white" />}
            <p className="body-bold text-white">{label}</p>
            {Icon && !left && <Icon className="text-xl text-white" />}
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
