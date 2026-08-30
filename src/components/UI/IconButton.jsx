const IconButton = ({ icon: Icon, onClick }) => {
  return (
    <button onClick={onClick} className="cursor-pointer">
      <Icon className="text-body hover:text-brand text-xl duration-100" />
    </button>
  );
};

export default IconButton;
