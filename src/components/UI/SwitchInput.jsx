const SwitchInput = ({ value, handleChange }) => {
  // Move the thumb based on the current boolean value.
  return (
    <button
      type="button"
      onClick={handleChange}
      className={`h-5 w-9 cursor-pointer rounded-full p-1 transition ${
        value ? "bg-brand" : "bg-gray-300"
      }`}
    >
      <span
        className={`block h-3 w-3 rounded-full bg-white transition ${value ? "translate-x-4 " : "translate-x-0"}`}
      ></span>
    </button>
  );
};

export default SwitchInput;
