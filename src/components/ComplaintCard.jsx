import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { getLocalityName, formatDate } from "../services/storage";

function ComplaintCard({ complaint }) {
  return (
    <article className="card complaint-card">
      <div className="card-top">
        <span className="ref-id">{complaint.id}</span>
        <StatusBadge status={complaint.status} />
      </div>
      <h3>{complaint.title}</h3>
      <p className="muted">
        {getLocalityName(complaint.localityId)} · {formatDate(complaint.date)}
      </p>
      <div className="card-top">
        <span className="tag tag-orange">{complaint.category}</span>
        <Link to={"/complaints/" + complaint.id} className="text-link">View details</Link>
      </div>
    </article>
  );
}

export default ComplaintCard;
