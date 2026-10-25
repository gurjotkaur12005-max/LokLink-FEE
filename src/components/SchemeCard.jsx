import { Link } from "react-router-dom";
import SaveSchemeButton from "./SaveSchemeButton";

function SchemeCard({ scheme }) {
  return (
    <article className="card scheme-card">
      <span className="tag tag-green">{scheme.category}</span>
      <h3>{scheme.title}</h3>
      <p className="muted">{scheme.summary}</p>
      <p className="card-line"><strong>Benefit:</strong> {scheme.benefits[0]}</p>
      <p className="card-line"><strong>Eligibility:</strong> {scheme.eligibility[0]}</p>
      <div className="card-actions">
        <Link to={"/schemes/" + scheme.id} className="btn btn-primary">View details</Link>
        <SaveSchemeButton schemeId={scheme.id} />
      </div>
    </article>
  );
}

export default SchemeCard;
