const TextArea = ({
  label = "Text",
  placeholder = "Text Input",
  value = "",
  name = "",
  onChange,
  error,
  disabled = false,
  helperText = "Please enter valid value",
}) => {
  return (
    <div className="w-full">
      <label
        className={`label pl-0.5 ${error ? " text-error " : " text-body "}`}
      >
        {label}
      </label>
      <div className="w-full">
        <textarea
          disabled={disabled}
          type="text"
          className={`bg-page text-body resize-none text-[13px] ${error ? "outline-error border-error" : "outline-brand-hover"} w-full rounded-md border-2 p-1.5 px-2.5 placeholder:text-xs`}
          placeholder={placeholder}
          value={value}
          name={name}
          rows={5}
          onChange={onChange}
        />
      </div>
      <p className={`caption pl-0.5 ${error ? "text-error" : "text-muted"}`}>
        {error ? error : helperText}
      </p>
    </div>
  );
};

export default TextArea;
