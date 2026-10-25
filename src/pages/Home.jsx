import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import LocalitySearch from "../components/LocalitySearch";
import SectionHeading from "../components/SectionHeading";
import SchemeCard from "../components/SchemeCard";
import ComplaintCard from "../components/ComplaintCard";
import CommunityCard from "../components/CommunityCard";
import StatusBadge from "../components/StatusBadge";
import schemes from "../data/schemes.json";
import localities from "../data/localities.json";
import community from "../data/community.json";
import { getAllComplaints, SERVICE_CATEGORIES } from "../services/storage";

const steps = [
  { icon: "📍", title: "Find your locality", text: "Search by locality, district or PIN code to see how it is governed." },
  { icon: "📝", title: "Report an issue", text: "Describe a civic problem and get a reference ID instantly." },
  { icon: "📊", title: "Track progress", text: "Follow your complaint from Submitted to Resolved." },
  { icon: "🏛️", title: "Discover schemes", text: "Browse government schemes and save the ones that matter to you." },
];

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Take the user to the Explore page with their search text
  function handleSearch() {
    navigate("/explore?q=" + encodeURIComponent(query));
  }

  const complaints = getAllComplaints();
  const recent = [...complaints].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const resolvedCount = complaints.filter((c) => c.status === "Resolved").length;
  const resolvedPercent = Math.round((resolvedCount / complaints.length) * 100);
  const announcements = community.filter((p) => p.category === "Announcement").slice(0, 3);

  const stats = [
    { number: localities.length, label: "Sample localities" },
    { number: schemes.length, label: "Schemes explained" },
    { number: complaints.length, label: "Sample complaints" },
    { number: resolvedPercent + "%", label: "Marked resolved" },
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="hero-tagline">Your locality. Your voice. Your government.</p>
            <h1>Your city works better when you <span className="highlight">speak up.</span></h1>
            <p className="hero-sub">
              Explore your locality, understand local governance, find government schemes and
              report civic issues, all in one place.
            </p>
            <LocalitySearch value={query} onChange={setQuery} onSubmit={handleSearch} />
            <div className="hero-buttons">
              <Button to="/explore" variant="lime">Explore Locality</Button>
              <Button to="/complaints/new" variant="outline-light">Report an Issue</Button>
            </div>
          </div>

          {/* Static sample panel that previews what the app does */}
          <div className="hero-visual" aria-hidden="true">
            <div className="preview-card">
              <div className="card-top">
                <span className="ref-id">LL-2026-1004</span>
                <StatusBadge status="In Progress" />
              </div>
              <h3>Garbage not collected for four days</h3>
              <p className="muted small">Majitha Road, Amritsar</p>
              <ol className="mini-steps">
                <li className="done">Submitted</li>
                <li className="done">Review</li>
                <li className="current">In Progress</li>
                <li>Resolved</li>
              </ol>
            </div>
            <div className="preview-card preview-small">
              <span className="tag tag-green">Health</span>
              <h4>Ayushman Bharat PM-JAY</h4>
              <p className="muted small">☆ Save to your dashboard</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="Civic services" subtitle="Pick a service to see related complaints." />
          <div className="category-grid">
            {SERVICE_CATEGORIES.map((category) => (
              <Link
                key={category.name}
                to={"/complaints?category=" + encodeURIComponent(category.name)}
                className="category-tile"
              >
                <span className={"icon-bubble tone-" + category.tone} aria-hidden="true">{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeading
            title="Featured government schemes"
            subtitle="Short, plain-language summaries. Always confirm details on the official portal."
            linkTo="/schemes"
            linkText="All schemes"
          />
          <div className="grid-cards">
            {schemes.slice(0, 3).map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            title="Recent civic complaints"
            subtitle="Sample complaints from different localities."
            linkTo="/complaints"
            linkText="All complaints"
          />
          <div className="grid-cards">
            {recent.map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
        </div>
      </section>

      <section className="section stats-section">
        <div className="container">
          <h2>LokLink at a glance</h2>
          <p className="stats-note">Numbers are counted from the sample data in this demo.</p>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading title="How LokLink works" subtitle="Four simple steps." />
          <ol className="how-grid">
            {steps.map((step, index) => (
              <li key={step.title} className="how-step">
                <span className="how-number">{index + 1}</span>
                <h3><span aria-hidden="true">{step.icon}</span> {step.title}</h3>
                <p className="muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-white">
        <div className="container">
          <SectionHeading
            title="Community announcements"
            subtitle="Sample notices, tips and events."
            linkTo="/community"
            linkText="Visit community"
          />
          <div className="grid-cards">
            {announcements.map((post) => (
              <CommunityCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
