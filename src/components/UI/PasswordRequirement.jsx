import { IoMdDoneAll } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const PasswordRequirement = ({ isValid, text }) => {
  return (
    <span className="flex items-center gap-1">
      {isValid ? (
        <IoMdDoneAll className="text-success text-md" />
      ) : (
        <IoClose className="text-error text-md" />
      )}
      <p
        className={`${isValid ? "text-success" : "text-error"} caption font-semibold`}
      >
        {text}
      </p>
    </span>
  );
};
export default PasswordRequirement;
