const Button = ({
  text,
  onClick,
  type = "button",
  classes = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes} ${disabled ? "button-disabled" : ""}`} //add button-disabled class when disabled
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
