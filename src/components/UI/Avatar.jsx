const Avatar = (props) => {
  // Create initials from the first two name parts.
  const initials = props.name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <div className="full center rounded-full bg-blue-600 text-sm font-semibold text-white">
      {initials}
    </div>
  );
};

export default Avatar;
