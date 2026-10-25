import { useParams, Link } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { getAllComplaints, getLocalityName, formatDate, STATUS_STEPS } from "../services/storage";

function ComplaintDetails() {
  const { id } = useParams();
  const complaint = getAllComplaints().find((c) => c.id === id);

  if (!complaint) {
    return (
      <div className="container page">
        <EmptyState icon="📭" title="Complaint not found" message="Check the reference ID and try again.">
          <Button to="/complaints">Back to complaints</Button>
        </EmptyState>
      </div>
    );
  }

  const currentStep = STATUS_STEPS.indexOf(complaint.status);

  return (
    <div className="container page narrow">
      <Link to="/complaints" className="back-link">← Back to complaints</Link>

      <header className="detail-header">
        <div>
          <p className="ref-id">Reference {complaint.id}</p>
          <h1>{complaint.title}</h1>
        </div>
        <StatusBadge status={complaint.status} />
      </header>

      <section className="detail-block">
        <h2>Progress</h2>
        <ol className="stepper">
          {STATUS_STEPS.map((step, index) => {
            let stateClass = "";
            if (index < currentStep) {
              stateClass = "done";
            } else if (index === currentStep) {
              stateClass = "current";
            }
            return (
              <li key={step} className={stateClass}>
                <span className="step-dot">{index < currentStep ? "✓" : index + 1}</span>
                <span className="step-name">{step}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="detail-block">
        <h2>Details</h2>
        <p>{complaint.description}</p>
        <dl className="facts">
          <div><dt>Locality</dt><dd>{getLocalityName(complaint.localityId)}</dd></div>
          <div><dt>Category</dt><dd>{complaint.category}</dd></div>
          <div><dt>Priority</dt><dd>{complaint.priority}</dd></div>
          <div><dt>Submitted on</dt><dd>{formatDate(complaint.date)}</dd></div>
        </dl>
      </section>

      <section className="detail-block">
        <h2>Status history</h2>
        <ul className="timeline">
          {complaint.history.map((item) => (
            <li key={item.status}>
              <strong>{item.status}</strong>
              <span className="muted small">{formatDate(item.date)}</span>
              <p>{item.note}</p>
            </li>
          ))}
        </ul>
        <p className="small muted">Sample status history for demonstration. No real office is updating it.</p>
      </section>
    </div>
  );
}

export default ComplaintDetails;
