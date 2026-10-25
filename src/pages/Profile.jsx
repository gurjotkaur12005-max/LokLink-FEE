import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import FormField from "../components/FormField";
import localities from "../data/localities.json";
import { getSchemeById } from "../services/storage";

function Profile() {
  const { user, isLoggedIn, updateUser, logout } = useAuth();
  const savedIds = useSelector((state) => state.savedSchemes.ids);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <div className="container page">
        <EmptyState icon="🔒" title="Please log in" message="Log in to see your demo profile.">
          <Button to="/login">Log in</Button>
        </EmptyState>
      </div>
    );
  }

  function handleLocalityChange(event) {
    updateUser({ localityId: event.target.value });
    setMessage("Locality preference saved.");
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  const savedSchemes = savedIds.map((id) => getSchemeById(id)).filter(Boolean);

  return (
    <div className="container page narrow">
      <header className="page-header">
        <h1>Your profile</h1>
        <p className="muted">Demo account. Details are kept only in this browser.</p>
      </header>

      <section className="detail-block">
        <div className="avatar" aria-hidden="true">{user.name.charAt(0).toUpperCase()}</div>
        <dl className="facts">
          <div><dt>Name</dt><dd>{user.name}</dd></div>
          <div><dt>Email</dt><dd>{user.email}</dd></div>
        </dl>
        <FormField label="Preferred locality" name="localityId" as="select" value={user.localityId || ""}
          onChange={handleLocalityChange} options={localities.map((l) => ({ value: l.id, label: l.name + ", " + l.district }))} />
        {message && <p className="success-text" role="status">{message}</p>}
      </section>

      <section className="detail-block">
        <h2>Saved scheme summary</h2>
        <p>You have saved <strong>{savedSchemes.length}</strong> {savedSchemes.length === 1 ? "scheme" : "schemes"}.</p>
        <ul className="plain-list">
          {savedSchemes.map((s) => (
            <li key={s.id}><Link to={"/schemes/" + s.id} className="text-link">{s.title}</Link></li>
          ))}
        </ul>
      </section>

      <div className="empty-actions">
        <Button to="/dashboard">Go to dashboard</Button>
        <Button variant="outline" onClick={handleLogout}>Log out</Button>
      </div>
    </div>
  );
}

export default Profile;
