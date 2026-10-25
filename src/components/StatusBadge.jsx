// Coloured label for a complaint status. "Under Review" becomes the class "status-under-review".
function StatusBadge({ status }) {
  const className = "status status-" + status.toLowerCase().replace(" ", "-");
  return <span className={className}>{status}</span>;
}

export default StatusBadge;
