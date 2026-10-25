import { Link } from "react-router-dom";

// A reusable button. If "to" is given it becomes a router link, otherwise a normal button.
// variant can be: primary, lime, outline, ghost
function Button({ to, variant = "primary", children, ...rest }) {
  const className = "btn btn-" + variant;
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
