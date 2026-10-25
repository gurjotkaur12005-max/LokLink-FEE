// Spinner shown while data is loading
function Loader({ text = "Loading..." }) {
  return (
    <div className="loader" role="status">
      <span className="spinner" aria-hidden="true"></span>
      <span>{text}</span>
    </div>
  );
}

export default Loader;
