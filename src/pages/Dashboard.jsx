import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { removeSavedScheme } from "../redux/savedSchemesSlice";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import ComplaintCard from "../components/ComplaintCard";
import { getSchemeById, getMyComplaints, getLocalityById, formatDate } from "../services/storage";

const quickActions = [
  { to: "/complaints/new", icon: "📝", label: "Report an issue" },
  { to: "/explore", icon: "📍", label: "Explore locality" },
  { to: "/schemes", icon: "🏛️", label: "Browse schemes" },
  { to: "/community", icon: "📢", label: "Community" },
];

function Dashboard() {
  const { user, isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  const savedIds = useSelector((state) => state.savedSchemes.ids);

  if (!isLoggedIn) {
    return (
      <div className="container page">
        <EmptyState icon="🔒" title="Please log in" message="Your dashboard shows your saved schemes and complaints.">
          <Button to="/login">Log in</Button>
          <Button to="/register" variant="outline">Create account</Button>
        </EmptyState>
      </div>
    );
  }

  const savedSchemes = savedIds.map((id) => getSchemeById(id)).filter(Boolean);
  const myComplaints = getMyComplaints();
  const locality = user.localityId ? getLocalityById(user.localityId) : null;

  // Recent activity: my complaints (newest first) and saved schemes
  const activity = [
    ...myComplaints.slice(0, 3).map((c) => ({ key: c.id, text: "Submitted complaint " + c.id, when: formatDate(c.date) })),
    ...savedSchemes.slice(0, 3).map((s) => ({ key: "s-" + s.id, text: "Saved scheme: " + s.title, when: "Saved" })),
  ];

  return (
    <div className="container page">
      <header className="page-header">
        <h1>Welcome, {user.name}</h1>
        <p className="muted">
          {locality ? (
            <>Your locality: <Link to={"/locality/" + locality.id} className="text-link">{locality.name}, {locality.district}</Link></>
          ) : (
            <>You have not chosen a locality yet. <Link to="/profile" className="text-link">Choose one in your profile</Link></>
          )}
        </p>
      </header>

      <div className="quick-grid">
        {quickActions.map((action) => (
          <Link key={action.to} to={action.to} className="category-tile">
            <span className="icon-bubble tone-blue" aria-hidden="true">{action.icon}</span>
            <span>{action.label}</span>
          </Link>
        ))}
      </div>

      <section className="detail-block">
        <h2>Saved schemes ({savedSchemes.length})</h2>
        {savedSchemes.length === 0 ? (
          <EmptyState icon="☆" title="No saved schemes" message="Save a scheme and it will appear here.">
            <Button to="/schemes">Browse schemes</Button>
          </EmptyState>
        ) : (
          <ul className="row-list">
            {savedSchemes.map((scheme) => (
              <li key={scheme.id}>
                <div>
                  <Link to={"/schemes/" + scheme.id} className="text-link">{scheme.title}</Link>
                  <span className="muted small"> · {scheme.category}</span>
                </div>
                <Button variant="ghost" onClick={() => dispatch(removeSavedScheme(scheme.id))}>Remove</Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="detail-block">
        <h2>My complaints ({myComplaints.length})</h2>
        {myComplaints.length === 0 ? (
          <EmptyState icon="📝" title="No complaints yet" message="Complaints you submit in this browser appear here.">
            <Button to="/complaints/new">Report an issue</Button>
          </EmptyState>
        ) : (
          <div className="grid-cards">
            {myComplaints.map((c) => <ComplaintCard key={c.id} complaint={c} />)}
          </div>
        )}
      </section>

      <section className="detail-block">
        <h2>Recent activity</h2>
        {activity.length === 0 ? (
          <p className="muted">Nothing yet. Your actions will show up here.</p>
        ) : (
          <ul className="row-list">
            {activity.map((item) => (
              <li key={item.key}><span>{item.text}</span><span className="muted small">{item.when}</span></li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
