const CheckBox = ({ label, onChange, checked }) => {
  // Keep the checkbox state controlled by the parent.
  return (
    <div className="flex items-center gap-1">
      <input
        className="cursor-pointer"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className="label text-body">{label}</p>
    </div>
  );
};

export default CheckBox;
