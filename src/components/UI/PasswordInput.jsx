import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

const PasswordInput = ({
  label = "Password",
  placeholder = "Password Input",
  value = "",
  name = "",
  onChange,
  error,
  helperText = "Please enter valid value",
}) => {
  // Toggle between masked and visible password text.
  const [hidePassword, setHidePassword] = useState(false);
  const handleEyeButton = () => {
    setHidePassword((pre) => !pre);
  };
  return (
    <div className="w-full">
      <label
        className={`label pl-0.5 ${error ? " text-error " : " text-body "}`}
      >
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={hidePassword ? "text" : "password"}
          className={`text-body bg-page text-[13px] ${error ? "outline-error border-error" : "outline-brand-hover"} w-full rounded-md border-2 p-1.5 px-2.5 pr-8 placeholder:text-xs`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
        <span
          onClick={handleEyeButton}
          className="absolute top-[50%] right-2.5 translate-y-[-50%] transform cursor-pointer"
        >
          {hidePassword ? (
            <PiEyeLight className="text-muted" />
          ) : (
            <PiEyeSlash className="text-muted" />
          )}
        </span>
      </div>
      <p className={`caption pl-0.5 ${error ? "text-error" : "text-muted"}`}>
        {error ? error : helperText}
      </p>
    </div>
  );
};

export default PasswordInput;
