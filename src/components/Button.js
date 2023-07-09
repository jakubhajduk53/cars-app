import classNames from "classnames";

function Button(props) {
  const buttonStyles = classNames(
    "px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400 transition duration-150 rounded-md",
    props.className
  );
  return (
    <button type={props.type} onClick={props.onClick} className={buttonStyles}>
      {props.value}
    </button>
  );
}

export default Button;
