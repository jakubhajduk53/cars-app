function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400"
    >
      {props.value}
    </button>
  );
}

export default Button;
