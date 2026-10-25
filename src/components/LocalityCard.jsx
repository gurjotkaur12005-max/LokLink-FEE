import { Link } from "react-router-dom";

function LocalityCard({ locality }) {
  return (
    <article className="card locality-card">
      <div className="card-top">
        <h3>{locality.name}</h3>
        <span className="tag tag-blue">{locality.type}</span>
      </div>
      <p className="muted">{locality.district}, {locality.state} · PIN {locality.pin}</p>
      <dl className="mini-facts">
        <div><dt>Population</dt><dd>{locality.population.toLocaleString("en-IN")}</dd></div>
        <div><dt>Governance</dt><dd>{locality.governance}</dd></div>
      </dl>
      <Link to={"/locality/" + locality.id} className="btn btn-primary">View details</Link>
    </article>
  );
}

export default LocalityCard;
