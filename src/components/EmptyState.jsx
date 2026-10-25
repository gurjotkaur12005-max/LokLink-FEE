// Friendly message used for "no results", "not found" and "please log in" screens
function EmptyState({ icon = "🔎", title, message, children }) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">{icon}</div>
      <h3>{title}</h3>
      <p className="muted">{message}</p>
      {children && <div className="empty-actions">{children}</div>}
    </div>
  );
}

export default EmptyState;
