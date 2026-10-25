import { useParams, Link } from "react-router-dom";
import SchemeCard from "../components/SchemeCard";
import ComplaintCard from "../components/ComplaintCard";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { getLocalityById, getSchemeById, getAllComplaints } from "../services/storage";

function LocalityDetails() {
  const { id } = useParams(); // the :id part of /locality/:id
  const locality = getLocalityById(id);

  // Invalid locality handling
  if (!locality) {
    return (
      <div className="container page">
        <EmptyState icon="🗺️" title="Locality not found" message="We could not find a locality with this link.">
          <Button to="/explore">Back to Explore</Button>
        </EmptyState>
      </div>
    );
  }

  const relatedSchemes = locality.schemeIds.map((schemeId) => getSchemeById(schemeId)).filter(Boolean);
  const relatedComplaints = getAllComplaints().filter((c) => c.localityId === locality.id);

  const stats = [
    { label: "Households with water supply", value: locality.stats.water },
    { label: "Roads in good condition", value: locality.stats.roads },
    { label: "Working street lights", value: locality.stats.streetLights },
    { label: "Waste collected regularly", value: locality.stats.waste },
  ];

  return (
    <div className="container page">
      <Link to="/explore" className="back-link">← Back to Explore</Link>

      <header className="detail-header">
        <div>
          <span className="tag tag-blue">{locality.type}</span>
          <h1>{locality.name}</h1>
          <p className="muted">{locality.district}, {locality.state} · PIN {locality.pin}</p>
        </div>
        <Button to={"/complaints/new?locality=" + locality.id} variant="lime">Report an issue here</Button>
      </header>

      <section className="detail-block">
        <h2>Overview</h2>
        <p>{locality.description}</p>
        <dl className="facts">
          <div><dt>Population (sample)</dt><dd>{locality.population.toLocaleString("en-IN")}</dd></div>
          <div><dt>Governance type</dt><dd>{locality.governance}</dd></div>
          <div><dt>District</dt><dd>{locality.district}</dd></div>
          <div><dt>State</dt><dd>{locality.state}</dd></div>
        </dl>
      </section>

      <section className="detail-block">
        <h2>Available civic services</h2>
        <ul className="chip-list">
          {locality.services.map((service) => (
            <li key={service} className="chip">{service}</li>
          ))}
        </ul>
      </section>

      <section className="detail-block">
        <h2>Development statistics</h2>
        <p className="muted small">Sample values for this demo. They are not official figures.</p>
        <ul className="bar-list">
          {stats.map((stat) => (
            <li key={stat.label}>
              <div className="bar-label"><span>{stat.label}</span><strong>{stat.value}%</strong></div>
              <div className="bar" role="img" aria-label={stat.label + ": " + stat.value + " percent"}>
                <span style={{ width: stat.value + "%" }}></span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="detail-block">
        <h2>Related government schemes</h2>
        <div className="grid-cards">
          {relatedSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </section>

      <section className="detail-block">
        <h2>Related complaints</h2>
        {relatedComplaints.length === 0 ? (
          <EmptyState icon="✅" title="No complaints yet" message="Nobody has reported an issue here in the sample data.">
            <Button to={"/complaints/new?locality=" + locality.id}>Report an issue</Button>
          </EmptyState>
        ) : (
          <div className="grid-cards">
            {relatedComplaints.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default LocalityDetails;
