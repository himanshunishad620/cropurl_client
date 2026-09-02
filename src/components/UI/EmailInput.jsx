const EmailInput = ({
  label = "Email",
  placeholder = "Email Input",
  value = "",
  name = "",
  onChange,
  error,
  helperText = "Please enter valid value",
}) => {
  // Display the validation message or default helper text.
  return (
    <div className="w-full">
      <label
        className={`label pl-0.5 ${error ? " text-error " : " text-body "}`}
      >
        {label}
      </label>
      <div className="w-full">
        <input
          type="email"
          className={`bg-page text-body text-[13px] ${error ? "outline-error border-error" : "outline-brand-hover"} w-full rounded-md border-2 p-1.5 px-2.5 placeholder:text-xs`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        />
      </div>
      <p className={`caption pl-0.5 ${error ? "text-error" : "text-muted"}`}>
        {error ? error : helperText}
      </p>
    </div>
  );
};

export default EmailInput;
