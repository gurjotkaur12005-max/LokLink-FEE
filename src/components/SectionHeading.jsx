import { Link } from "react-router-dom";

// Title + short text, with an optional link on the right
function SectionHeading({ title, subtitle, linkTo, linkText }) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="text-link">
          {linkText}
        </Link>
      )}
    </div>
  );
}

export default SectionHeading;
