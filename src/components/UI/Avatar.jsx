const Avatar = (props) => {
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
// const Avatar = ({ name = "Himanshu Nishad" }) => {
//   const initials = name
//     .trim()
//     .split(" ")
//     .slice(0, 2)
//     .map((word) => word[0])
//     .join("")
//     .toUpperCase();

//   return (
//     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
//       {initials}
//     </div>
//   );
// };

// export default Avatar;
