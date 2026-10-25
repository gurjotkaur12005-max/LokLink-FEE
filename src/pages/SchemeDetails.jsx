import { useParams, Link } from "react-router-dom";
import SaveSchemeButton from "../components/SaveSchemeButton";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { getSchemeById } from "../services/storage";

function SchemeDetails() {
  const { id } = useParams();
  const scheme = getSchemeById(id);

  if (!scheme) {
    return (
      <div className="container page">
        <EmptyState icon="📄" title="Scheme not found" message="We could not find a scheme with this link.">
          <Button to="/schemes">Back to schemes</Button>
        </EmptyState>
      </div>
    );
  }

  return (
    <div className="container page">
      <Link to="/schemes" className="back-link">← Back to schemes</Link>

      <header className="detail-header">
        <div>
          <span className="tag tag-green">{scheme.category}</span>
          <h1>{scheme.title}</h1>
          <p className="muted">{scheme.summary}</p>
        </div>
        <SaveSchemeButton schemeId={scheme.id} />
      </header>

      <div className="detail-columns">
        <section className="detail-block">
          <h2>Benefits</h2>
          <ul className="check-list">
            {scheme.benefits.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="detail-block">
          <h2>Eligibility</h2>
          <ul className="check-list">
            {scheme.eligibility.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="detail-block">
          <h2>Required documents</h2>
          <ul className="check-list">
            {scheme.documents.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="detail-block">
          <h2>How to apply</h2>
          <ol className="step-list">
            {scheme.howToApply.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>
      </div>

      <p className="notice">
        This is a short summary written for a university demo. Rules and amounts can change.
        Always confirm details on the official government portal or at your local office.
      </p>
    </div>
  );
}

export default SchemeDetails;
