const FormContainer = ({ children, className = "", onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={`center bg-surface flex-col rounded-2xl border ${className}`}
    >
      {children}
    </form>
  );
};

export default FormContainer;
